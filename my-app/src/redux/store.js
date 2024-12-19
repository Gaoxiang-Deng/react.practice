/*
 * @Author: Deng nelsondeng0701@gmail.com
 * @Date: 2024-11-30 23:01:07
 * @LastEditors: Deng nelsondeng0701@gmail.com
 * @LastEditTime: 2024-12-01 00:34:03
 * @FilePath: /my-app/src/redux/store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
