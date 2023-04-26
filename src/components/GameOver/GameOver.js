import './GameOver.css'

function GameOver({retry,pickedWord,score}) {
  return (
    <div className='gameOver'>
      <h1>Fim de Jogo!!!</h1>
        <p>a palavra certa era: <span>{pickedWord}</span></p>
        <p>Você fez <span>{score}</span> pontos</p>
      <button onClick={retry}>Resetar Jogo</button>
    </div>
  )
}

export default GameOver