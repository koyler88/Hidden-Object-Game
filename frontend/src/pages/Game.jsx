import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../api/games";
import ObjectTagger from "../components/ObjectTagger";
import "../styles/Game.css";

function Game() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [foundObjects, setFoundObjects] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    fetchGameById(id)
      .then((data) => {
        setGame(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading game:", err);
        setLoading(false);
      });
  }, [id]);

  const handleObjectFound = (name) => {
    if (!foundObjects.includes(name)) {
      setFoundObjects((prev) => [...prev, name]);
      setPopupMessage(`✅ You found ${name}!`);
      setTimeout(() => setPopupMessage(""), 2000);
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
              <img
                src={obj.imageUrl}
                alt={obj.name}
                className="preview-image"
              />
              <p>{obj.name}</p>
            </div>
          ))}
        </div>
      </div>

      <ObjectTagger
        imageUrl={game.imageUrl}
        objects={objects}
        onFound={handleObjectFound}
        foundObjects={foundObjects}
      />

      {popupMessage && <div className="popup">{popupMessage}</div>}
    </div>
  );
}

export default Game;
