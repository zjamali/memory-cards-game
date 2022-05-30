import React from 'react'
import { useState, useEffect } from 'react';
import Card from './Card';

export default function Cards({cards, handleFlip}) {
    // const [cardsId, setCardsId] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

    return (
        <div className='cards'>
            {cards.map((card) => { return <Card handleFlip={handleFlip} key={card.unqid} cardData={card}></Card> })}
        </div>
    )
}
