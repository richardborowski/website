import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {Navbar} from "react-bootstrap";
import { NavBar } from "./components/NavBar";
import { Nnbounding } from "./components/project-tabs/Nnbounding"
import { Projects } from "./components/Projects"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
      <Router>
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/projects" element={<Projects />} /> {/* Add the projects route */}
            </Routes>
        </div>
      </Router>
  );
}

export default App;
