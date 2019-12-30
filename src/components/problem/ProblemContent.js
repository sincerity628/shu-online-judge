import React, { useState, useEffect } from 'react';
import ClickToCopy from '../../components/public/ClickToCopy';
import '../components.css';

const ProblemContent = ({ problem }) => {
  const [sampleList, setSampleList] = useState([]);

  useEffect(() => {
    if(problem.sampleIO) {
      setSampleList(JSON.parse(problem.sampleIO));
    } else {
      setSampleList([]);
    }
  }, [problem]);

  return (
    <div className="problem-content">
      <p><b>时间限制：</b>{ problem.timeLimit } ms</p>
      <p><b>内存限制：</b>{ problem.ramLimit } MB</p>
      <div dangerouslySetInnerHTML={{ __html: problem.description }}></div>
      <h3>输入格式</h3>
      <div dangerouslySetInnerHTML={{ __html: problem.inputDesc }}></div>
      <h3>输出格式</h3>
      <div dangerouslySetInnerHTML={{ __html: problem.outputDesc }}></div>
      <h3>样例</h3>
      { sampleList.map((sample, index) => (
        <div className="sampleIO" key={index}>
          <p><code>input</code></p>

          <ClickToCopy copyContent={sample.input} />

          <p><code>output</code></p>

          <ClickToCopy copyContent={sample.output} />
        </div>
      )) }
    </div>
  );
}

export default ProblemContent;
