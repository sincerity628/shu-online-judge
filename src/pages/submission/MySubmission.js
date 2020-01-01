import React, { useState, useEffect, useContext } from "react";
import { Segment, Divider, Pagination } from "semantic-ui-react";
import DoughnutChart from "../../components/data-visualization/DoughnutChart";
import SubmissionTable from '../../components/submission/SubmissionTable';
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

  const [submissions, setSubmissions] = useState([]);
  // for visualization
  const [data, setData] = useState(initData);
  const [totalSubmit, setTotalSubmit] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
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
          setTotalSubmit(userResult.submitCount);
          dispatch({ type: 'UPDATE', userResult });
          setData({
            labels: ["通过", "未通过"],
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

  useEffect(() => {
    const countTotalPages = (total) => {
      if(total % size === 0) {
        setTotalPages(total / size);
      } else {
        setTotalPages(Math.floor(total / size + 1));
      }
    };

    let username = JSON.parse(localStorage.getItem('user')).username;
    setDimmer(true);

    api
      .getSubmissions({
        page: page - 1,
        size: size,
        isPractice: true,
        username: username
      })
      .then(res => {
        if(res.status === 200) {
          setDimmer(false);
          countTotalPages(res.data.total);
          setSubmissions(res.data.list);
        }
      })
  }, [page, size]);

  const handlePageChange = (e, { activePage }) => {
    setPage(activePage);
  };

  return (
    <div className="my-submission">
      <Segment attached="top">
        <h5>做题情况</h5>
      </Segment>
      <Segment attached="bottom">
        <div className="description">
          通过 / 总提交
          （{done} / {totalSubmit}）
        </div>
        <DoughnutChart data={data} options={options} />
      </Segment>
      <div className="divider-line">
        <Divider horizontal>提交记录</Divider>
      </div>
      <SubmissionTable submissions={submissions} />
      <div className="my-submission-pagination">
        <Pagination
          siblingRange={1}
          activePage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div onClick={() => setSize(size)}></div>
    </div>
  );
};

export default MySubmission;
