import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const cartRef = useRef();

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/all")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Remove product from cart
  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // Filter products
  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  if (sortOption === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="App">

      {/* Top Bar */}
      <div className="top-bar">
        <span>📍 Ahmedabad, India</span>
        <span>📞 +91 7862919381</span>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">CloudCart</h1>

        <ul className="nav-links">
          <li>Home</li>

          <li
            onClick={() =>
              document.getElementById("products").scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Products
          </li>

          <li>About</li>
          <li>Contact</li>

          <li>
            <a href="/login">Login</a>
          </li>

          <li>
            <a href="/signup">Signup</a>
          </li>
        </ul>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Cart */}
        <div ref={cartRef} className="cart-wrapper">
          <div
            className="cart-box"
            onClick={() => setShowCart(!showCart)}
          >
            Cart ({cart.length})
          </div>

          {showCart && (
            <div className="cart-dropdown">
              <h3>Your Cart</h3>

              {cart.length === 0 ? (
                <p>Cart is empty</p>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                      <div>
                        <p>{item.name}</p>
                        <p>₹{item.price}</p>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(index)}
                      >
                        ❌
                      </button>
                    </div>
                  ))}

                  <h4>
                    Total: ₹
                    {cart.reduce(
                      (total, item) => total + item.price,
                      0
                    )}
                  </h4>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-text">
          <h2>Your One-Stop Electronic Market</h2>
          <p>Shop premium gadgets powered by cloud technology.</p>

          <button
            onClick={() =>
              document.getElementById("products").scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section">
        <h2>Featured Products</h2>

        {/* Product Controls */}
        <div className="product-controls">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Laptop">Laptop</option>
            <option value="Accessories">Accessories</option>
            <option value="Audio">Audio</option>
            <option value="Camera">Camera</option>
            <option value="TV">TV</option>
            <option value="Watches">Watches</option>
          </select>

          <select
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="lowToHigh">
              Price: Low to High
            </option>
            <option value="highToLow">
              Price: High to Low
            </option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <p>{product.description}</p>

                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No matching products found.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">

          <div className="footer-section">
            <h3>CloudCart</h3>
            <p>Your trusted one-stop electronic marketplace.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <p>Home</p>
            <p>Products</p>
            <p>About</p>
            <p>Contact</p>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>📍 Ahmedabad, India</p>
            <p>📞 +91 7862919381</p>
            <p>✉ support@cloudcart.com</p>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 CloudCart. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default Home;