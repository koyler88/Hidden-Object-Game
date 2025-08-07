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
  });

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

        <button
          className="play-button"
          disabled={!selectedGameId}
          onClick={() => {
            // redirect to game page (e.g. `/game/:id`)
            if (selectedGameId) {
              window.location.href = `/game/${selectedGameId}`;
            }
          }}
        >
          Play
        </button>
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
