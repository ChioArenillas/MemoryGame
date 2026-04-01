import React from 'react'
import EmojiButton from './EmojiButton'

export default function MemoryCard({ handleClick, emojiData, selectedCards, matchedCards }) {

    const cardEl = emojiData.map((emoji, index) => {
        const selectedCardEntry = selectedCards.find(emoji => emoji.index === index)
        const matchedCardEntry = matchedCards.find(emoji => emoji.index === index)

        const cardStyle =
            matchedCardEntry ? "card-item--matched" :
                selectedCardEntry ? "card-item--selected" :
                    ""
        return (
            <li key={index} className={`card-item ${cardStyle}`}>
                <EmojiButton
                    emoji={emoji}
                    handleclick={() => handleClick({
                        index, name: emoji.name
                    })}
                    selectedCardEntry={selectedCardEntry}
                    matchedCardEntry={matchedCardEntry}
                    index={index}
                />
            </li>
        )
    })


    return (
        <ul className='card-container'>
            {cardEl}
        </ul>
    )
}

