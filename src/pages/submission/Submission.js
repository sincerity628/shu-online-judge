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

const Submission = () => {
  const { dispatch } = useContext(UserContext);
  const { toggleDimmer } = useContext(UIContext);
  const [data, setData] = useState(initData);
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);
  const [dimmer, setDimmer] = useState(false);

  useEffect(() => {
    let unmounted = false;
    console.log("sa");

    const getUserInfo = () => {
      toggleDimmer(true);
      api.getUserInfo().then(res => {
        if (!unmounted && res.status === 200) {
          toggleDimmer(false);
          setUser(res.data);
          setDone(res.data.acCount);
          dispatch({ type: 'UPDATE', user });
        }
      });
    }

    const getProblems = () => {
      api
        .getProblems()
        .then(res => {
          if (!unmounted && res.status === 200) {
              toggleDimmer(false);
            setTotal(res.data.total);
            setData({
              labels: ["已完成", "剩余题目"],
              datasets: [
                {
                  label: "题目数量",
                  data: [done, res.data.total - done],
                  backgroundColor: ["#12cad6", "#fa4b4b"]
                }
              ]
            });
          }
        });
    }

    getUserInfo();
    getProblems();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div className="submission">
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

export default Submission;
