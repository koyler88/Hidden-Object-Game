function GameCard({ game, selected, onSelect }) {
  return (
    <div
      className={`game-card ${selected ? 'selected' : ''}`}
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
    >
      <img src={game.imageUrl} alt={game.name} width={200} height={200} />
      <h3>{game.name}</h3>
    </div>
  );
}

export default GameCard;
