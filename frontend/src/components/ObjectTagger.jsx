import { useRef, useState } from "react";
import "../styles/ObjectTagger.css";

function ObjectTagger({ imageUrl, objects = [], onFound, foundObjects = [] }) {
  const imageRef = useRef(null);
  const [clickData, setClickData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [foundMarkers, setFoundMarkers] = useState([]);

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

    if (match && !foundObjects.includes(match.name)) {
      onFound(match.name);
      setFoundMarkers((prev) => [...prev, { x: clickData.pxX, y: clickData.pxY }]);
    } else if (!match) {
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

      {foundMarkers.map((marker, i) => (
        <span
          key={i}
          className="marker"
          style={{
            top: `${marker.y}px`,
            left: `${marker.x}px`,
            position: "absolute",
          }}
        >
          ✔
        </span>
      ))}

      {showDropdown && clickData && (
        <div
          className="dropdown"
          style={{
            top: `${clickData.pxY}px`,
            left: `${clickData.pxX}px`,
          }}
        >
          {objects
            .filter((obj) => !foundObjects.includes(obj.name))
            .map((object) => (
              <button
                key={object.name}
                onClick={() => handleObjectSelect(object)}
                className="dropdown-option"
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
