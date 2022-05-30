import React, { useState, useEffect, useDeferredValue } from "react";
import Score from "./components/Score";
import Cards from "./components/Cards";
import uniqid from "uniqid"
import "./App.css"
import userEvent from "@testing-library/user-event";

function shuffle(array) {
  var i = array.length,
    j = 0,
    temp;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const App = () => {
  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setcurrentScore] = useState(0);
  const [counter, setCounter] = useState(100);
  const timer = () => {
    setCounter(counter - 1)
  };
  const [flipedCards, setFlipedCards] = useState([]);
  const [clickActive, setClickActive] = useState(true);

  const [cards, setCards] = useState(
    shuffle(
      [
        { url: "./imgs/1.png", id: 1, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/2.png", id: 2, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/3.jpg", id: 3, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/4.png", id: 4, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/5.jpg", id: 5, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/6.jpg", id: 6, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/7.png", id: 7, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/8.png", id: 8, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/9.png", id: 9, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/1.png", id: 1, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/2.png", id: 2, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/3.jpg", id: 3, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/4.png", id: 4, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/5.jpg", id: 5, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/6.jpg", id: 6, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/7.png", id: 7, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/8.png", id: 8, unqid: uniqid(), fliped: true, alreadyFliped: false },
        { url: "./imgs/9.png", id: 9, unqid: uniqid(), fliped: true, alreadyFliped: false },
      ]))
  useEffect(() => {
    let cardsList = [...cards];
    setTimeout(() => {
      cardsList.map((card) => { return card.fliped = false });
      setCards([...cardsList]);
    }, 5000);
  }, [])


  useEffect(() => {
    if (counter <= 0) {
      if (currentScore < 9)
       {
         document.title = "you lose";
         return;
       }
    }
    if (currentScore === 9)
    {
      document.title = "you win " ;
      return;
    }
    const cn = setInterval(timer, 1000);
    document.title = `timer ${counter}`;
    return () => clearInterval(cn);
  }, [counter])

  function handleFlip(unqid) {
    if (clickActive) {
      let cardsList = [...cards];
      const index = cardsList.findIndex((card) => card.unqid === unqid);
      cardsList.splice(index, 1, { ...cardsList[index], fliped: true });
      setCards([...cardsList]);
      cardsList = cards;
      let selectedCards = [...flipedCards];
      selectedCards.push(index);
      setFlipedCards([...selectedCards]);
    }
  }

  useEffect(() => {
    console.log("fliped cards index, ", flipedCards)
    if (flipedCards.length === 2) {
      setClickActive(false);
      let cardsList = [...cards];
      if (cardsList[flipedCards[0]].id === cardsList[flipedCards[1]].id) {
        cardsList[flipedCards[0]].alreadyFliped = true;
        cardsList[flipedCards[1]].alreadyFliped = true;
        setCards([...cardsList]);
        setFlipedCards([]);
        setClickActive(true);
        setcurrentScore(currentScore + 1);
      }
      else {
        setTimeout(() => {
          cardsList.forEach((card) => {
            if (!card.alreadyFliped) {
              card.fliped = false;
            }
          });
          setCards([...cardsList]);
          setFlipedCards([]);
          setClickActive(true);
        }, 1500);
      }
    }
  }, [flipedCards])

  useEffect(() => {
    setBestScore(currentScore);
    if (counter > 0 && currentScore === 9)
    {
      setBestScore(counter);
    }
  }, [currentScore])


  return (
    <div className="App">
      <div className="game_info">
        <h1 className="game-title">Get points by clicking on an image but don't click on any more than once!</h1>
        <Score bestScore={bestScore} currentScore={currentScore}></Score>
      </div>
      <Cards cards={cards} handleFlip={handleFlip}></Cards>
    </div>
  );
};

export default App;