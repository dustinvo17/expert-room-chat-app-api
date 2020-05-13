import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker';
import JavascriptTimeAgo from 'javascript-time-ago'

// The desired locales.
import en from 'javascript-time-ago/locale/en'


// Initialize the desired locales.
JavascriptTimeAgo.locale(en)

const store = createStore(reducers,applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={store}>
     <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
 ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
