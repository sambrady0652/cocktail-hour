import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Grommet } from 'grommet'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import { theme } from './styling/theme'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Grommet theme={theme}>
        <App />
      </Grommet>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
