import React, { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import DoughnutChart from '../../components/DoughnutChart';
import api from '../../tools/api';
import './submission.css';

const initData = {
  labels: ['已完成', '剩余题目'],
  datasets: [{
    label: '题目数量',
    data: [5, 10],
    backgroundColor: ['#12cad6', '#fa163f']
  }]
}
const options = {
  legend: {
    display: true,
    position: 'bottom',
  },
  layout: {
    padding: {
      top: 20
    }
  }
}

const Submission = () => {
  const [data, setData] = useState(initData);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    setDone(user.acCount);
    api
      .getProblems()
      .then(res => {
        if(res.status === 200) {
          setTotal(res.data.total);
          setData({
            labels: ['已完成', '剩余题目'],
            datasets: [{
              label: '题目数量',
              data: [done, res.data.total - done],
              backgroundColor: ['#12cad6', '#fa4b4b']
            }]
          });
        }
      })
  }, [done]);

  return (
    <div className="submission">
      <Segment attached="top">
        <h5>做题情况</h5>
      </Segment>
      <Segment attached="bottom">
        <div className="description">
          ({ done } / { total })
        </div>
        <DoughnutChart data={data} options={options}/>
      </Segment>
    </div>
  );
}

export default Submission;
