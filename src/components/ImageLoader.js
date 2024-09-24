import React, { useState } from 'react';

export const ImageLoader = () => {
    const [numbers1, setNumbers1] = useState('');
    const [numbers2, setNumbers2] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const numberArray1 = numbers1.split(',').map(num => num.trim());
        const numberArray2 = numbers2.split(',').map(num => num.trim());

        // Validation: Check if both arrays have the same length and at least two items
        if (numberArray1.length !== numberArray2.length || numberArray1.length < 3 || numberArray1.length > 15) {
            setError('Both lists must have the same number of items and contain at least three items and fewer than 15.');
            return; // Exit early if validation fails
        }

        const formData = new FormData();
        numberArray1.forEach(num => formData.append('numbers1', num));
        numberArray2.forEach(num => formData.append('numbers2', num));

        // Log form data to the console
        console.log("Form data:");
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        setImages([]);  // Clear images before fetching new ones
        setError('');

        fetch('http://127.0.0.1:5000/get_images', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                console.log("Fetched data:", data);
                const imageUrls = Array.isArray(data) ? data : Object.values(data);
                const updatedImageUrls = imageUrls.map(url => `${url}?t=${new Date().getTime()}`);
                setImages(updatedImageUrls);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
                setError('Failed to fetch images.');
            });
    };

    return (
        <div>
            <h3>2 Neuron Bounds</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="numbers1">Enter First List of Numbers (comma separated):</label>
                <input
                    type="text"
                    id="numbers1"
                    value={numbers1}
                    onChange={(e) => setNumbers1(e.target.value)}
                    placeholder="e.g. 1,2"
                    required
                />
                <br/>
                <label htmlFor="numbers2">Enter Second List of Numbers (comma separated):</label>
                <input
                    type="text"
                    id="numbers2"
                    value={numbers2}
                    onChange={(e) => setNumbers2(e.target.value)}
                    placeholder="e.g. 3,4"
                    required
                />

                <button type="submit" style={{color: 'white'}}>Fetch Images</button>
            </form>

            {error && <p style={{color: 'red'}}>{error}</p>}

            <div id="image-container">
                {images.length > 0 ? (
                    images.map((src, index) => (
                        <img key={index} src={src} alt={`Image ${index + 1}`}
                             style={{maxWidth: '25%', height: 'auto'}}/>
                    ))
                ) : (
                    <p>No images to display.</p>
                )}
            </div>
        </div>
    );
};