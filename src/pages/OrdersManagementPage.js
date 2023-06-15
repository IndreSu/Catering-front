import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const OrdersManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.orders) {
      setOrders(location.state.orders);
    } else {
      fetchOrders();
    }
  }, [location.state]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/orderings');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Error fetching orders:', response.status);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/orderings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        const updatedOrder = await response.json();
        const updatedOrders = orders.map(order => {
          if (order.id === updatedOrder.id) {
            return updatedOrder;
          }
          return order;
        });
        setOrders(updatedOrders);
      } else {
        console.error('Error updating order status:', response.status);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/orderings/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedOrders = orders.filter(order => order.id !== id);
        setOrders(updatedOrders);
      } else {
        console.error('Error deleting order:', response.status);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div>
      <h2>Order List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.clientId}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => updateOrderStatus(order.id, 'IN_PROGRESS')}>In Progress</button>
                <button onClick={() => updateOrderStatus(order.id, 'CONFIRMED')}>Confirm</button>
                <button onClick={() => updateOrderStatus(order.id, 'COMPLETED')}>Complete</button>
                <button onClick={() => updateOrderStatus(order.id, 'CANCELLED')}>Cancel</button>
                <button onClick={() => deleteOrder(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersManagementPage;

