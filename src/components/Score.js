import React from 'react'

export default function Score({bestScore, currentScore}) {
  return (
    <div className='score'>
        <h1>{"best score : " + bestScore + " second"}</h1>
        <h1>{"current score : " + currentScore}</h1>
    </div>
  )
}
