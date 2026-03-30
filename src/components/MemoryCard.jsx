import React from 'react'
import { decodeEntity } from 'html-entities'
import EmojiButton from './EmojiButton'

export default function MemoryCard({ handleClick, emojiData, selectedCards, matchedCards }) {

    const cardEl = emojiData.map((emoji, index) => {
        const selectedCardEntry = selectedCards.find(emoji => emoji.index === index)
        const matchedCardEntry = matchedCards.find(emoji => emoji.index === index)
        return (
            <li key={index} className='card-item'>
                <EmojiButton
                    content={decodeEntity(emoji.htmlCode[0])}
                    style="btn btn--emoji"
                    handleclick={() => handleClick({
                         index, name: emoji.name
                    })} 
                    selectedCardEntry={selectedCardEntry}
                    matchedCardEntry={matchedCardEntry}/>
            </li>
        )
    })

    return (
        <ul className='card-container'>
            {cardEl}
        </ul>
    )
}

