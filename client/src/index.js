import React from 'react';
import ReactDOM from 'react-dom';
import style from './styles/main.css';
import App from './components/App.jsx';
//import other components

ReactDOM.render(<App />, document.getElementById('app'));

//WHEN USING REDUX UNCOMMENT BELOW:

// import store from './store/store.js';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';

// ReactDOM.render(
//   <Provider store={store}>
//     <App API_KEY={YOUTUBE_API_KEY} searchYouTube={searchYouTube} />
//   </Provider>,
//   document.getElementById('app')
// );
