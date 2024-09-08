import React, { useEffect, useRef } from 'react';
import { CgClose } from 'react-icons/cg';

const DisplayImage = ({ imgUrl, onClose }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onClose();
            }
        };

        // Attach event listener to handle outside clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-black bg-opacity-50'>
            <div ref={containerRef} className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <CgClose />
                </div>
                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                    <img src={imgUrl} className='max-w-96 max-h-96' alt="Displayed" />
                </div>
            </div>
        </div>
    );
};

export default DisplayImage;
