import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';



export const cartsSlice = createSlice({
    name: 'carts',
    initialState: [],
    reducers: {
        setCarts : (state, action) => {
            return action.payload
        }

    }
})

export const { setCarts } = cartsSlice.actions;
export default cartsSlice.reducer;

export const getCartsThunk = () => dispatch => {
    dispatch (setIsLoading (true))

    axios
    .get ("https://e-commerce-api-v2.academlo.tech/api/v1/cart",getConfig ())
    .then((resp) => {
        console.log(resp.data);
        dispatch(setCarts(resp.data));
      })
    .catch (error => console.error(error))
    .finally (() => dispatch (setIsLoading(false)))
    
}

export const addProductsThunk = data => dispatch => {

    dispatch (setIsLoading(true))
    axios
    .post ('https://e-commerce-api-v2.academlo.tech/api/v1/cart',data, getConfig())
    .then (()=> dispatch (getCartsThunk ()))
    .catch (error => console.error (error))
    
    .finally (() => dispatch (setIsLoading(false)))


}

export const updateQuantityThunk = (id, quantity) => dispatch => {
dispatch (setIsLoading(true))

const body = {
    quantity : quantity
}

axios
.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`,body , getConfig ())
.then(() => dispatch(getCartsThunk()))
.catch (error => console.error(error))
.finally (() => dispatch (setIsLoading(false)))
}

export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
  
    axios
      .post(
        "https://e-commerce-api-v2.academlo.tech/api/v1/purchases",
        {},
        getConfig()
      )
      .then(() => dispatch(getCartsThunk()))
      .catch((error) => console.error(error))
      .finally(() => dispatch(setIsLoading(false)));
  };
  

export const deleteThunk = (id) => dispatch => {
    dispatch (setIsLoading(true))
      
    axios
    .put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`,getConfig ())
    .then(() => dispatch(getCartsThunk()))
    .catch (error => console.error(error))
    .finally (() => dispatch (setIsLoading(false)))
    }