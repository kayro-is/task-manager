import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./Components/Signup/Signup";
import Login from './Components/Login/Login';
import ForgotPassword from './Components/forgotPassword/forgotPassword';
import './Style/App.scss';

function App() {
  return (
    <Router>
   <div className="app-container">
    <Routes>
    <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
   </div>
    </Router>
  )
}

export default App