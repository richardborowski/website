import {BrowserRouter as Router, Routes, Route, HashRouter} from 'react-router-dom';
import './App.css';
import {Navbar} from "react-bootstrap";
import { NavBar } from "./components/NavBar";
import { Nnbounding } from "./components/project-tabs/Nnbounding"
import { Projects } from "./components/Projects"
import {ImageLoader} from "./components/ImageLoader";
import {NNBoundingPage} from "./components/NNBoundingPage";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
      <HashRouter>
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/website/projects" element={<Projects />} /> {/* Add the projects route */}
                    <Route path="/website/nnbounding" element={<NNBoundingPage />} />
                </Routes>
            </div>
        </Router>
      </HashRouter>
  );
}

export default App;
