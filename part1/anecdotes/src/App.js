import { useState } from "react";

import "./App.css";

const Button = (props) => <button className="btn" onClick={props.handler}>{props.text}</button>;

const Anecdote = (props) => {

  return (
  <div className="anecdote-wrap">
    <p>{props.text}</p>
    <p>has {props.votes} votes</p>
  </div>
  )
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  // This creates object with properties length equal to anecdotes
  const score = {...anecdotes};  
  for (let key in score) {
    score[key] = 0;
  }

  const [votes, setVotes] = useState(score);
  const [display, setDisplay] = useState(false);

  const genRandom = () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum);
  };

  const anecdoteVote = () => {
    const newVotes = {...votes};
    newVotes[selected] += 1
    setVotes(newVotes)
    setDisplay(true);
  };

  const findMaxScore = (data) => {
    const val = Object.values(data);
    const max = Math.max.apply(Math, val);
    
    for (let key in data) {
      if(data[key] === max) {
        return key
      }
    }
  }



  return (
    <div className="main-container">
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <div className="btn-wrap">
      <Button handler={genRandom} text={"next anecdote"} />
      <Button handler={anecdoteVote} text={"vote"} />
      </div>
      {display && <h2>Anecdote with most votes</h2>}
      {display && <Anecdote text={anecdotes[findMaxScore(votes)]} votes={votes[findMaxScore(votes)]} />}
    </div>
  );
};

export default App;
