
import './App.css'
import { HashRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import AppNavbar from './components/AppNavbar'
import Purcharses from './pages/Purcharses'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Loader from './components/Loader'
import {useSelector} from 'react-redux'
import Container from 'react-bootstrap/Container';
import {ProtectedRoutes} from './components/ProtectedRoutes'


function App() {

  /*axios.get("url")
    axios.post (url, body)


  */
 const isLoading = useSelector (state => state.isLoading)
  

  return (
    <HashRouter>
      {
        isLoading && <Loader/>
      }
     
      <AppNavbar/>
      <Container fluid>
     <Routes>
        <Route
         element = {<Home/>}
         path = "/"
        />

        <Route
        element = {<Login/>}
        path = "/Login"
        />

        <Route
        element = {<ProductDetail/>}
        path = "/products/:id"
        />

        {/*ruta protegida*/}
        <Route
         element = {<Purcharses/>}
         path = "/purcharses"
        />

     </Routes>
     </Container>      
    </HashRouter>
  )
}

export default App
