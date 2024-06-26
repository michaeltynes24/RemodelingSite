import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import painting from "../../docs/images/painting.webp";
import dresser from "../../docs/images/Dresser.jpg";
import bed from "../../docs/images/Bed.jpg";
import api from "../api";

const Cart = () => {
    const custStyle = {
        "maxWidth": "50px",
        "maxHeight": "50px",
    }

    const carouselStyle = {
        "width": "50%", // Decrease carousel size by 100%
        "margin": "auto", // Center the carousel on the page
    };

    const [cart, setCart] = useState([]);

    useEffect(() => {
        getCart();
    }, []);

    const getCart = () => {
        api
            .get("/api/user/addCart/")
            .then((res) => res.data)
            .then((data) => {
                setCart(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    // Function to group cart items by itemName and calculate quantity
    const groupCartItems = () => {
        const groupedCart = {};
        cart.forEach((item) => {
            if (groupedCart[item.itemName]) {
                groupedCart[item.itemName].quantity += 1;
            } else {
                groupedCart[item.itemName] = { ...item, quantity: 1 };
            }
        });
        return Object.values(groupedCart);
    };

    return (
        <>
            <div className='container text-center'>
                <header className="centered-header">
                    <h3>Your Cart</h3>
                </header>
                <div>
                    <header className="centered-header">
                        <h5>Here are some pieces we think you'll love</h5>
                    </header>
                </div>
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" style={carouselStyle}>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={painting} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={dresser} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={bed} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div>
                    <header className="centered-header">
                        <h4>Order Summary</h4>
                    </header>
                </div>
                <div className="container text-center bg-dark">
                    {groupCartItems().map((item, index) => (
                        <div className="row" key={index}>
                            <div className="col text-light">
                                {item.quantity}x
                            </div>
                            <div className="col text-light">
                                {item.itemName}
                            </div>
                            <div className="col text-light">
                                {item.price}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-3">
                    <button type="button" className="btn btn-secondary btn-lg">Checkout</button>
                </div>
            </div>
        </>
    )
}

export default Cart;
