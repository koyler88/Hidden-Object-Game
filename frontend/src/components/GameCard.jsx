function GameCard({ game, selected, onSelect }) {
  return (
    <div
      className={`game-card ${selected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <img src={game.thumbnail} alt={game.name} />
      <p>{game.name}</p>
    </div>
  );
}

export default GameCard;
