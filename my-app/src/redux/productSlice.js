/*
 * @Author: Deng nelsondeng0701@gmail.com
 * @Date: 2024-11-30 23:01:31
 * @LastEditors: Deng nelsondeng0701@gmail.com
 * @LastEditTime: 2024-11-30 23:21:23
 * @FilePath: /my-app/src/redux/productSlice.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPut, apiDelete} from '../Service';


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await apiGet('products');
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (productData) => {
  const formData = new FormData();
  formData.append('title', productData.title);
  formData.append('description', productData.description);
  formData.append('price', productData.price);
  formData.append('category_id', 1);
  formData.append('is_active', 1);
  if (productData.product_image) {
    formData.append('product_image', productData.product_image);
  }

  const response = await apiPost('products', formData);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
    await apiDelete(`product/${productId}`);
    return productId;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ productId, updatedProduct }) => {
    await apiPut(`product/${productId}`, updatedProduct);
    return { productId, updatedProduct };
});  
  const productSlice = createSlice({
    name: 'products',
    initialState: {
      items: [], 
      status: 'idle', 
      error: null,
    },
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
      
        .addCase(addProduct.fulfilled, (state, action) => {
          state.items.push(action.payload);
        })
   
        .addCase(updateProduct.fulfilled, (state, action) => {
          const { productId, updatedProduct } = action.payload;
          const existingProduct = state.items.find((product) => product.id === productId);
          if (existingProduct) {
            Object.assign(existingProduct, updatedProduct);
          }
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.items = state.items.filter((product) => product.id !== action.payload);
        });
    },
  });
  
  
export default productSlice.reducer;

