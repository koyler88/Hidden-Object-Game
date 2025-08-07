import { useEffect, useState } from "react";
import { fetchGames } from "../api/games";
import GameCard from "../components/GameCard";

function Home() {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    fetchGames()
      .then((data) => setGames(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="homepage">
      <header className="header">
        <h1>Hidden Object Search</h1>
      </header>

      <main className="main">
        <div className="card-grid">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              selected={selectedGameId === game.id}
              onSelect={() => setSelectedGameId(game.id)}
            />
          ))}
        </div>

        <div className="button-group" style={{ marginTop: "1rem" }}>
          <button
            className="play-button"
            disabled={!selectedGameId}
            onClick={() => {
              if (selectedGameId) {
                window.location.href = `/game/${selectedGameId}`;
              }
            }}
          >
            Play
          </button>

          <button
            className="leaderboard-button"
            disabled={!selectedGameId}
            onClick={() => {
              if (selectedGameId) {
                window.location.href = `/leaderboard/${selectedGameId}`;
              }
            }}
            style={{ marginLeft: "1rem" }}
          >
            Leaderboard
          </button>
        </div>
      </main>

      <footer className="footer">
        <a
          href="https://github.com/koyler88/Hidden-Object-Game"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}

export default Home;
