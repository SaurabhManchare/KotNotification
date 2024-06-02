import React, { useState } from 'react';

const Sidebar = ({ isOpen, onClose, onFilterChange, restaurants, messageTypes }) => {
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleRestaurantChange = (e) => {
    const { value, checked } = e.target;
    setSelectedRestaurants(prev =>
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTypes(prev =>
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  const handleDone = () => {
    onFilterChange({ restaurants: selectedRestaurants, types: selectedTypes });
    onClose();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      <br />
      <div className="sidebarcontent">
        <div className="checkbox-section">
          <h5>Restaurants</h5>
          {restaurants.map((restaurant, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                value={restaurant}
                id={`restaurant_${index}`}
                onChange={handleRestaurantChange}
              />
              <label className="form-check-label" htmlFor={`restaurant_${index}`}>
                {restaurant}
              </label>
            </div>
          ))}
        </div>

        <div className="checkbox-section">
          <h5>Type of message</h5>
          {messageTypes.map((type, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                value={type}
                id={`message_${index}`}
                onChange={handleTypeChange}
              />
              <label className="form-check-label" htmlFor={`message_${index}`}>
                {type}
              </label>
            </div>
          ))}
        </div>

        <div className="done-button">
          <button type="button" className="btn btn-primary" onClick={handleDone}>DONE</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



