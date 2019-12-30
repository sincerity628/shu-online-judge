import React, { useState, useEffect, useContext } from 'react';
import { UIContext } from '../../contexts/UIContext';
import ResultTable from '../../components/problem/ResultTable';
import ClickToCopy from '../../components/public/ClickToCopy';
import api from '../../tools/api';
import './submission.css';

const SubmissionDetail = (props) => {
  const { toggleDimmer } = useContext(UIContext);

  const [submission, setSubmission] = useState({});
  const [resultDetail, setResultDetail] = useState({});
  const [dimmer, setDimmer] = useState(false);

  useEffect(() => {
    toggleDimmer(dimmer);
  }, [toggleDimmer, dimmer]);

  useEffect(() => {
    setDimmer(true);
    api
      .getSubmission(props.match.params.id)
      .then(res => {
        if(res.status === 200) {
          setDimmer(false);
          setSubmission(res.data);
          setResultDetail(JSON.parse(res.data.resultDetail));
          console.log(JSON.parse(res.data.resultDetail));
        } else {
          setDimmer(false);
        }
      })
  }, [props]);

  return (
    <div className="submission-detail">
      <h1>提交 #{ props.match.params.id.substring(0, 10) + "..." }</h1>

      <ResultTable result={submission} />

      <div className="code-area">
        <ClickToCopy copyContent={submission.code} />
      </div>
      { resultDetail.message? (
        <div className="result-detail-container">
          <h3>错误信息</h3>
          <div className="result-detail">{ resultDetail.message }</div>
        </div>
      ) : null }
    </div>
  );
}

export default SubmissionDetail;
