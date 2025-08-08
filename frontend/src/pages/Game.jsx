import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../api/games";
import ObjectTagger from "../components/ObjectTagger";
import ScoreSubmissionPopup from "../components/ScoreSubmissionPopup";
import "../styles/Game.css";

function Game() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [foundObjects, setFoundObjects] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchGameById(id)
      .then((data) => {
        setGame(data);
        setLoading(false);
        setGameStarted(true);
      })
      .catch((err) => {
        console.error("Error loading game:", err);
        setLoading(false);
      });
  }, [id]);

  // Timer effect
  useEffect(() => {
    if (gameStarted && !isGameOver) {
      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [gameStarted, isGameOver]);

  const handleObjectFound = (name) => {
    if (!foundObjects.includes(name)) {
      const updatedFound = [...foundObjects, name];
      setFoundObjects(updatedFound);
      setPopupMessage(`✅ You found ${name}!`);
      setTimeout(() => setPopupMessage(""), 2000);

      // Check if all objects found
      if (updatedFound.length === 3) {
        setIsGameOver(true);
      }
    }
  };

  if (loading) return <p>Loading game...</p>;
  if (!game) return <p>Game not found.</p>;

  const objects = [
    {
      name: game.objectOneName,
      x: game.objectOneX,
      y: game.objectOneY,
      imageUrl: game.objectOneUrl,
    },
    {
      name: game.objectTwoName,
      x: game.objectTwoX,
      y: game.objectTwoY,
      imageUrl: game.objectTwoUrl,
    },
    {
      name: game.objectThreeName,
      x: game.objectThreeX,
      y: game.objectThreeY,
      imageUrl: game.objectThreeUrl,
    },
  ];

  return (
    <div className="game-page">
      <h2>{game.name}</h2>

      <div className="object-preview">
        <h3>Find the hidden objects!</h3>
        <div className="preview-images">
          {objects.map((obj) => (
            <div
              key={obj.name}
              className={`preview-item ${
                foundObjects.includes(obj.name) ? "found-object" : ""
              }`}
            >
              <img src={obj.imageUrl} alt={obj.name} className="preview-image" />
              <p>{obj.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="timer">Time: {formatTime(elapsedTime)}</div>

      <ObjectTagger
        imageUrl={game.imageUrl}
        objects={objects}
        onFound={handleObjectFound}
        foundObjects={foundObjects}
      />

      {popupMessage && <div className="popup">{popupMessage}</div>}

      {isGameOver && (
        <ScoreSubmissionPopup
          elapsedTime={elapsedTime}
          gameId={game.id}
          onClose={() => setIsGameOver(false)}
        />
      )}
    </div>
  );
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

export default Game;
