import React, { useState, useEffect } from 'react';
import api from '../../tools/api';
import './problem-detail.css';

const ProblemDetail = (props) => {
  const [problem, setProblem] = useState({});

  useEffect(() => {
    api
      .getProblem(props.match.params.id)
      .then(res => {
        if(res.status === 200) {
          console.log(res.data);
        }
      })

  }, [props.match.params.id]);
  return (
    <div className="problem-detail">
      <h1>ProblemDetail</h1>
    </div>
  );
}

export default ProblemDetail;
