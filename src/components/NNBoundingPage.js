import React, {useState} from "react";
import {TwoNeurons} from "./TwoNeurons";
import {OneNeuron} from "./OneNeuron";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {Helmet, HelmetProvider} from "react-helmet-async";


export const NNBoundingPage = () => {



    const [alignment, setAlignment] = useState('web'); // Default value

    const handleChange = (event, newAlignment) => {
        // Update the selected alignment
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>AIR - NNBounding</title>
                </Helmet>
            </HelmetProvider>
            <Container className="mt-5">
                <section className="nnbounding" id="nnboundingid" >
                    <h3>NNBounding Demo</h3>
                    <a href="https://github.com/richardborowski/nnbounding" target="_blank" rel="noopener noreferrer">Code Repository</a>
                </section>
                <ToggleButtonGroup

                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
                >
                    <ToggleButton value="One Neuron" sx={{
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.main' }, // Change to your desired hover color
                    }}>One Neuron</ToggleButton>
                    <ToggleButton value="Two Neurons" sx={{
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.main' }, // Change to your desired hover color
                    }}>Two Neurons</ToggleButton>

                </ToggleButtonGroup>

                {/* Conditional rendering based on the selected toggle button */}
                {alignment === 'One Neuron' ? <OneNeuron /> : <TwoNeurons />}
            </Container>


        </div>
    );
};