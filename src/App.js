import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
// import submitState from './context/submit/submitState';
import SubmitState from './context/submit/SubmitState';


function App() {
  return (


    <div className="App">
      <SubmitState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </SubmitState>
    </div>

  );
}

export default App;
