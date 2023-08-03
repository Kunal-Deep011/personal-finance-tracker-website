import "./App.css";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
  <>
    <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
  </>
  );
}

export default App;
