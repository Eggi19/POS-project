import { Route, Routes } from 'react-router-dom';
import './App.css';
// import SignIn from './Pages/Login/login';
import ProductList from './Pages/ProductList/ProductList';
import PaginationControlled from './Components/Pagination/Pagination';



function App() {
  return (
    <>
      {/* <SignIn /> */}
      <Routes>
        <Route path='/products' element={
          <>
            <ProductList />
            <PaginationControlled />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;
