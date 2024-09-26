import React, { useState } from 'react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ name: '', price: '' });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleUpdateProduct = () => {
    setProducts(products.map(product => 
      product.id === editingProduct.id ? editingProduct : product
    ));
    setEditingProduct(null);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Add Product</h2>
        <input 
          type="text" 
          placeholder="Product Name" 
          value={newProduct.name} 
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Product Price" 
          value={newProduct.price} 
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div>
        <h2>Products</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              <button onClick={() => setEditingProduct(product)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
      {editingProduct && (
        <div>
          <h2>Edit Product</h2>
          <input 
            type="text" 
            placeholder="Product Name" 
            value={editingProduct.name} 
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Product Price" 
            value={editingProduct.price} 
            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} 
          />
          <button onClick={handleUpdateProduct}>Update Product</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;