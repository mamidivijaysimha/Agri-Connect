import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCarrot,
  faWheatAlt,
  faFlask,
  faToolbox,
  faUpload,
  faCartShopping,
  faUserCircle,
  faSignOutAlt,
  faPercentage,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = ({ setCartItems }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    const newItem = {
      uniqueId: localStorage.getItem('uniqueId'), // Ensure this is set correctly
      name: product.name,
      type: product.type,
      price: product.price,
      quantity: product.quantity, // Default quantity; change if needed
      phone: product.phone || '', // Placeholder; can be fetched from user data
      address: product.address || '', // Placeholder; can be fetched from user data
      image: product.image,
     
    };

    try {
      // Sending POST request to add item to cart
      await axios.post('http://localhost:5000/api/cart', newItem);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error.response.data); // Log error response
      alert('You should login to add products to your cart');
    }
  };

  return (
    <div className="home-container">
      <header className="header">
  <nav className="nav">
    <ul>
      <li>
        <Link to="/" className="nav-item">
          <FontAwesomeIcon icon={faHome} className="nav-icon" />
          <span className="nav-label">Home</span>
        </Link>
      </li>
      <li>
        <Link to="/vegetables" className="nav-item">
          <FontAwesomeIcon icon={faCarrot} className="nav-icon" />
          <span className="nav-label">Vegetables</span>
        </Link>
      </li>
      <li>
        <Link to="/crops" className="nav-item">
          <FontAwesomeIcon icon={faWheatAlt} className="nav-icon" />
          <span className="nav-label">Crops</span>
        </Link>
      </li>
      <li>
        <Link to="/fertilizers" className="nav-item">
          <FontAwesomeIcon icon={faFlask} className="nav-icon" />
          <span className="nav-label">Fertilizers</span>
        </Link>
      </li>
      <li>
        <Link to="/hardware" className="nav-item">
          <FontAwesomeIcon icon={faToolbox} className="nav-icon" />
          <span className="nav-label">Hardware</span>
        </Link>
      </li>
      <li>
        <Link to="/upload" className="nav-item">
          <FontAwesomeIcon icon={faUpload} className="nav-icon" />
          <span className="nav-label">Upload</span>
        </Link>
      </li>
      <li>
        <Link to="/cart" className="nav-item">
          <FontAwesomeIcon icon={faCartShopping} className="nav-icon" />
          <span className="nav-label">Cart</span>
        </Link>
      </li>
      <li>
        <Link to="/data" className="nav-item">
          <FontAwesomeIcon icon={faPercentage} className="nav-icon" />
          <span className="nav-label">Schemes</span>
        </Link>
      </li>
      <li>
        <Link to="/mycard" className="nav-item">
          <FontAwesomeIcon icon={faCartShopping} className="nav-icon" />
          <span className="nav-label">My cart</span>
        </Link>
      </li>
      <li>
        <Link to="/profile" className="nav-item">
          <FontAwesomeIcon icon={faUserCircle} className="nav-icon" />
          <span className="nav-label">Profile</span>
        </Link>
      </li>
      <li>
        <Link to="/help" className="nav-item">
          <FontAwesomeIcon icon={faCircleQuestion} className="nav-icon" />
          <span className="nav-label">Help</span>
        </Link>
      </li>
      <li>
        <Link to="/logout" className="nav-item">
          <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
          <span className="nav-label">Logout</span>
        </Link>
      </li>
    </ul>
  </nav>
</header>


      <div className="welcome-message">
        <h2>Welcome to AgriConnect!</h2>
        <p>Your one-stop solution for connecting with farmers and buying farming products.</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={`http://localhost:5000/images/${product.image}`}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-type">{product.type}</p>
            <p className="product-price">Price: ₹{product.price}</p>
            <p className="product-quantity">Quantity: {product.quantity} kg</p>
            <button className="buy-button" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            <Link to={`/buy/${product._id}`}>
              <button className="buy-button">Buy</button>
            </Link>
          </div>
        ))}
      </div>
            {/* Footer Section */}
            <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 AgriConnect. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
