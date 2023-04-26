import StartScreen from '../../components/startScreen/StartScreen'
import {useState} from 'react'
import {wordsList} from '../../data/words'
import Game from '../../components//Game/Game';
import GameOver from '../../components//GameOver/GameOver'

function Home(){
    const stages=[
        {id:1,name:'start'},
        {id:2,name:'game'},
        {id:3,name:'end'}
      ]

      console.log(stages)
    
      const [gameStage, setGameStage] = useState(stages[0].name)
      const [pickedWord,setPickedWord]=useState('')
      const [pickedCategory,setPickedCategory]=useState('')
      const [letters, setLetters] = useState([])
      const [score,setScore]=useState(0)
      const [words]=useState(wordsList)
    
      function pickWordAndCategory(){
          const categorys=Object.keys(words)
          const category=categorys[Math.floor(Math.random() * categorys.length)]
          const word=words[category][Math.floor(Math.random() * words[category].length)].toLowerCase()
          const wordLetters=word.split('')
          return {word,wordLetters,category}
      }
    
      function startGame(){
        const {word,wordLetters,category}=pickWordAndCategory()
        setPickedWord(word)
        setPickedCategory(category)
        setLetters(wordLetters)
        setGameStage(stages[1].name)
      }
      
    
      function verifyLetter(){
        setGameStage(stages[2].name)
      }
    
      function retry(){
        setScore(0)
        setGameStage(stages[0].name)
      }
    
      return (
        <>
            {gameStage==='start' && <StartScreen startGame={startGame}/>}
            {gameStage==='game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} startGame={startGame} score={score} setScore={setScore}/>}
            {gameStage==='end' && <GameOver retry={retry} pickedWord={pickedWord} score={score}/>}
        
        </>
        
      );
}

export default Home
