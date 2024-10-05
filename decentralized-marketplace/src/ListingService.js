// src/ListingService.js

const BASE_URL = "http://127.0.0.1:5000"; // Update if your Flask app is running on a different URL

export const fetchListings = async () => {
    try {
        const response = await fetch(`${BASE_URL}/listings/uid`);
        if (!response.ok) {
            throw new Error("Failed to fetch listings");
        }
        const data = await response.json();
        return data.uids; // Assuming you just want the UIDs for now
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchListingDetails = async (uid) => {
    try {
        const response = await fetch(`${BASE_URL}/listing/${uid}`);
        if (!response.ok) {
            throw new Error("Failed to fetch listing details");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
