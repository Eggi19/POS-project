import { Route, Routes } from 'react-router-dom';
import './App.css';
// import SignIn from './Pages/Login/login';
import ProductList from './Pages/ProductList/ProductList';
import SignInSide from './Pages/Login/login1';
import CategoryPage from './Pages/CategoryList/CategoryList';
import CreateProduct from './Pages/CreateProduct/createProduct';
import EditProduct from './Pages/EditProduct/editProduct';
import SignUp from './Pages/SignUp/signUp';
import Cart from './Pages/Cart/cart';


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
        <Route path='/register' element={
          <SignUp />
        } />
        <Route path='/cart' element={
          <Cart />
        } />
      </Routes>
    </>
  );
}

export default App;
