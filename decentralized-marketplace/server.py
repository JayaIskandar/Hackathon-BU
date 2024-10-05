from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from bson.objectid import ObjectId
from web3 import Web3
import tronpy
import random
import json

from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
api = Api(app)

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://proxydox3:yK1TlkfVU6u3HKw3@cluster0.n6g4h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri)

db = client.swapsquad
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print("ERROR CONNECTING TO DB")
    print(e)

@app.route('/listing/<int:uid>', methods=['GET', 'POST'])
def get_listing(uid):
    try:
        # Fetch the listing from MongoDB using the uid
        listing = db.listings.find_one({"uid": uid})

        if listing is None:
            return jsonify({"error": "Listing not found"}), 404

        # Prepare response data
        response = {
            "_id": str(listing.get("_id")),
            "uid": listing.get("uid"),
            "img_url": listing.get("img_url"),
            "title": listing.get("title"),
            "desc": listing.get("desc"),
            "seller_address": listing.get("seller_address"),
            "price": listing.get("price"),
            "shipping": listing.get("shipping"),
            "coordinates": listing.get("coordinates"),
            "is_bought": listing.get("is_bought"),
        }

        # Optionally, you could integrate Web3 here if you need contract interaction
        # Example: Check if the item is bought through the smart contract
        # is_bought_contract = contract.functions.isBought(uid).call()
        # response['is_bought'] = is_bought_contract

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Route for creating a new listing (PUT request)
@app.route('/listing', methods=['PUT'])
def create_listing():
    try:
        # Get the JSON payload from the request
        data = request.json

        # Generate a random int64 UID
        uid = random.randint(1, 2**63 - 1)

        # Define the fields for the new listing
        new_listing = {
            "uid": uid,
            "img_url": data.get("img_url"),
            "title": data.get("title"),
            "desc": data.get("desc"),
            "seller_address": data.get("seller_address"),
            "price": data.get("price"),
            "shipping": data.get("shipping"),
            "coordinates": data.get("coordinates"),
            "is_bought": data.get("is_bought", False),  # Default to False if not provided
        }

        # Insert the new listing into MongoDB
        result = db.listings.insert_one(new_listing)

        # Return the newly created listing
        response = {
            "_id": str(result.inserted_id),
            "uid": new_listing["uid"],
            "img_url": new_listing["img_url"] or None,
            "title": new_listing["title"],
            "desc": new_listing["desc"],
            "seller_address": new_listing["seller_address"],
            "price": new_listing["price"],
            "shipping": new_listing["shipping"],
            "coordinates": new_listing["coordinates"],
            "is_bought": new_listing["is_bought"],
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/listings/uid', methods=['GET'])
def get_uids():
    try:
        # Fetch up to 30 listings from MongoDB
        listings = db.listings.find({}, {"uid": 1}).limit(30)

        # Extract UIDs from the documents
        uids = [listing["uid"] for listing in listings]

        return jsonify({"uids": uids}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/listings', methods=['GET'])  # Ensure this endpoint is defined
def get_listings():
    try:
        # Fetch all listings from MongoDB
        listings = db.listings.find({}, {"_id": 0})  # Exclude the MongoDB ObjectId and include all fields

        # Convert the cursor to a list of dictionaries
        listings_list = list(listings)

        return jsonify(listings_list), 200  # Return the complete listings

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
    
if __name__ == '__main__':
    app.run(debug=True)