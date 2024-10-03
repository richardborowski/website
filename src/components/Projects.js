import React from 'react';
import {Nnbounding} from "./project-tabs/Nnbounding";
import { Gameboy } from "./project-tabs/Gameboy";
import { Cinema } from "./project-tabs/Cinema";
import {Helmet, HelmetProvider} from "react-helmet-async";

export const Projects = () => {
    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>AIR - Projects</title>
                </Helmet>
            </HelmetProvider>
            <Nnbounding />
            <Gameboy />
            <Cinema />
        </div>
    );
}
