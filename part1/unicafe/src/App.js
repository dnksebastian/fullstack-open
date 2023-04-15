import './App.css';

import { useState } from "react";

const Button = (props) => {
  return (
    <button className="btn" onClick={props.handleClick} id={`${props.text}-btn`}>
      {props.text}
    </button>
  );
};

const StatisticLine = (props) => {
  return <li className="result" id={`${props.text}-li`}><p> {props.text} - {props.statvalue}</p></li>;
};

const Statistics = (props) => {

  const score = {
    good: props.feedback[0],
    neutral: props.feedback[1],
    bad: props.feedback[2]
  }
  
  const all = score.good + score.neutral + score.bad  
  const average = Math.round((((score.good - score.bad) / all ) + Number.EPSILON ) * 100 ) / 100;
  const positive = Math.round(((score.good / all) + Number.EPSILON)  * 100) / 100;

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
 
    <ul className="result-list">
      <StatisticLine text={"good"} statvalue={props.feedback[0]} />
      <StatisticLine text={"neutral"} statvalue={props.feedback[1]} />
      <StatisticLine text={"bad"} statvalue={props.feedback[2]} />
      <StatisticLine text={"all"} statvalue={all} />
      <StatisticLine text={"average"} statvalue={average} />
      <StatisticLine text={"positive"} statvalue={`${positive}%`} />
    </ul>

  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = [good, neutral, bad];

  return (
    <div className='main-container'>
      <h1>Give feedback</h1>

      <div className="btn-container">
      <Button
        handleClick={() => {
          setGood(good + 1);
        }}
        text={"good"}
      />
      <Button
        handleClick={() => {
          setNeutral(neutral + 1);
        }}
        text={"neutral"}
      />
      <Button
        handleClick={() => {
          setBad(bad + 1);
        }}
        text={"bad"}
      />
      </div>

      <h2>Statistics</h2>

      <Statistics feedback={feedback}/>

    </div>
  );
};

export default App;
