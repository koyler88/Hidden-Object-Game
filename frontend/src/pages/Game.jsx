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
      setFoundObjects([...foundObjects, name]);
      alert(`✅ You found ${name}!`);
    } else {
      alert(`🔁 You already found ${name}.`);
    }
  };

  if (loading) return <p>Loading game...</p>;
  if (!game) return <p>Game not found.</p>;

  const objects = [
    { name: "Object One", x: game.objectOneX, y: game.objectOneY },
    { name: "Object Two", x: game.objectTwoX, y: game.objectTwoY },
    { name: "Object Three", x: game.objectThreeX, y: game.objectThreeY },
  ];

  return (
    <div className="game-page">
      <h2>{game.name}</h2>
      <p>Find the hidden objects!</p>

      <ObjectTagger
        imageUrl={game.imageUrl}
        objects={objects}
        onFound={handleObjectFound}
      />

      <div className="found-objects">
        <h3>Found Objects:</h3>
        <ul>
          {foundObjects.map((obj) => (
            <li key={obj}>{obj}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Game;
