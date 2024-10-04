import React from 'react';
import logo from '../assets/images/mlogo2.png';
import {Button} from "@mui/material";

export const Footer = () => {
    return (
        <div className="wrapper">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3  border-top text-white">
                <p className="col-md-4 mb-0">© 2024 Richard, Inc</p>

                <a href="/website" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <img src={logo} alt="Logo" className="small-logo"/>
                </a>
                <Button href="/website" size="small" variant="contained">
                    Home
                </Button>
            </footer>
        </div>
    );
};
