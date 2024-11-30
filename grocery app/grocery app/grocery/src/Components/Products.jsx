import React, { useEffect, useState } from "react";
import "./Store.css";
import axios from "axios";

const Products = ({ searchQuery }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]); // Manage the cart state
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    images: [""],
  }); // State for adding a new product
  const [editProduct, setEditProduct] = useState(null); // State for editing a product

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/products");
      setData(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new product
  const handleAddProduct = async () => {
    if (!newProduct.title || !newProduct.price || !newProduct.category) {
      alert("All fields are required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/products", newProduct);
      setData([...data, response.data]); // Add the new product to the list
      setNewProduct({ title: "", price: "", category: "", images: [""] }); // Reset the form
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Handle editing a product
  const handleEditProduct = async (product) => {
    try {
      const response = await axios.put(`http://localhost:8000/products/${product.id}`, product);
      setData((prevData) =>
        prevData.map((item) => (item.id === product.id ? response.data : item))
      ); // Update the product in the list
      setEditProduct(null); // Close the edit form
    } catch (err) {
      console.error("Error editing product:", err);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/products/${productId}`);
      setData(data.filter((product) => product.id !== productId)); // Remove the product from the list
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Filter products based on the search query
  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="store-container">
      {loading && <h1>Loading...</h1>}
      {!loading && filteredProducts.length === 0 && <h2>No products found</h2>}

      {/* Add Product Form */}
      <div className="add-product">
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.images[0]}
          onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
        />
        <button className="btn btn-primary" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      {/* Products Section */}
      <div className="products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card">
            <img src={product.images[0]} alt={product.title} />
            <div className="card-description">
              <h6>{product.title}</h6>
              <h6>{`Price: $${product.price}`}</h6>
              <h6>{`Category: ${product.category}`}</h6>

              {/* Add to Cart Button */}
              <button className="btn btn-primary" onClick={() => setCart([...cart, product])}>
                Add to Cart
              </button>

              {/* Edit Button */}
              <button className="btn btn-secondary" onClick={() => setEditProduct(product)}>
                Edit
              </button>

              {/* Delete Button */}
              <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Product Form */}
      {editProduct && (
        <div className="edit-product">
          <h2>Edit Product</h2>
          <input
            type="text"
            placeholder="Title"
            value={editProduct.title}
            onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={editProduct.category}
            onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={editProduct.images[0]}
            onChange={(e) => setEditProduct({ ...editProduct, images: [e.target.value] })}
          />
          <button className="btn btn-primary" onClick={() => handleEditProduct(editProduct)}>
            Save Changes
          </button>
        </div>
      )}

      {/* Cart Section */}
      <div className="cart">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div className="products">
            {cart.map((item) => (
              <div key={item.id} className="card">
                <img src={item.images[0]} alt={item.title} />
                <div className="card-description">
                  <h6>{item.title}</h6>
                  <h6>{`Price: $${item.price}`}</h6>
                  <h6>{`Category: ${item.category}`}</h6>

                  {/* Remove from Cart Button */}
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      setCart(cart.filter((cartItem) => cartItem.id !== item.id))
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
