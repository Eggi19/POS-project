import { Route, Routes } from 'react-router-dom';
import './App.css';
// import SignIn from './Pages/Login/login';
import ProductList from './Pages/ProductList/ProductList';
import CategoryPage from './Pages/CategoryList/CategoryList';
import CreateProduct from './Pages/CreateProduct/createProduct';
import EditProduct from './Pages/EditProduct/editProduct';

function App() {
  return (
    <>
      {/* <SignIn /> */}
      <Routes>
        <Route path='/products' element={
          <>
            <ProductList />
          </>
        } />
        <Route path='/categories' element={
          <CategoryPage />
        } />
        <Route path='/newProduct' element={
          <CreateProduct />
        } />
        <Route path='/editProduct' element={
          <EditProduct />
        } />
      </Routes>
    </>
  );
}

export default App;
