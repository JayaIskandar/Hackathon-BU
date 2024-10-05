import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LandingPage from "./LandingPage";
import PaymentPage from "./PaymentPage"; // Import the new PaymentPage component

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [listings, setListings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null); // State to hold the selected listing for payment
  const [showPaymentPage, setShowPaymentPage] = useState(false); // State to control showing the payment page

  const connectWallet = async () => {
    if (window.tronLink && window.tronWeb && window.tronWeb.defaultAddress.base58) {
      try {
        // Requesting to connect the wallet
        await window.tronLink.request({ method: 'tron_requestAccounts' });
        
        // Retrieving the wallet address after connecting
        const address = window.tronWeb.defaultAddress.base58;
        
        // Check if address is valid and not undefined
        if (address) {
          setWalletAddress(address);
          console.log("Connected:", address);
        } else {
          console.error("No address found after connection.");
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install TronLink to use this feature.");
    }
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

  const addToWishlist = (listing) => {
    if (!wishlist.some(item => item.uid === listing.uid)) {
      setWishlist((prevWishlist) => [...prevWishlist, listing]);
    } else {
      alert("This item is already in your wishlist.");
    }
  };

  const removeFromWishlist = (listing) => {
    setWishlist((prevWishlist) => prevWishlist.filter(item => item.uid !== listing.uid));
  };
  

  const handleBuyNow = (listing) => {
    setSelectedListing(listing); // Set the selected listing
    setShowPaymentPage(true); // Show the payment page
  };

  const handleBackToMarketplace = () => {
    setShowPaymentPage(false); // Hide the payment page
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
      ) : showPaymentPage ? (
        <PaymentPage listing={selectedListing} onBack={handleBackToMarketplace} /> // Show the payment page
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
                    <button className="btn btn-success" onClick={() => handleBuyNow(listing)}>
                      Buy Now
                    </button>
                    <button className="btn btn-outline-secondary mt-2" onClick={() => addToWishlist(listing)}>
                      ❤️ Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Display Wishlist */}
          <div className="wishlist mt-4">
            <h3>Your Wishlist</h3>
            <div className="row">
              {wishlist.length > 0 ? (
                wishlist.map((item, index) => (
                  <div className="col-md-12 mb-4" key={index}>
                    <div className="wishlist-card d-flex align-items-center">
                      <img src={item.img_url || "https://via.placeholder.com/150"} className="wishlist-card-img" alt={item.title} />
                      <div className="wishlist-card-body">
                        <h5 className="wishlist-card-title">{item.title}</h5>
                        <p className="wishlist-card-text">{item.desc}</p>
                        <p className="wishlist-card-price">
                          <strong>Price: {item.price} USDD</strong>
                        </p>
                        <button className="btn btn-danger" onClick={() => removeFromWishlist(item)}>
                          Remove from wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No items in your wishlist.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
