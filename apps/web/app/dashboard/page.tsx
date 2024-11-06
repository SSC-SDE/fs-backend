"use client"; // Ensures this component runs on the client side in Next.js
import { useState } from "react";
import styles from "./dashboard.module.css"; // Import the updated styles

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

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputData, selectedOptions: [selectedOption1, selectedOption2, selectedOption3, selectedOption4, selectedOption5] }), // Send dropdown and text area data
      });

      if (res.ok) {
        const result = await res.json();
        setResponse(result.response); // Set the response from OpenAI
      } else {
        throw new Error("Failed to fetch data from OpenAI.");
      }
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>The Crescendo</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h3 className={styles.title}>What's Cooking Good Looking</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Dropdowns */}
            <div className={styles.inputGroup}>
              <label htmlFor="selectOption1">Choose a Flavor:</label>
              <select
                id="selectOption1"
                className={styles.selectDropdown}
                value={selectedOption1}
                onChange={(e) => setSelectedOption1(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Spicy">Spicy</option>
                <option value="Sweet">Sweet</option>
                <option value="Sour">Sour</option>
                <option value="Salty">Salty</option>
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
                <option value="Red">Red</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
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
                <option value="Modern">Modern</option>
                <option value="Classic">Classic</option>
                <option value="Funky">Funky</option>
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
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
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
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Excited">Excited</option>
              </select>
            </div>
            
            {/* Textarea */}
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
        
        {/* Response Box */}
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
