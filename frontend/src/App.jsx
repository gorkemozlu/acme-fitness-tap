import React, { Component } from 'react';
import Main from './components/MainComponent.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './css/styles.scss';
const store = ConfigureStore();


function App() {
  

  return (
    <Provider store={store}>
        <BrowserRouter basename="/shop">
            <Main />
        </BrowserRouter>
      </Provider>
  );
}

export default App
