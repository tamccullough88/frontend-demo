import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home'
import NewPersonForm from './Components/NewPersonForm';
import Display from './Components/Display';
import UpdatePersonForm from './Components/UpdatePersonForm';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/new' element={<NewPersonForm />} />
          <Route path='/person/:id' element={<Display />} />
          <Route path='/person/update/:id' element={<UpdatePersonForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
