import React, { useState, useEffect, useContext } from 'react';
import { Segment } from 'semantic-ui-react';
import DoughnutChart from '../../components/DoughnutChart';
import { UserContext } from '../../contexts/UserContext';
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
  const { dispatch } = useContext(UserContext);

  const [user, setUser] = useState({});
  const [data, setData] = useState(initData);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);

  useEffect(() => {
    let unmounted = false;
    api
      .getUserInfo()
      .then(res => {
        if(!unmounted && res.status === 200) {
          setUser(res.data);
          setDone(res.data.acCount);
          dispatch({ type: 'UPDATE', user });
        }
      })
    api
      .getProblems()
      .then(res => {
        if(!unmounted && res.status === 200) {
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

    return () => { unmounted = true; };
  }, [done, dispatch, user]);

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
