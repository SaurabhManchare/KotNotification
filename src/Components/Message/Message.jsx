import React, { useState, useEffect } from "react";
import { database } from "../../services/firebase";
import { ref, onValue, remove, update } from "firebase/database";

import "./Message.css";
import Sidebar from "../Navbar/Sidebar";


const Message = () => {
  const [data, setData] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filters, setFilters] = useState({ restaurants: [], types: [] });
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const mobileNo = localStorage.getItem("mobileNo");

  useEffect(() => {
    const dataRef = ref(database, "ListMessage");
    onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      const dataArray = Object.keys(fetchedData || {}).map(
        (key) => ({ id: key, ...fetchedData[key] })
      );

      const filteredData = dataArray.filter(
        (message) => message.mobileno === mobileNo
      );
      setData(filteredData);
    });
  }, [mobileNo]);

  const truncateMessage = (message, maxLength) => {
    if (message.length <= maxLength) {
      return message;
    }
    return message.substring(0, maxLength) + "...";
  };

  const handleSelect = (message) => {
    setSelectedMessage(message);
    // Mark message as seen
    const messageRef = ref(database, `ListMessage/${message.id}`);
    update(messageRef, { seen: true }).catch((error) => {
      console.error("Error updating message: ", error);
    });
  };

  const handleDelete = () => {
    if (selectedMessage) {
      const messageRef = ref(database, `ListMessage/${selectedMessage.id}`);
      remove(messageRef)
        .then(() => {
          alert("Message deleted successfully");
          setSelectedMessage(null);
        })
        .catch((error) => {
          console.error("Error deleting message: ", error);
        });
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleFilterClick = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
  };

  // Function to extract unique restaurant names
  const extractRestaurantNames = () => {
    if (!data) return [];
    const restaurantNames = data.reduce((acc, curr) => {
      if (!acc.includes(curr.restaurant_name)) {
        acc.push(curr.restaurant_name);
      }
      return acc;
    }, []);
    return restaurantNames;
  };

  // Function to extract unique message types
  const messageTypes = () => {
    if (!data) return [];
    const types = data.reduce((acc, curr) => {
      if (!acc.includes(curr.type_of_message)) {
        acc.push(curr.type_of_message);
      }
      return acc;
    }, []);
    return types;
  };

  const filteredDataReverse = (data || [])
    .filter((value) => {
      if (
        filters.types.length > 0 &&
        !filters.types.includes(value.type_of_message)
      ) {
        return false;
      }
      if (
        filters.restaurants.length > 0 &&
        !filters.restaurants.includes(value.restaurant_name)
      ) {
        return false;
      }
      return true;
    })
    .reverse();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm p-3 mb-5 bg-body rounded sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <b className="logocolor">BillTraceAlert</b>
          </a>
          <div className="d-flex justify-content-between align-items-center">
            <i className="fa-sharp fa-solid fa-arrow-right-from-bracket me-3 Iconcolor"></i>
            <i
              className="fa-solid fa-filter Iconcolor"
              onClick={handleFilterClick}
            ></i>
          </div>
        </div>
      </nav>
  
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onFilterChange={handleFilterChange}
        restaurants={extractRestaurantNames()}
        messageTypes={messageTypes()}
      />

      {filteredDataReverse.length > 0 ? (
        filteredDataReverse.map((value) => (
          <div key={value.id} className="container-fluid mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="MessageBox">
                  <button
                    type="button"
                    className="btn btn-info datashowbutton w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleSelect(value)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-start">
                        <p className="mb-1 fw-bold">{value.restaurant_name}</p>
                        <p className="mb-0">
                          {truncateMessage(value.message, 25)}
                        </p>
                      </div>
                      <div className="text-end">
                        {!value.seen && (
                          <div className="seedot"></div>
                        )}
                        <p className="mb-0 mt-2">{value.date_time}</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {selectedMessage
                  ? selectedMessage.restaurant_name
                  : "Modal title"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedMessage && (
                <>
                  <p>
                    <strong>Restaurant Name:</strong>{" "}
                    {selectedMessage.restaurant_name}
                  </p>
                  <p>
                    <strong>Type of Message:</strong>{" "}
                    {selectedMessage.type_of_message}
                  </p>
                  <p>
                    <strong>Date Time:</strong> {selectedMessage.date_time}
                  </p>
                  <p>
                    <strong>Message:</strong> {selectedMessage.message}
                  </p>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      data-bs-dismiss="modal"
                      className="btn btn-success"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
