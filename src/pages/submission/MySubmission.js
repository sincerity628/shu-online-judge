import React, { useState, useEffect, useContext } from "react";
import { Segment } from "semantic-ui-react";
import DoughnutChart from "../../components/DoughnutChart";
import { UserContext } from "../../contexts/UserContext";
import { UIContext } from "../../contexts/UIContext";
import api from "../../tools/api";
import "./submission.css";

const initData = {
  labels: ["已完成", "剩余题目"],
  datasets: [
    {
      label: "题目数量",
      data: [5, 10],
      backgroundColor: ["#12cad6", "#fa163f"]
    }
  ]
};
const options = {
  legend: {
    display: true,
    position: "bottom"
  },
  layout: {
    padding: {
      top: 20
    }
  }
};

const MySubmission = () => {
  const { dispatch } = useContext(UserContext);
  const { toggleDimmer } = useContext(UIContext);
  const [data, setData] = useState(initData);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);
  const [dimmer, setDimmer] = useState(false);

  useEffect(() => {
    toggleDimmer(dimmer);
  }, [dimmer, toggleDimmer]);

  useEffect(() => {
    let unmounted = false;
    setDimmer(true);

    api
      .getUserInfo()
      .then(res => {
        if (!unmounted && res.status === 200) {
          setDimmer(false);
          let userResult = res.data;
          setDone(userResult.acCount);
          setTotal(userResult.submitCount)
          dispatch({ type: 'UPDATE', userResult });
          setData({
            labels: ["accepted", "failed"],
            datasets: [
              {
                label: "题目数量",
                data: [done, userResult.submitCount - done],
                backgroundColor: ["#12cad6", "#fa4b4b"]
              }
            ]
          });
        }
      });

    return () => {
      unmounted = true;
    };
  }, [dispatch, done]);

  return (
    <div className="my-submission">
      <Segment attached="top">
        <h5>做题情况</h5>
      </Segment>
      <Segment attached="bottom">
        <div className="description">
          ({done} / {total})
        </div>
        <DoughnutChart data={data} options={options} />
      </Segment>
    </div>
  );
};

export default MySubmission;
