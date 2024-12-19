/*
 * @Author: Deng nelsondeng0701@gmail.com
 * @Date: 2024-11-17 20:41:33
 * @LastEditors: Deng nelsondeng0701@gmail.com
 * @LastEditTime: 2024-11-30 23:10:50
 * @FilePath: /my-app/src/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // 引入Provider组件
import { store } from './redux/store';  // 引入配置好的Redux store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* 使用Provider包裹App组件 */}
      <App />
    </Provider>
  </React.StrictMode>
);

// 如果你想测量应用的性能，请将一个函数传递给reportWebVitals (例如: reportWebVitals(console.log))
// 或者将其发送到分析端点，更多信息请查看: https://bit.ly/CRA-vitals
reportWebVitals();
