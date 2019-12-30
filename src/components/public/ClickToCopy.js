import React from 'react';
import { Label } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "../components.css";

const ClickToCopy = ({ copyContent }) => {
  return (
    <CopyToClipboard text={copyContent}>
      <span className="father">
        <div className="io-tooltip-container">
          <Label pointing="below" color="black"
            className="io-tooltip" size="large">
            点击复制
          </Label>
        </div>
        <pre className="io">{ copyContent }</pre>
      </span>
    </CopyToClipboard>
  );
}

export default ClickToCopy;
