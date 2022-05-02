import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from './components/topbar/Topbar';
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import './App.css';

function App() {
  return (
    <Router>
      <Topbar/>
      <div className="container">
        <Routes>
          <Route path='/' element={<ProductList/>} />
          <Route exact path='/products/:id' element={<Product/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
