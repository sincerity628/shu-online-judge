import React from 'react';
import { Segment } from 'semantic-ui-react';
import '../components.css';

const CountDown = ({ startTime, endTime }) => {
  console.log(startTime, endTime);
  return (
    <div className="count-down">
      <Segment attached="top">倒计时</Segment>
      <Segment attached="bottom"></Segment>
    </div>
  );
};

export default CountDown;
