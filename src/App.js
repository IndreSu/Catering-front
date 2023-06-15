import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Menu } from './components/Menu';
import ViewMealsPage from './pages/ViewMealsPage';
import ViewOrderPage from './pages/ViewOrderPage';
import OrdersManagementPage from './pages/OrdersManagementPage';

const apiUrl = 'http://localhost:8080';

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="App">
      <HashRouter>
        <Menu />
        <Routes>
          <Route path="/meals" element={<ViewMealsPage setCartItems={setCartItems} />} />
          <Route path="/orderings" element={<ViewOrderPage cartItems={cartItems} />} />
          <Route path="api/v1/orderings" element={<OrdersManagementPage cartItems={cartItems}/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;


export { apiUrl };
