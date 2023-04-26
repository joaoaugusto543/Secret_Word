import { useCallback, useEffect, useRef, useState } from 'react'
import './Game.css'

function Game({verifyLetter,pickedWord,pickedCategory,letters,startGame,score,setScore}) {

  const [letter, setLetter] = useState('')
  const [word,setWord]=useState('')
  const [guessedLetters, setGuessedLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [wrongLetters, setWrongLetters] = useState([])
  const lettterInputRef=useRef(null)
  const wordInputRef=useRef(null)
  const checkIfTheGameIsOver =useCallback(() => { 
    if(guessedLetters.length===letters.length){
      setScore(score+100)
      setGuessedLetters([])
      setWrongLetters([])
      startGame()
    }

    if(guesses===0){
      setGuessedLetters([])
      setWrongLetters([])
      verifyLetter()
    }
  }, [guessedLetters,guesses,letters.length,score,startGame,verifyLetter,setScore]);
 
  
  useEffect(()=>{
    checkIfTheGameIsOver()
  },[checkIfTheGameIsOver])
  

  function checkWord(){
    if(word.toLocaleLowerCase()===pickedWord){
      if(wrongLetters.length===0 && guessedLetters.length===0){
        setScore(score+200)
      }else{
        setScore(score+100)
      }
      setGuessedLetters([])
      setWrongLetters([])
      startGame()
    }else if(word.toLocaleLowerCase()!==pickedWord && word.length!==0){
      setGuesses(guesses-1)
    }

    setWord('')
    wordInputRef.current.focus()
  }

  function checkLyrics(){
      if(pickedWord.includes(letter) && !guessedLetters.includes(letter)){
        const repeatedLetters=letters.filter((letterParams)=>letterParams===letter)
        setGuessedLetters([...guessedLetters,...repeatedLetters])
      }else if(!wrongLetters.includes(letter) && !guessedLetters.includes(letter)){
        setGuesses(guesses-1)
        setWrongLetters([...wrongLetters,letter])
      }

      setLetter('')
      lettterInputRef.current.focus()
  }

  return (
    <div className="game">
      <p className="points"><span>pontos:</span> {score}</p>
      <h1>Adivinhe a palavra</h1>
      <h3 className='type'>Dica sobre a palavra:<span> {pickedCategory}</span></h3>
      <p>Você ainda tem {guesses} tentativas</p>
      <div className="wordLettersContainer">
        {letters.map((letter,index)=>{
          const resp=guessedLetters.indexOf(letter.toLowerCase())
          if(resp !== -1){
            return <span key={index}>{letter}</span>
          }else{
            return <span key={index}></span>
          }
        })}     
      </div>
      <div className="lettersContainer">
        <p>Adivinhe uma letra:</p>
        <form onSubmit={(e)=>e.preventDefault()}>
          <input autoComplete='off' type="text" maxLength='1' name="letter" ref={lettterInputRef} required value={letter} onChange={(e)=>setLetter((e.target.value).toLocaleLowerCase())} />
          <button onClick={checkLyrics}>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas</p>
        {wrongLetters.map((wrongLetter,index)=><span key={index}>{wrongLetter},</span>)}
      </div>
      <div className="wordContainer">
        <p>Tente adivinhar a palavra:</p>
        <form onSubmit={(e)=>e.preventDefault()}>
          <input autoComplete='off' type="text" name="word" ref={wordInputRef} value={word} onChange={(e)=>setWord(e.target.value)} />
          <button onClick={checkWord}>Jogar!</button>
        </form>
      </div>
    </div>
  )
}

export default Game