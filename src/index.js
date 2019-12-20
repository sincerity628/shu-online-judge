import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-offline/semantic.min.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
