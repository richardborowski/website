import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {Container, Navbar} from "react-bootstrap";
import { NavBar } from "./components/NavBar";
import { Nnbounding } from "./components/project-tabs/Nnbounding"
import { Projects } from "./components/Projects"
import {TwoNeurons} from "./components/TwoNeurons";
import {NNBoundingPage} from "./components/NNBoundingPage";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Home} from "./components/Home";
import {Footer} from "./components/Footer";

function App() {
  return (
      <Router>
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} /> {/* Add the projects route */}
                <Route path="/nnbounding" element={<NNBoundingPage />} />
            </Routes>
            <Footer />
        </div>
      </Router>
  );
}

export default App;
