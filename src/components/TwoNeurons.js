import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Input } from "@mui/material";
import '@fontsource/roboto/300.css';
import { Container } from "react-bootstrap";

export const TwoNeurons = () => {
    const [numbers1, setNumbers1] = useState('');
    const [numbers2, setNumbers2] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingCount, setLoadingCount] = useState(0);

    // Load inputs from localStorage when the component mounts
    useEffect(() => {
        const savedNumbers1 = localStorage.getItem('numbers1');
        const savedNumbers2 = localStorage.getItem('numbers2');
        if (savedNumbers1) {
            setNumbers1(savedNumbers1);
        }
        if (savedNumbers2) {
            setNumbers2(savedNumbers2);
        }
    }, []);

    // Save inputs to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('numbers1', numbers1);
    }, [numbers1]);

    useEffect(() => {
        localStorage.setItem('numbers2', numbers2);
    }, [numbers2]);

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
        const numberArray2 = numbers2.split(',').map(num => num.trim());

        // Validation
        if (numberArray1.length !== numberArray2.length || numberArray1.length < 3 || numberArray1.length > 15) {
            setError('Both lists must have the same number of items and contain at least three items and fewer than 15.');
            return; // Exit early if validation fails
        }

        const formData = new FormData();
        numberArray1.forEach(num => formData.append('numbers1', num));
        numberArray2.forEach(num => formData.append('numbers2', num));

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
                <h3>2 Neuron Bounds</h3>
                <form onSubmit={handleSubmit}>
                    <label style={{ marginRight: '10px' }} htmlFor="numbers1">Enter First List of Numbers (comma separated):</label>
                    <Input
                        inputProps={{ style: { color: 'white' }, placeholder: 'e.g. 1,2' }}
                        onChange={(e) => setNumbers1(e.target.value)} // Set numbers1 state
                        value={numbers1}
                        required
                    />
                    <br />
                    <label style={{ marginRight: '10px' }} htmlFor="numbers2">Enter Second List of Numbers (comma separated):</label>
                    <Input
                        inputProps={{ style: { color: 'white' }, placeholder: 'e.g. 3,4' }}
                        onChange={(e) => setNumbers2(e.target.value)} // Set numbers2 state
                        value={numbers2}
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