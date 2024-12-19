/*
 * @Author: Deng nelsondeng0701@gmail.com
 * @Date: 2024-07-05 20:55:16
 * @LastEditors: Deng nelsondeng0701@gmail.com
 * @LastEditTime: 2024-11-21 20:55:26
 * @FilePath: /project1/src/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
  </div>

);

reportWebVitals();
