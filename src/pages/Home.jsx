import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import {getProductsThunk, filterCategoryThunk, filterNameThunk} from '../store/slices/products.slice'
import { useEffect , useState} from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from 'react-router-dom'
import React from 'react';


const Home = () => {

    const dispatch = useDispatch ()

    //cuando se realisa el useSelector state.products debe tener el mismo nombre que esta en el index -> configureStore
    const productList = useSelector (state => state.products)

    const [categories, setCategories] = useState ([])
    
    //se almacenan los filtros de los thunk de categoria y buscar por nombres
    const [searchValue, setSearchValue] = useState ("")


    //ejecuta la primera carga de informacion que trae desde el products.slice getProductsThunk
    useEffect (() => {
        dispatch (getProductsThunk ())

    axios
    .get ("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
    .then (resp =>setCategories (resp.data))
    .catch (error => console.error (error))
    
    },[])


    return (
    <div>
        <Row className='pt-5'>
            <Col md = {4} lg = {3}>
            <ListGroup className ="w-100">
            {
                categories.map ( category => (
                    <ListGroup.Item style={{cursor: "pointer"}}
                    key={category.id}
                        onClick ={() => dispatch(filterCategoryThunk (category.id))}
                        >
                        {category.name}</ListGroup.Item>
                ))
            }
                        
            </ListGroup>
            </Col>
            <Col md = {8} lg = {9}>
            <h3>PRODUCTS</h3>
            <InputGroup className="mb-3">
                <Form.Control
                placeholder="Search by name"
                aria-label="Search by name"
                aria-describedby="basic-addon2"
                value={searchValue}
                onChange = {e => setSearchValue (e.target.value)}
            />
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                onClick={() => dispatch(filterNameThunk (searchValue))}>
                Buscar
                </Button>
            </InputGroup>
            
            <Row xs={1} md={2} lg={3}>

                {
                    productList.map (products => (

                    <Col className='mb-3' key={products.id}>
                    <Card className='w-100'>
                    <Card.Img variant="top" src={products.images [0].url} 
                    style ={{ height :250, objectFit : "cover" , padding: "5px"} }/>
                    <Card.Body>
                    <p>{products.brand}</p>
                    <Card.Title>{products.title}</Card.Title>
                    <p>${products.price}</p>
                    
                    </Card.Body>
                    <Button 
                    variant="primary"
                    as={Link}
                    to={`/products/${products.id}`}
                    >See Detail
                    </Button>
                    </Card>
                    </Col>
                ))
                }
           </Row>
            </Col>
        </Row>
 
    </div>
    );
};

export default Home;