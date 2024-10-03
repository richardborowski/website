import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Input } from "@mui/material";
import '@fontsource/roboto/300.css';
import { Container } from "react-bootstrap";

export const OneNeuron = () => {
    const [numbers1, setNumbers1] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingCount, setLoadingCount] = useState(0);

    // Load the input value from localStorage when the component mounts
    useEffect(() => {
        const savedInput = localStorage.getItem('numbers1');
        if (savedInput) {
            setNumbers1(savedInput);
        }
    }, []);

    // Save the input value to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('numbers1', numbers1);
    }, [numbers1]);

    const handleChange = (event) => {
        setNumbers1(event.target.value);
    };

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setLoadingCount(prev => prev + 1);
            }, 1000); // Increment counter every second

            return () => clearInterval(interval);
        }
    }, [loading]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const numberArray1 = numbers1.split(',').map(num => num.trim());

        // Validation
        if (numberArray1.length < 3 || numberArray1.length > 15) {
            setError('List must contain at least three items and fewer than 15.');
            return; // Exit early if validation fails
        }

        const formData = new FormData();
        numberArray1.forEach(num => formData.append('numbers1', num));

        setImages([]);  // Clear images before fetching new ones
        setError('');
        setLoading(true);
        setLoadingCount(0); // Reset loading counter

        fetch('https://nnboundingapi.onrender.com/get_images', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                const imageUrls = Array.isArray(data) ? data : Object.values(data);
                const updatedImageUrls = imageUrls.map(url => `${url}?t=${new Date().getTime()}`);
                setImages(updatedImageUrls);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
                setError('Failed to fetch images.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Container className="mt-5">
            <section className="nnbounding" id="nnboundingid">
                <h3>Single Neuron Bound      *****Currently Not Functional*****</h3>
                <form onSubmit={handleSubmit}>
                    <label style={{ marginRight: '10px' }} htmlFor="numbers1">Enter List of Numbers (comma separated):</label>
                    <Input
                        inputProps={{ style: { color: 'white' }, placeholder: 'e.g. 1,2' }}
                        onChange={handleChange} // Call your handleChange function
                        value={numbers1}
                        required
                    />
                    <br />
                    <Button size="small" type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Fetching...' : 'Fetch Images'}
                    </Button>
                </form>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {loading ? (
                    <div>
                        <div className="loader" style={{display: 'inline-block'}}></div>
                        <p>This could take awhile</p>
                        <p>Loading for {loadingCount} seconds...</p>
                        <CircularProgress/>
                    </div>
                ) : (
                    <div id="image-container" style={{ marginTop: '20px' }}>
                        {images.length > 0 ? (
                            images.map((src, index) => (
                                <img key={index} src={src} alt={`Image ${index + 1}`} style={{ maxWidth: '25%', height: 'auto' }} />
                            ))
                        ) : (
                            <p>No images to display.</p>
                        )}
                    </div>
                )}
            </section>
        </Container>
    );
};