import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Admin.css';

const AdminPage = () => {
    const location = useLocation();
    const [product, setProduct] = useState({
        name: '',
        type: '',
        description: '',
        price: '',
        image: ''
    });
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateProductId, setUpdateProductId] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    // Fetch products from the backend
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError('Failed to load products.');
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch products when the component mounts
    }, []);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(updateProductId ? `http://localhost:5000/api/products/${updateProductId}` : 'http://localhost:5000/api/products/add', {
                method: updateProductId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                setToastMessage(updateProductId ? 'Product updated successfully!' : 'Product added successfully!');
                setProduct({ name: '', type: '', description: '', price: '', image: '' });
                fetchProducts(); // Refresh product list

                // Clear toast message after 3 seconds
                setTimeout(() => {
                    setToastMessage('');
                }, 3000);
            } else {
                setError('Failed to add or update product.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${deleteProductId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setToastMessage('Product deleted successfully!');
                fetchProducts(); // Refresh product list after delete

                // Clear toast message after 3 seconds
                setTimeout(() => {
                    setToastMessage('');
                }, 3000);
            } else {
                setError('Failed to delete product.');
            }
        } catch (error) {
            setError('An error occurred while deleting the product.');
        } finally {
            setShowDeleteModal(false); // Close the modal
        }
    };

    const pageBackground = location.pathname === '/admin' ? 'url(/admin-bg.jpg)' : '#f7f7f7';

    return (
        <div className="admin-page" style={{ background: pageBackground }}>
            <div className="dashboard-container">
                {/* Sidebar */}
                <div className="sidebar">
                    <h3 className="sidebar-title">Admin Dashboard</h3>
                    <ul>
                        <li><a href="/admin/page" className="sidebar-link">Dashboard</a></li>
                        <li><a href="/admin/order" className="sidebar-link">Orders</a></li>
                    </ul>
                </div>

                <div className="main-content">
                    {/* Dashboard Overview */}
                    <div className="overview">
                        <h2>Product Management</h2>
                        <div className="overview-content">
                            <div className="card">
                                <h3>Total Products</h3>
                                <p>{products.length}</p>
                            </div>
                            <div className="card add-product">
                                <button className="btn-add" onClick={() => setShowUpdateModal(true)}>Add Product</button>
                            </div>
                        </div>
                    </div>

                    {/* Product List */}
                    <div className="product-list">
                        <h3>Product List</h3>
                        <div className="grid-container">
                            {products.map((product) => (
                                <div key={product._id} className="product-card">
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <div className="product-info">
                                        <h4>{product.name}</h4>
                                        <p>{product.type}</p>
                                        <p>{product.description}</p>
                                        <p>₹{product.price}</p>
                                    </div>
                                    <div className="product-actions">
                                        <button className="update-btn" onClick={() => {
                                            setUpdateProductId(product._id);
                                            setProduct(product);
                                            setShowUpdateModal(true);
                                        }}>
                                            Edit
                                        </button>
                                        <button className="delete-btn" onClick={() => {
                                            setDeleteProductId(product._id);
                                            setShowDeleteModal(true);
                                        }}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Are you sure you want to delete this product?</h3>
                        <button onClick={() => setShowDeleteModal(false)} className="cancel-btn">Cancel</button>
                        <button onClick={handleDelete} className="confirm-btn">Confirm</button>
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{updateProductId ? 'Update Product' : 'Add Product'}</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                placeholder="Product Name"
                            />
                            <input
                                type="text"
                                name="type"
                                value={product.type}
                                onChange={handleChange}
                                placeholder="Product Type"
                            />
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                placeholder="Description"
                            />
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                placeholder="Price"
                            />
                            <input
                                type="text"
                                name="image"
                                value={product.image}
                                onChange={handleChange}
                                placeholder="Image URL"
                            />
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowUpdateModal(false)} className="cancel-btn">Cancel</button>
                                <button type="submit" className="confirm-btn">{updateProductId ? 'Update' : 'Add'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
