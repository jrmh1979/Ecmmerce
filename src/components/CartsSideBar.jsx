import Offcanvas from 'react-bootstrap/Offcanvas';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartsThunk, updateQuantityThunk,purchaseCartThunk} from '../store/slices/carts.slice'
import Button from "react-bootstrap/Button";
import React from 'react';

const CartsSideBar = ({show, handleClose}) => {
      const dispatch = useDispatch ()
      const carts = useSelector((state) => state.carts);
      

      useEffect (() => {
        dispatch ( getCartsThunk ())

      },[]) 

      const decrementQuantity = carts => {

        if (carts.quantity > 1) {
          dispatch (updateQuantityThunk (carts.id, carts.quantity-1))
        }
        ;
       
      }


      const incrementQuantity = carts => {

         dispatch (updateQuantityThunk (carts.id, carts.quantity+1))
       
      }

   return (
      <div>
   
      <Offcanvas placement ="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shoping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ul >
          {
            carts.map (cart => (
              <li className='pt-3' key={cart.id}>
                <img src={cart.product.images?.[0].url} alt="" style ={{ height :50, objectFit : "cover"} }/>
                <br />
                <p>{cart.product.title}</p>
                <Button onClick={()=> decrementQuantity (cart)}>-</Button>
                <span className="m-3">{cart.quantity}</span>
                <Button onClick={()=> incrementQuantity (cart)}>+</Button>
              </li>
            ))
          }
          
        </ul>
        </Offcanvas.Body>
        
        <Button
        onClick={()=> dispatch (purchaseCartThunk ())}
        >Comprar
        </Button>
      </Offcanvas>
        </div>
    );
};

export default CartsSideBar;