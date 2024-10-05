// src/Listings.js

import React, { useEffect, useState } from "react";
import { fetchListings, fetchListingDetails } from "./ListingService";

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadListings = async () => {
            try {
                const uids = await fetchListings();
                const listingDetails = await Promise.all(
                    uids.map(uid => fetchListingDetails(uid))
                );
                setListings(listingDetails);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadListings();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Listings</h1>
            <ul>
                {listings.map((listing) => (
                    <li key={listing.uid}>
                        <h2>{listing.title}</h2>
                        <p>{listing.desc}</p>
                        <p>Price: ${listing.price}</p>
                        {listing.shipping && <p>Shipping available</p>}
                        <img src={listing.img_url} alt={listing.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Listings;
