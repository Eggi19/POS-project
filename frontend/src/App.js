import { Route, Routes } from 'react-router-dom';
import './App.css';
// import SignIn from './Pages/Login/login';
import ProductList from './Pages/ProductList/ProductList';
import SignInSide from './Pages/Login/login1';


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
      </Routes>
    </>
  );
}

export default App;
