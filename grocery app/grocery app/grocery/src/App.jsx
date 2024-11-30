import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Registration from './Components/Registration';
import Login from './Components/Login';
import Store from './Components/Store';
import Cart from './Components/Cart';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/Registration' element={<Registration/>}></Route>
    <Route path='/Login' element={<Login/>}></Route>
    <Route path='/Store' element={<Store/>}></Route>
    <Route path='/Cart' element={<Cart/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;