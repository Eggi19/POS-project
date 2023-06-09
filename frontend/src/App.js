import { Route, Routes } from 'react-router-dom';
import './App.css';
// import SignIn from './Pages/Login/login';
import ProductList from './Pages/ProductList/ProductList';
import SignInSide from './Pages/Login/login1';
import CategoryPage from './Pages/CategoryList/CategoryList';
import CreateProduct from './Pages/CreateProduct/createProduct';
import EditProduct from './Pages/EditProduct/editProduct';
import SignUp from './Pages/SignUp/signUp';
import Dashboard from './Pages/Dashboard/Dashboard';

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
        <Route path='/' element={
          <>
            <SignInSide />
          </>
        } />
        {/* <Route path='/newProduct' element={
          <CreateProduct />
        } />
        <Route path='/editProduct' element={
          <EditProduct />
        } />
        <Route path='/categories' element={
          <CategoryPage />
        } /> */}
        {/* <Route path='/register' element={
          <SignUp />
        } /> */}
        <Route path='/dashboard' element={
          <Dashboard />
        } />
      </Routes>
    </>
  );
}

export default App;
