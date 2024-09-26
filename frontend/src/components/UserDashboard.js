import React from 'react';

const UserDashboard = () => {
 

  return (
    <div>
      <h1>User Dashboard</h1>
      <div>
        <h2>Products</h2>
        <ul>
          <li>
          <link to="/productList">Product List</link>
          </li>
          <li>
          <link to="/productDetail">Product Detail</link>
          </li>
          <li>
          <link to="/cart">Cart</link>
          </li>
          <li>
          <link to="/payment">Payment</link>
          </li>
          <li>
          <link to="/reviewRating">Review and Rating</link>
          </li> 
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard; 