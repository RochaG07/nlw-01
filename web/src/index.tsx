import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Mostra em tela (renderiza) o componente <App /> dentro da div com Id root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

