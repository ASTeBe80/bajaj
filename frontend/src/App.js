import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const backendURL = "https://bajaj-vt5v.onrender.com/bfhl"; // Replace with your actual backend URL

  const handleInputChange = (e) => setInputData(e.target.value);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      const res = await axios.post(backendURL, parsedData);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or API error.");
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Bajaj Finserv Health Dev Challenge</h1>
      <textarea
        className="border p-2 w-full"
        value={inputData}
        onChange={handleInputChange}
        placeholder='Enter JSON data (e.g., { "data": ["A", "1", "z"] })'
        rows="4"
      />
      <br />
      <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleSubmit}>Submit</button>
      
      {response && (
        <div className="mt-4">
          <label>Select Options: </label>
          <select multiple className="border p-2" onChange={handleOptionChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          <h3 className="font-bold mt-4">Response:</h3>
          <pre className="bg-gray-100 p-2">
            {JSON.stringify(
              Object.fromEntries(
                Object.entries(response).filter(([key]) => selectedOptions.includes(key))
              ),
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;
