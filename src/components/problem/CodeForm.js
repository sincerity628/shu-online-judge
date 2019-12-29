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

const CodeForm = ({ submitCode }) => {
  const [commit, setCommit] = useState(initCommit);
  const [mode, setMode] = useState('python');
  const [btnLoading, setBtnLoading] = useState(false);

  const handleCodeChange = (code) => {
    setCommit({
      ...commit,
      code: code
    });
  }

  const handleLanChange = (e, { value }) => {
    setCommit({
      ...commit,
      language: value.toUpperCase()
    });
    if(value === 'java') {
      setMode('java');
    } else {
      setMode('python');
    }
  }

  const handleSubmit = () => {
    if(commit.code === '') {
      alert('code is empty.');
      return;
    }
    if(commit.language === '') {
      alert('language is empty.');
      return;
    }
    setBtnLoading(true);
    submitCode(commit);
    setBtnLoading(false);
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
