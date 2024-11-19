import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Input } from "@mui/material";
import '@fontsource/roboto/300.css';
import { Container } from "react-bootstrap";

export const TwoNeurons = () => {
    const [numbers1, setNumbers1] = useState('');
    const [numbers2, setNumbers2] = useState('');
    const [images, setImages] = useState([]);
    const [ttp, setTtp] = useState(''); 
    const [ttf, setTtf] = useState(''); 
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

        /*
        fetch('http://localhost:5000/get_images', {
            method: 'POST',
            body: formData,
        })
       
        */
        fetch('https://nnboundingapi.onrender.com/get_images', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json(); // Parse JSON response
            })
            .then(data => {
                console.log("Response from backend:", data);  // Print the full response
        
                // Extract image URLs from the response (make sure they are in the correct format)
                const imageUrls = Array.isArray(data) ? data : Object.values(data);
                console.log("Extracted image URLs:", imageUrls);  // Print the extracted image URLs
        
                // If the response contains valid URLs, we can proceed to set the state
                const updatedImageUrls = imageUrls.map(url => `${url}?t=${new Date().getTime()}`);  // Cache-busting query parameter
                setImages(updatedImageUrls);
                setTtp(data.TTP1);
                setTtf(data.TTF1);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
                setError('Failed to fetch images.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const renderTruthTable = (data, type) => {
        if (!data || data.length === 0) return null;
    
        // Get the number of inputs based on the first tuple in the first array
        const numInputs = data[0][0].length;
    
        // Generate column headers dynamically based on the number of inputs
        const headers = [];
        for (let i = 1; i <= numInputs; i++) {
            headers.push(`I${i}`);  // Input headers: I_1, I_2, ...
        }
        headers.push('Output');  // Add the 'Output' header
    
        return (
            <div>
                {/* Render a label based on the type */}
                <h3>{type === "TTP" ? "True Table" : "False Table"}</h3>
    
                <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Add a white horizontal line (border-bottom) after the header */}
                        <tr>
                            <td colSpan={numInputs + 1} style={{ borderBottom: '2px solid white' }}></td>
                        </tr>
    
                        {data.map((set, setIndex) => (
                            <React.Fragment key={setIndex}>
                                {set.map((tuple, tupleIndex) => (
                                    <tr key={tupleIndex}>
                                        {/* Render each item in the tuple (except the last one which is the output) */}
                                        {tuple.slice(0, numInputs).map((value, idx) => (
                                            <td key={idx}>{value}</td>
                                        ))}
                                        {/* Adjust the output based on the table type */}
                                        <td>{type === "TTP" ? 1 : 0}</td>  {/* True Table -> 1, False Table -> 0 */}
                                    </tr>
                                ))}
                                {/* Add a white horizontal line after each set of rows */}
                                <tr>
                                    <td colSpan={numInputs + 1} style={{ borderBottom: '2px solid white' }}></td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        );
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
                 
                <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', padding: '50px' }}>
                    {ttp && renderTruthTable(ttp, "TTP")}
                    {ttf && renderTruthTable(ttf, "TTF")}
                </div>
            </section>
        </Container>
    );
};