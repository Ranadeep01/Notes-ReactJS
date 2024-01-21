import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  //in latest version of reactjs from version-6 sweitch is updated as routes
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;