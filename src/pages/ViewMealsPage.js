import React, { useState, useEffect } from 'react';
import './Ordering.css';

const ViewMealsPage = ({ setCartItems }) => {
  const [meals, setMeals] = useState([]);
  const [mealQuantities, setMealQuantities] = useState({});

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch('http://localhost:8080/client/api/v1/meals');
      if (response.ok) {
        const data = await response.json();
        setMeals(data);
      } else {
        throw new Error('Error fetching meals');
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const handleAddToCart = (mealId) => {
    const quantity = mealQuantities[mealId] || 1;
    const meal = meals.find((meal) => meal.id === mealId);
    const cartItem = {
      id: meal.id,
      title: meal.title,
      quantity: quantity,
    };

    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    setMealQuantities((prevQuantities) => ({
      ...prevQuantities,
      [mealId]: undefined,
    }));
  };

  const handleQuantityChange = (event, mealId) => {
    const quantity = parseInt(event.target.value);
    setMealQuantities((prevQuantities) => ({
      ...prevQuantities,
      [mealId]: quantity,
    }));
  };

  return (
    <div>
      <h2>Meals</h2>
      {meals.map((meal) => (
        <div key={meal.id}>
          <h3>{meal.title}</h3>
          <p>{meal.description}</p>
          <p>Quantity: {meal.quantity}</p>
          <div>
            <input
              type="number"
              value={mealQuantities[meal.id] || ''}
              onChange={(event) => handleQuantityChange(event, meal.id)}
              className="small-input"
            />
            <button
              className="small-button"
              onClick={() => handleAddToCart(meal.id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewMealsPage;
