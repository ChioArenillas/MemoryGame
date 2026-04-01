import React, { useEffect, useState } from 'react'
import MemoryCard from './components/MemoryCard'
import Form from './components/Form'
import Confetti from "react-confetti"
import AssistiveTechInfo from './components/AssistiveTechInfo'
import GameOver from './components/GameOver'

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false)
  const [emojiData, setEmojiData] = useState([])
  const [selectedCards, setSelectedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)

  useEffect(() => {
    if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
      setMatchedCards(prevMatchedCards => [...prevMatchedCards, ...selectedCards])
    }
  }, [selectedCards])

  useEffect(() => {
    if (emojiData.length && matchedCards.length === emojiData.length) {
      setAreAllCardsMatched(true)
    }
  }, [matchedCards])

  async function startGame(e) {
    e.preventDefault()
    try {
      const response = await fetch('https://emojihub.yurace.pro/api/all/category/animals-and-nature')
      if (!response.ok) {
        throw error("there was an error")
      }
      const data = await response.json()
      const dataSlice = await getDataSlice(data)
      const emojisArray = await getEmojisArray(dataSlice)
      setEmojiData(emojisArray)
      setIsGameOn(true)
    } catch (err) {
      console.error(err)
    }
  }
  async function getDataSlice(data) {
    const randomIndices = getRandomIndices(data)
    const dataSlice = randomIndices.reduce((array, index) => {
      array.push(data[index])
      return array
    }, [])
    return dataSlice
  }

  function getRandomIndices(data) {
    const randomIndicesArray = []
    for (let i = 0; i < 5; i++) {
      const randomNum = Math.floor(Math.random() * data.length)
      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum)
      } else {
        i--
      }
    }
    return randomIndicesArray
  }

  async function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data]
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = pairedEmojisArray[i]
      pairedEmojisArray[i] = pairedEmojisArray[j]
      pairedEmojisArray[j] = temp
    }
    return pairedEmojisArray
  }

  function turnCard({ index, name }) {
    if (selectedCards.length < 2) {
      setSelectedCards(prevSelectedCards => [...prevSelectedCards, { name, index }])
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }])
    }
  }
  function resetGame(){
    setIsGameOn(false)
    setSelectedCards([])
    setMatchedCards([])
    setAreAllCardsMatched(false)
  }

  return (
    <main>
      <h1>Memory Game</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && !areAllCardsMatched && 
      <AssistiveTechInfo 
        emojisData={emojiData}
        matchedCards={matchedCards}
      />}
      {areAllCardsMatched && <GameOver handleClick={resetGame}/>}
      {isGameOn &&
        <MemoryCard
          handleClick={turnCard}
          emojiData={emojiData}
          selectedCards={selectedCards}
          matchedCards={matchedCards} 
        />}
      {areAllCardsMatched && <Confetti />}
    </main>
  )
}
