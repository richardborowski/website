import React from 'react';
import {Nnbounding} from "./project-tabs/Nnbounding";
import { Gameboy } from "./project-tabs/Gameboy";
import { Cinema } from "./project-tabs/Cinema";

export const Projects = () => {
    return (
        <div>
            <Nnbounding />
            <Gameboy />
            <Cinema />
        </div>
    );
}
