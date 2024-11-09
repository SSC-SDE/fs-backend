"use client"; // Ensures this component runs on the client side in Next.js
import { useState, useEffect } from "react";
import styles from "./dashboard.module.css"; // Import the updated styles
import Link from "next/link";
import Header from "../header/headernav";

export default function Dashboard() {
  const [inputData, setInputData] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedOption4, setSelectedOption4] = useState("");
  const [selectedOption5, setSelectedOption5] = useState("");

  // State for options fetched from the backend
  const [venueOptions, setVenueOptions] = useState<string[]>([]);
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [styleOptions, setStyleOptions] = useState<string[]>([]);
  const [sizeOptions, setSizeOptions] = useState<string[]>([]);
  const [moodOptions, setMoodOptions] = useState<string[]>([]);

  // Fetch options from the backend on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/options/getOptions");
        if (res.ok) {
          const data = await res.json();
          setVenueOptions(data.venueOptions);
          setColorOptions(data.colorOptions);
          setStyleOptions(data.styleOptions);
          setSizeOptions(data.sizeOptions);
          setMoodOptions(data.moodOptions);
        } else {
          throw new Error("Failed to fetch options");
        }
      } catch (err: any) {
        setError("Error loading options: " + err.message);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    console.log("The Request Body", JSON.stringify({ inputData, selectedOptions: [selectedOption1, selectedOption2, selectedOption3, selectedOption4, selectedOption5] }));

    try {
      const res = await fetch("http://localhost:5000/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputData, selectedOptions: [selectedOption1, selectedOption2, selectedOption3, selectedOption4, selectedOption5] }), 
      });

      if (res.ok) {
        const result = await res.json();
        setResponse(result.response); 
      } else {
        throw new Error("Failed to fetch data from OpenAI.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h3 className={styles.title}>Essentials for Your Glow!</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="selectOption1">Choose a Venue:</label>
              <select
                id="selectOption1"
                className={styles.selectDropdown}
                value={selectedOption1}
                onChange={(e) => setSelectedOption1(e.target.value)}
              >
                <option value="">Select</option>
                {venueOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="selectOption2">Choose a Color:</label>
              <select
                id="selectOption2"
                className={styles.selectDropdown}
                value={selectedOption2}
                onChange={(e) => setSelectedOption2(e.target.value)}
              >
                <option value="">Select</option>
                {colorOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="selectOption3">Pick a Style:</label>
              <select
                id="selectOption3"
                className={styles.selectDropdown}
                value={selectedOption3}
                onChange={(e) => setSelectedOption3(e.target.value)}
              >
                <option value="">Select</option>
                {styleOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="selectOption4">Choose a Size:</label>
              <select
                id="selectOption4"
                className={styles.selectDropdown}
                value={selectedOption4}
                onChange={(e) => setSelectedOption4(e.target.value)}
              >
                <option value="">Select</option>
                {sizeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="selectOption5">Pick a Mood:</label>
              <select
                id="selectOption5"
                className={styles.selectDropdown}
                value={selectedOption5}
                onChange={(e) => setSelectedOption5(e.target.value)}
              >
                <option value="">Select</option>
                {moodOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="inputData">Your Secret Sauce...</label>
              <textarea
                id="inputData"
                className={styles.textarea}
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="What makes you... well you?"
                required
              />
            </div>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? "Cooking..." : "Cook"}
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </div>
        
        <div className={styles.resultContainer}>
          <h2>Your Recommendations</h2>
          {response && (
            <div>
              <h2>Response from OpenAI:</h2>
              <p>{response}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
