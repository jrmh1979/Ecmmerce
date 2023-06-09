import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';



export const productSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts : (state, action)=> {
            return action.payload
        }
    }
})



export const {setProducts} = productSlice.actions;

export default productSlice.reducer;

//redux thunk / middlewares
//se ejecutan entre el dispatch y la accion
/*
export const myFunctionThunk = () => dispatch  => {
    // tareas a realizar
    dispatch (actionName1 ())
    
    //mas tarde
    dispatch (actionName2 ())

}*/

//consumir todos los productos en home
export const getProductsThunk =() => dispatch => {
    dispatch (setIsLoading (true))

    axios
    .get ("https://e-commerce-api-v2.academlo.tech/api/v1/products")
    .then (resp => {
        console.log(resp.data);
        dispatch (setProducts(resp.data))
    })
  
    .catch (error => console.error (error))
    .finally (()=> dispatch (setIsLoading (false)))

}


// filtrar por categoria en home
export const filterCategoryThunk = id => dispatch => {

    dispatch (setIsLoading (true))

    axios
    .get (`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
    .then (resp => {
        dispatch (setProducts(resp.data))
        console.log(resp.data);
    })
        
    .catch (error => console.error (error))
    .finally (()=> dispatch (setIsLoading (false)))

}

// buscar por nombre en home
export const filterNameThunk = value => dispatch => {

    dispatch (setIsLoading (true))

    axios
    .get (`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${value}`)
    .then (resp => {
        dispatch (setProducts(resp.data))
        console.log(resp.data);
    })
        
    .catch (error => console.error (error))
    .finally (()=> dispatch (setIsLoading (false)))

}

    