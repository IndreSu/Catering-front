import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewOrderPage = ({ cartItems, setCartItems }) => {
  const [clientId, setClientId] = useState('');
  const navigate = useNavigate();

  const handleMakeOrder = async () => {
    try {
      const orderData = {
        clientId: clientId,
        mealQuantities: cartItems.reduce((quantities, item) => {
          quantities[item.id] = item.quantity;
          return quantities;
        }, {}),
      };
  
      const response = await fetch('http://localhost:8080/client/api/v1/orderings/make', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        // Order created successfully
        setCartItems([]);
        setClientId('');
        alert('Order placed successfully!');
  
        // Fetch orders for admin page
        const adminResponse = await fetch('http://localhost:8080/api/v1/orderings');
        if (adminResponse.ok) {
          const adminData = await adminResponse.json();
          navigate('api/v1/orderings', { state: { orders: adminData } });
        } else {
          console.error('Error fetching admin orders:', adminResponse.status);
        }
      } else {
        throw new Error('Failed to place the order.');
      }
    } catch (error) {
      console.error('Error placing the order:', error);
    }
  };
  
  
  const handleClientIdChange = (event) => {
    setClientId(event.target.value);
  };

  const removeCartItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <h2>Order Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Meal</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => removeCartItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <label htmlFor="clientId">Client ID:</label>
        <input
          type="text"
          id="clientId"
          value={clientId}
          onChange={handleClientIdChange}
        />
      </div>

      <button onClick={handleMakeOrder}>Make Order</button>
    </div>
  );
};

export default ViewOrderPage;
