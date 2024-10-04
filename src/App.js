import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Container, Navbar } from "react-bootstrap";
import { NavBar } from "./components/NavBar";
import { Nnbounding } from "./components/project-tabs/Nnbounding";
import { Projects } from "./components/Projects";
import { TwoNeurons } from "./components/TwoNeurons";
import { NNBoundingPage } from "./components/NNBoundingPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from "./components/Home";
import { Footer } from "./components/Footer";
import * as PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";
import React from "react";
import ScrollToTop from './components/AutoScrollTop';
import AutoScrollTop from "./components/AutoScrollTop";

function App() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>AIR - Home</title>
            </Helmet>

            <Router>
                <div>
                    <AutoScrollTop />
                    <NavBar />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/nnbounding" element={<NNBoundingPage />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;
