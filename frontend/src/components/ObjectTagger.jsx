import { useRef, useState } from "react";
import "../styles/ObjectTagger.css";

function ObjectTagger({ imageUrl, objects = [], onFound }) {
  const imageRef = useRef(null);
  const [clickData, setClickData] = useState(null); // { percentX, percentY, pxX, pxY }
  const [showDropdown, setShowDropdown] = useState(false);
  const [foundObjects, setFoundObjects] = useState([]);

  const handleImageClick = (e) => {
    const img = imageRef.current;
    const rect = img.getBoundingClientRect();

    const percentX = ((e.clientX - rect.left) / rect.width) * 100;
    const percentY = ((e.clientY - rect.top) / rect.height) * 100;

    const pxX = e.clientX - rect.left;
    const pxY = e.clientY - rect.top;

    setClickData({ percentX, percentY, pxX, pxY });
    setShowDropdown(true);
  };

  const handleObjectSelect = (object) => {
    if (!clickData) return;

    const match = objects.find((obj) => {
      const dx = Math.abs(obj.x - clickData.percentX);
      const dy = Math.abs(obj.y - clickData.percentY);
      return dx < 2 && dy < 2 && obj.name === object.name;
    });

    if (match) {
      if (!foundObjects.includes(match.name)) {
        setFoundObjects((prev) => [...prev, match.name]);
        onFound(match.name); // parent handles alert
      }
    } else {
      alert("Incorrect! Try again.");
    }

    setClickData(null);
    setShowDropdown(false);
  };

  return (
    <div className="object-tagger" style={{ position: "relative" }}>
      <img
        src={imageUrl}
        alt="Game"
        ref={imageRef}
        className="tagger-image"
        onClick={handleImageClick}
      />

      {showDropdown && clickData && (
        <div
          className="dropdown"
          style={{
            top: `${clickData.pxY}px`,
            left: `${clickData.pxX}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {objects
            .filter((obj) => !foundObjects.includes(obj.name))
            .map((object) => (
              <button
                key={object.name}
                onClick={() => handleObjectSelect(object)}
              >
                <img
                  src={object.imageUrl}
                  alt={object.name}
                  className="dropdown-object-image"
                />
                {object.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default ObjectTagger;
