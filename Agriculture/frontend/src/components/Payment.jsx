import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQRCode from 'react-qr-code'; // Import the QRCode component from react-qr-code
import './Payment.css';


const Payment = () => {
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const defaultUPIId = "9063010872@ybl"; // Default UPI ID
    const userUniqueId = localStorage.getItem('uniqueId'); // Access unique ID from localStorage

    useEffect(() => {
        const fetchUserName = async () => {
            console.log('Fetching user details...');
            console.log('User Unique ID:', userUniqueId);
        
            if (!userUniqueId) {
                setError('Unique ID is missing. Please log in again.');
                return;
            }
        
            try {
                const response = await axios.get(`http://localhost:5000/api/user-details/${userUniqueId}`, {
                    withCredentials: true, // Send cookies to backend
                });
                console.log('User details response:', response.data);
        
                // Make sure to extract 'username' from the response
                if (response.data && response.data.username) {
                    setUserName(response.data.username); // Use 'username' field instead of 'name'
                } else {
                    setError('User details not found.');
                }
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError('Unable to fetch user details.');
            }
        };
        

        fetchUserName();
    }, [userUniqueId]);

    // If there's an error, show it to the user
    if (error) {
        return <p className="error-message">{error}</p>;
    }

    // If the user name is still loading, show a loading message
    if (!userName) {
        return <p>Loading...</p>;
    }

    const upiLink = `upi://pay?pa=${defaultUPIId}&pn=${userName}&am=0.00&cu=INR`; // UPI link for QR code

    return (
        <div className="payment-container">
            <h1>Payment Page</h1>
            <p><strong>Name:</strong> {userName}</p>
            <div className="qr-code">
                <ReactQRCode value={upiLink} size={200} /> {/* Generate QR code directly using react-qr-code */}
            </div>
        </div>
    );
};

export default Payment;
