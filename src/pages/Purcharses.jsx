import { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "../utils/getConfig";
import ListGroup from "react-bootstrap/ListGroup";


const Purcharses = () => {
  const [purcharses, setPurcharses] = useState([]);
  

  useEffect(() => {
    
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases",getConfig())
      .then((resp) => console.log(resp.data))
      .catch((error) => console.error(error))
      
  }, []);

  return (
    <div>
      <h1>Purchases</h1>
       <ListGroup>
        {
            purcharses.map (item =>(
              <ListGroup.Item key={item.id}>

            <img src={item.product.images?.[0].url} alt="" style ={{ width :200} }/>
              {item.product?.title}
              {item.quantity}


              </ListGroup.Item>


            ))

        }
       </ListGroup>
 
    </div>
  );
};

export default Purcharses;