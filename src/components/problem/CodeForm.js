import React, { useState } from 'react';
import { Segment, Dropdown, Button } from 'semantic-ui-react';
import AceEditor from "react-ace";
import '../components.css';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";

const initCommit = {
  language: '',
  code: ''
};

const initError = {
  isError: false,
  content: ''
};

const languages = [{
  key: 0,
  text: 'c',
  value: 'c'
}, {
  key: 1,
  text: 'cpp',
  value: 'cpp'
}, {
  key: 2,
  text: 'java',
  value: 'java'
}, {
  key: 3,
  text: 'python2',
  value: 'python2'
}, {
  key: 4,
  text: 'python3',
  value: 'python3'
}];

const CodeForm = ({ submitCode, btnLoading, setError }) => {
  const [commit, setCommit] = useState(initCommit);
  const [mode, setMode] = useState('java');

  const handleCodeChange = (code) => {
    setError(initError);
    setCommit({
      ...commit,
      code: code
    });
  }

  const handleLanChange = (e, { value }) => {
    setError(initError);
    setCommit({
      ...commit,
      language: value.toUpperCase()
    });
    if(value === 'python') {
      setMode('python');
    }
  }

  const handleSubmit = () => {
    if(commit.code === '') {
      setError({
        isError: true,
        content: '提交代码长度不能为0'
      });
      return;
    }
    if(commit.language === '') {
      setError({
        isError: true,
        content: '请选择提交代码的语言'
      });
      return;
    }
    submitCode(commit);
  }

  return (
    <div className="code-form">
      <Segment attached="top">
        <AceEditor
          mode={mode}
          className="code-editor"
          theme="github"
          onChange={handleCodeChange}
          value={commit.code}
          setOptions={{
            tabSize: 2
          }}
        />
      </Segment>
      <Segment attached="bottom">
        <Dropdown
          selectOnNavigation={false}
          selection
          name="laguage"
          placeholder="语言"
          options={languages}
          onChange={handleLanChange}
        />
        <Button floated="right" loading={btnLoading}
          onClick={handleSubmit} color="green">提交</Button>
      </Segment>
    </div>
  );
}

export default CodeForm;

// #include<iostream>
// using namespace std;
// int main() {
//   int a = 0;
//   cin >> a;
//   cout << a + 1 << endl;
//   return 0;
// }
