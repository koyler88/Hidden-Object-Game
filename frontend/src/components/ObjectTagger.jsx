import { useRef, useState } from "react";
import "../styles/ObjectTagger.css";

function ObjectTagger({ imageUrl, objects = [], onFound }) {
  const imageRef = useRef(null);
  const [clickPosition, setClickPosition] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [foundObjects, setFoundObjects] = useState([]);

  const handleImageClick = (e) => {
    const img = imageRef.current;
    const rect = img.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    console.log("X", x, "Y", y);

    setClickPosition({ x, y });
    setShowDropdown(true);
  };

  const handleObjectSelect = (object) => {
    setShowDropdown(false);

    // Check if user clicked close enough (within 2% range)
    const match = objects.find((obj) => {
      const dx = Math.abs(obj.x - clickPosition.x);
      const dy = Math.abs(obj.y - clickPosition.y);
      return dx < 2 && dy < 2;
    });

    const correct = match && match.name === object.name;
    if (correct) {
      setFoundObjects((prev) => [...prev, object.name]);
      onFound(object.name);
    } else {
      alert("Incorrect! Try again.");
    }

    setClickPosition(null);
  };

  return (
    <div className="object-tagger">
      <img
        src={imageUrl}
        alt="Game"
        ref={imageRef}
        className="tagger-image"
        onClick={handleImageClick}
      />

      {showDropdown && clickPosition && (
        <div
          className="dropdown"
          style={{
            top: `${clickPosition.y}%`,
            left: `${clickPosition.x}%`,
          }}
        >
          {objects
            .filter((obj) => !foundObjects.includes(obj.name))
            .map((obj) => (
              <button key={obj.name} onClick={() => handleObjectSelect(obj)}>
                {obj.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default ObjectTagger;
