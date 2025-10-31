import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
    const [index, setIndex] = useState(0);
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {images.map((image, idx) => (
                    <div
                        key={idx}
                        className="min-w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
