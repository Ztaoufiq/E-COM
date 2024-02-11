import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';


// Some Hooks
import Hooks from './components/hooks/Hooks';

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/product/:id' element={<ProductDetails  />} exact />
            <Route path='/hooks' element={<Hooks  />} exact />
          </Routes>          
        </div>        
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
