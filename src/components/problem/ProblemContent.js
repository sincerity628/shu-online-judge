import React, { useState, useEffect } from 'react';
import { Label } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import '../components.css';

const ProblemContent = ({ problem }) => {
  console.log(problem)
  const [sampleList, setSampleList] = useState([]);
  const [copy, setCopy] = useState(false);

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
          <CopyToClipboard text={sample.input}
            onCopy={() => setCopy(true)}>
            <span className="father">
              <div className="io-tooltip-container">
                <Label pointing="below" color="black"
                  className="io-tooltip" size="large">
                  点击复制
                </Label>
              </div>
              <pre className="io">{ sample.input }</pre>
            </span>
          </CopyToClipboard>

          <p><code>output</code></p>
          <CopyToClipboard text={sample.output}
            onCopy={() => setCopy(true)}>
            <span className="father">
              <div className="io-tooltip-container">
                <Label pointing="below" color="black"
                  className="io-tooltip" size="large">
                  点击复制
                </Label>
              </div>
              <pre className="io">{ sample.output }</pre>
            </span>
          </CopyToClipboard>
        </div>
      )) }
    </div>
  );
}

export default ProblemContent;
