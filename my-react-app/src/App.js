import React, { useState, useEffect } from "react";
import "./App.css";

const initialFormData = {
  name: "",
  employeeId: "",
  city: "Select City",
  gender: {
    male: false,
    female: false,
  },
};

const App = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [editable, setEditable] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedDataFromStorage =
      JSON.parse(localStorage.getItem("savedData")) || [];
    setSavedData(savedDataFromStorage);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = "Please enter your Employee ID.";
    }

    if (formData.city === "Select City") {
      newErrors.city = "Please select your city.";
    }

    if (!formData.gender.male && !formData.gender.female) {
      newErrors.gender = "Please select your gender.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    setErrors({
      ...errors,
      [field]: "",
    });
  };

  const handleCheckboxChange = (field) => {
    setFormData({
      ...formData,
      gender: {
        ...formData.gender,
        [field]: !formData.gender[field],
      },
    });
  };
  


  const handleSave = () => {
    if (validateForm()) {
      let updatedData;
  
      if (editable) {
        updatedData = savedData.map((data) =>
          data.female === formData.fem ? formData : data
        );
        setSavedData(updatedData);
      } else {
        updatedData = [...savedData, formData];
        setSavedData(updatedData);
      }
      setFormData(initialFormData);
  
      setSavedData((prevSavedData) => {
        localStorage.setItem("savedData", JSON.stringify(prevSavedData));
        return prevSavedData;
      });
  
      setEditable(false);
    }
  };
  
  
  

  const handleEdit = (name) => {
    const dataToEdit = savedData.find((data) => data.name === name);
    setFormData({
      ...initialFormData,
      ...dataToEdit,
      name: dataToEdit.name,  
      gender: {
        ...initialFormData.gender,
        ...dataToEdit.gender,
      },
    });
    setEditable(true);
  };
  
  

  return (
    <div className="app">
      <h1>Customer Information Form</h1>
      <form>
        <div>
          <label htmlFor="name">
            Name<span className="mandatory">*</span>:
            {errors.name && <span className="error">{errors.name}</span>}
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="employeeId">
            Employee ID<span className="mandatory">*</span>:
            {errors.employeeId && (
              <span className="error">{errors.employeeId}</span>
            )}
          </label>
          <input
            type="number"
            id="employeeId"
            placeholder="Enter Employee ID"
            value={formData.employeeId}
            onChange={(e) => handleInputChange("employeeId", e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="city">
            City<span className="mandatory">*</span>:
            {errors.city && <span className="error">{errors.city}</span>}
          </label>
          <select
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            required
          >
            <option disabled>Select City</option>
            <option value="New York">New York</option>
            <option value="London">London</option>
            <option value="Tokyo">Tokyo</option>
          </select>
        </div>

        <div>
          <label>
            Gender<span className="mandatory">*</span>:
            {errors.gender && <span className="error">{errors.gender}</span>}
          </label>
          <div className="checkbox-container">
            <div>
              <input
                type="checkbox"
                id="male"
                checked={formData.gender.male}
                onChange={() => handleCheckboxChange("male")}
                required
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="female"
                checked={formData.gender.female}
                onChange={() => handleCheckboxChange("female")}
                required
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>

        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>

      <div className="display-area">
        <h2>Saved Data</h2>
        <ul>
          {savedData.map((data) => (
            <li key={data.name} onClick={() => handleEdit(data.name)}>
              <strong>Name:</strong> {data.name}, <strong>Employee ID:</strong>{" "}
              {data.employeeId}, <strong>City:</strong> {data.city},{" "}
              <strong>Gender:</strong> {data.gender.male ? "Male" : ""}{" "}
              {data.gender.female ? "Female" : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;


