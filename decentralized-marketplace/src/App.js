import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LandingPage from "./LandingPage";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [listings, setListings] = useState([]);

  const connectWallet = async () => {
    // We'll implement this later
    console.log("Wallet connection not implemented yet");
  };

  const navigateToMarketplace = () => {
    setShowLandingPage(false);
    fetchListings();
  };

  const navigateBackToLandingPage = () => {
    setShowLandingPage(true);
    setWalletAddress("");
  };

  const fetchListings = async () => {
    try {
      console.log("Fetching listings...");
      const response = await fetch("http://127.0.0.1:5000/listings");
      const listingsData = await response.json();
      console.log("Fetched listings:", listingsData);
      setListings(listingsData);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };
  

  useEffect(() => {
    if (!showLandingPage) {
      fetchListings();
    }
  }, [showLandingPage]);

  return (
    <div className="App container mt-5">
      {showLandingPage ? (
        <LandingPage navigateToMarketplace={navigateToMarketplace} />
      ) : (
        <>
          <h1 className="text-center">Decentralized Marketplace</h1>
          <div className="text-center mb-4">
            <button className="btn btn-primary" onClick={connectWallet}>
              {walletAddress ? "Connected: " + walletAddress : "Connect Wallet"}
            </button>
          </div>
          <div className="text-center mb-4">
            <button className="btn btn-secondary" onClick={navigateBackToLandingPage}>
              Back to Home
            </button>
          </div>
          <div className="row">
            {listings.map((listing) => (
              <div className="col-md-4 mb-4" key={listing.uid}>
                <div className="card">
                  <img src={listing.img_url || "https://via.placeholder.com/150"} className="card-img-top" alt={listing.title} />
                  <div className="card-body">
                    <h5 className="card-title">{listing.title}</h5>
                    <p className="card-text">{listing.desc}</p>
                    <p className="card-text">
                      <strong>Price: {listing.price} USDD</strong>
                    </p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;