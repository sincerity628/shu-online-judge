import React from 'react';
import { Segment, Label } from 'semantic-ui-react';
import '../components.css';

const ProblemDescription = ({ problem }) => {
  
  const calculateDifficulty = (difficulty) => {
    switch(difficulty) {
      case 'HIGH':
        return ( <Label color="red">困难</Label> );
      case 'MEDIUM':
        return ( <Label color="yellow">中等</Label> );
      case 'LOW':
        return ( <Label color="green">简单</Label> );
      default: return '';
    }
  }

  return (
    <div className="problem-description">
      <Segment attached="top">
        <p>
          <b>通过次数：</b>{ problem.acceptCount }，
          共有 { problem.submitCount } 次提交
        </p>
        <p>
          <b>通过率：</b>
          { (problem.acceptRate * 100).toFixed(2) } %
        </p>
        <div>
          <b>难度：</b>
          { calculateDifficulty(problem.difficulty) }
        </div>
      </Segment>
      <Segment attached="bottom">
        <p>
          <b>创建：</b>
          { problem.createDate }
        </p>
        <p>
          <b>修改：</b>
          { problem.lastUsedDate }
        </p>
        <p>
          <b>来源：</b>
          { problem.source? problem.source : '无' }
        </p>

      </Segment>
    </div>
  );
}

export default ProblemDescription;
