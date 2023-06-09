import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { filterCategoryThunk } from '../store/slices/products.slice';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import { addProductsThunk } from '../store/slices/carts.slice';



const ProductDetail = () => {

    //desestructuracion de useParams del parametro que se definio en la url de la ruta
    const {id}= useParams ()
    //estado para guardar
    const [product, setProduct ] = useState ({})
    const [quantity, setQuantity] = useState (1)
    const dispatch = useDispatch ()

    // filtrado de productos relacionados 
    const allProducts = useSelector (state => state.products)
    const productsFiltered = allProducts.filter (products => products.id !== Number(id))

    useEffect (() => {

        axios.get (`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
        .then (resp => {
            console.log(resp.data);
            setProduct (resp.data)
            //consumo el filterCategoryThunk para favoritos
            dispatch (filterCategoryThunk (resp.data.category.id))
    })
    },[]) 

        const decrement =() => {
            if (quantity > 1 )
            setQuantity (quantity-1)
        

        }

        const addToProducts = () => {
        const products = {
            quantity : quantity,
            productId : product.id
            
        }

        dispatch ( addProductsThunk(products))
    }

    return (
        <div >
            <Row className='pt-5'>
                <Col ms = {2}  md = {4} lg = {6}>
                <p>{product.title}</p>
            <Carousel>
                <Carousel.Item>
                < img
                className="mx-auto d-block"
                src={product.images?.[0].url} 
                style ={{ height :350, objectFit : "cover"} }
                alt="First slide"
                />
                </Carousel.Item>

                <Carousel.Item>
                <img
                className="mx-auto d-block"
                src={product.images?.[1].url}
                style ={{ height :350, objectFit : "cover"} } 
                alt=""
                />    
                </Carousel.Item>
                
                <Carousel.Item>
                <img
                className="mx-auto d-block"
                src={product.images?.[2].url}
                style ={{ height :350, objectFit : "cover"} }
                alt="Third slide"
                />
                </Carousel.Item>
            </Carousel>
                
            </Col>
               <Col ms = {2}  md = {4} lg = {6}>
                <h2>{product.title}</h2>
                <p>{product.brand}</p>
                <p className="text-justify fs-5">{product.description}</p>
                <h5>Price : ${product.price}</h5><br />
                <Button onClick={() => decrement ()}>-</Button>
                <span className="m-3">{quantity}</span>
                <Button onClick={() => setQuantity (quantity + 1)}>+</Button>

                <Button 
                className='primary ms-3' 
                onClick={addToProducts}
                >Add to Cart</Button>
                </Col>
            </Row> 


                <div className='pt-5'>
                <h4>Productos Relacionados</h4>
                <Row xs={1} md={2} lg={3}>
                {
                productsFiltered.map ( products => (
                    <Col className='mb-3' key={products.id}>
                    <Card className='w-100'>
                    <Card.Img variant="top" src={products.images [0].url} 
                    style ={{ height :250, objectFit : "cover" , padding: "5px"} }/>
                    <Card.Body>
                    <p>{products.brand}</p>
                    <h6>{products.title}</h6>
                    <p>${products.price}</p>
                    
                    </Card.Body>
                    <Button 
                    variant="primary"
                    as={Link}
                    to={`/products/${products.id}`}
                    >See Detail</Button>
                    </Card>
                    </Col>
                 ))
                }
            </Row>  
            </div> 
             
        </div>
    );
};

export default ProductDetail;