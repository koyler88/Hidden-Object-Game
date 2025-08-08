import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ScoreSubmissionPopup({ elapsedTime, gameId, onClose }) {
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const submitScore = async () => {
    if (!playerName.trim()) {
      setError("Please enter your name");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: playerName.trim(),
          time: elapsedTime,
          gameId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit score");
      }

      onClose();
      alert("Score submitted! Thank you for playing.");
      navigate('/')
    } catch (e) {
      setError(e.message || "Error submitting score");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="score-popup-overlay">
      <div className="score-popup">
        <h2>🎉 You finished!</h2>
        <p>Your time: {formatTime(elapsedTime)}</p>
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          disabled={loading}
        />
        <button onClick={submitScore} disabled={loading}>
          {loading ? "Submitting..." : "Submit Score"}
        </button>
        {error && <p className="error">{error}</p>}
        <button onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ScoreSubmissionPopup;
