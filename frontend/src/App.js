import { Route, Routes } from 'react-router-dom';
import './App.css';
// import SignIn from './Pages/Login/login';
import ProductList from './Pages/ProductList/ProductList';

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
      </Routes>
    </>
  );
}

export default App;
