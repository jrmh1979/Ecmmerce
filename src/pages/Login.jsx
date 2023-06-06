import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {setIsLoading} from '../store/slices/isLoading.slice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const { register, handleSubmit } = useForm ()
  const dispatch = useDispatch ()
  const navigate = useNavigate ()

  const submit =(data) => {
      axios
      .post (`https://e-commerce-api-v2.academlo.tech/api/v1/users/login`,data)
      .then (resp => {
        localStorage .setItem ("token", resp.data.token)
        navigate ("/")
      })
      .catch (error => {
        if (error.response.status === 401) {
          alert ("credenciales incorrectas")
        }
      })
      .finally (() => dispatch (setIsLoading (false)))
  }
  
  
    return (
        
      <div className="d-flex justify-content-center pt-5" style={{ height: '100vh' }}> 
           
      <Form onSubmit={handleSubmit (submit)} >
        <h6>Welcome! Enter your email and <br />
           password to continue</h6>
      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm={1}>
          Email
        </Form.Label>
        
          <Form.Control 
          type="email" 
          placeholder="Email" 
          {... register ("email")}
          />

       
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={1}>
          Password
        </Form.Label>
       
          <Form.Control 
          type="password" 
          placeholder="Password" 
          {... register ("password")}
          />
        
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        
          <Button type="submit">Login</Button>
        
      </Form.Group>
    </Form>     
         
            
        </div>
    );
};

export default Login;