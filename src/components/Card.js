import React, { useState } from 'react'
import uniqid from "uniqid"

export default function Card({ cardData, handleFlip }) {
    return (
        <>
            { cardData.fliped ? 
            <img src={cardData.url} alt={cardData.id} id={cardData.id} key={uniqid} /> : 
            <img src="./imgs/back-of-card.png" alt={cardData.id} id={cardData.id}  onClick={(e)=>{handleFlip(cardData.unqid)}}/>
            }
        </>
    )
}
