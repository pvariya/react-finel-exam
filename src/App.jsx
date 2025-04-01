import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import store from "./redux/productSllice";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductItem from "./components/ProductItem";
import AddProducts from "./components/AddProducts";
import UpdateProductForm from "./components/UpdateProductForm";



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductItem />} />
          <Route path="/add-product" element={<AddProducts />} />
          <Route path="/products/update/:id" element={<UpdateProductForm/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
