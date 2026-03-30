import React from 'react'


export default function EmojiButton({
    content,
    style,
    handleclick,
    selectedCardEntry,
    matchedCardEntry
}) {
    const btnContent = selectedCardEntry || matchedCardEntry ?
        content
        :
        "?"

    return (
        <button
            className={style}
            onClick={handleclick}>
            {btnContent}
        </button>
    )
}
