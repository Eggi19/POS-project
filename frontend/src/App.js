import { Route, Routes } from 'react-router-dom';
import './App.css';
// import SignIn from './Pages/Login/login';
import ProductList from './Pages/ProductList/ProductList';
import SignInSide from './Pages/Login/login1';
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
        <Route path='/login1' element={
          <>
            <SignInSide />
          </>
        } />
        <Route path='/newProduct' element={
          <CreateProduct />
        } />
        <Route path='/editProduct' element={
          <EditProduct />
        } />
        <Route path='/categories' element={
          <CategoryPage />
        } />
      </Routes>
    </>
  );
}

export default App;
