import { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "../utils/getConfig";
import ListGroup from "react-bootstrap/ListGroup";
import Table from 'react-bootstrap/Table';


const Purcharses = () => {
  const [purcharses, setPurcharses] = useState([]);
  

  useEffect(() => {
    
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases",getConfig())
      .then((resp) => setPurcharses(resp.data))
      .catch((error) => console.error(error))
      
  }, []);

  return (
    <div>
      <h1 className='pt-5'>Purchases</h1>
       <ListGroup>
        {
            purcharses.map (item =>(
              <ListGroup.Item key={item.id}>

            <img src={item.product.images?.[0].url} alt="" style ={{ width :80} }/>
                            
              <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Model</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>{item.product?.title}</td>
          <td>{item.quantity}</td>
          <td>${item.product?.price}</td>
          <td>{item.updatedAt}</td>
        </tr>
        
      </tbody>
    </Table> 
              </ListGroup.Item>
              

            ))

        }
       </ListGroup>
 
    </div>
  );
};

export default Purcharses;