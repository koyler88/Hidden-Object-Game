import '../styles/Leaderboard.css'
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGameById } from "../api/games";
import { getScoresByGameId } from "../api/scores";

function Leaderboard() {
  const { id } = useParams();
  const [scores, setScores] = useState([]);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const gameData = await fetchGameById(id);
        setGame(gameData);

        const scoresData = await getScoresByGameId(id);
        setScores(scoresData);
      } catch (err) {
        console.error(err)
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p>{error}</p>;
  if (!game) return <p>Game not found.</p>;

  return (
    <div className="leaderboard-page">
      <h2>Leaderboard for {game.name}</h2>
      <Link to="/">← Back to Home</Link>
      {scores.length === 0 ? (
        <p>No scores yet. Be the first to play!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Time (seconds)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map(({ id, playerName, time, createdAt }) => (
              <tr key={id}>
                <td>{playerName}</td>
                <td>{time}</td>
                <td>{new Date(createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;
