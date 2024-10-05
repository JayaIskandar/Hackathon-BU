// src/PaymentPage.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const PaymentPage = ({ listing, onBack }) => {
  const handlePayment = async () => {
    // Payment logic via smart contract
    alert(`Processing payment for ${listing.title}...`);
    // Here, you'd implement your smart contract call for payment
    // e.g., call to a Tron smart contract to transfer the amount
  };

  return (
    <div className="container mt-5 payment-page">
      <h1 className="text-center">Payment Page</h1>
      <div className="card mb-4">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={listing.img_url || "https://via.placeholder.com/150"}
              className="img-fluid small-image" // Apply the small image class
              alt={listing.title}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{listing.title}</h5>
              <p className="card-text">{listing.desc}</p>
              <p className="card-text">
                <strong>Price: {listing.price} USDD</strong>
              </p>
              <button className="btn btn-success" onClick={handlePayment}>
                Confirm Payment
              </button>
              <button className="btn btn-secondary mt-2" onClick={onBack}>
                Back to Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
