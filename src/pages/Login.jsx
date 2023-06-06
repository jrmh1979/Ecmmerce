import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useForm} from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit } = useForm ()

  const submit =(data) => {
      console.log(data);
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