import './App.css'
import Hand from './view/Hand';

function App() {
  const handOfDealer = [0, 1, 2, 3];
  const handOfPlayer = [38, 13];
  const isPlayerDone = true;
  const winner = 'Player';

  return (
    <div className='container'>
      <h1>Simple Blackjack</h1>
      <h2>Dealer (0):</h2>
      <Hand cards={handOfDealer}></Hand>
      <button disabled={!isPlayerDone}>Play Dealer</button>
      <h2>Player (1):</h2>
      <Hand cards={handOfPlayer}></Hand>
      <button disabled={isPlayerDone}>Get New Card</button>
      <button disabled={isPlayerDone}>Stop</button>
      <button>New Game</button>
      {winner && (<p className='result'>{winner} won!</p>)}
    </div>
  )
}

export default App
