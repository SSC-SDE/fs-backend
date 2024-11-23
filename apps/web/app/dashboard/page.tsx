"use client"; // Ensures this component runs on the client side in Next.js
import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import Header from "../header/headernav";
import Accordion from "../components/accordion";


interface Recommendation {
  recommendationNumber: number;
  outfitDetails: {
    title: string;
    description: string;
    items: { item: string; details: string }[];
  };
}

interface response {
  outfitRecommendations: Recommendation[];
}



export default function Dashboard() {
  const [inputData, setInputData] = useState("");
  const [response, setResponse] = useState<response>({
    outfitRecommendations: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedOption4, setSelectedOption4] = useState("");
  const [selectedOption5, setSelectedOption5] = useState("");
  const [selectedOption6, setSelectedOption6] = useState("");
  const [otherMood, setOtherMood] = useState("");
  const [showTextAreaMood, setShowTextAreaMood] = useState(false);

  const [venueOptions, setVenueOptions] = useState<string[]>([]);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [styleOptions, setStyleOptions] = useState<string[]>([]);
  const [moodOptions, setMoodOptions] = useState<string[]>([]);
  const [genderOrientation, setGenderOrientation] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
setShowResult(true);
  },[response])

  // Fetch options on component mount
  useEffect(() => {
    setShowResult(false);
    const fetchOptions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/options/getOptions");
        if (!res.ok) throw new Error("Failed to fetch options");
        const data = await res.json();
        setVenueOptions(data.venueOptions);
        setTimeOptions(data.timeOptions);
        setStyleOptions(data.styleOptions);
        setMoodOptions(data.moodOptions);
        setGenderOrientation(data.genderOptions);
      } catch (err: any) {
        setError("Error loading options: " + err.message);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    setShowTextAreaMood(selectedOption5 === "other");
  }, [selectedOption5]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse({ outfitRecommendations: [] });

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          inputData,
          selectedOptions: [
            selectedOption1,
            selectedOption2,
            selectedOption3,
            selectedOption4,
            selectedOption5,
            selectedOption6,
          ],
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch data from OpenAI");

      const result = await res.json();
      console.log("result.response", JSON.parse(result.response));
      setResponse(JSON.parse(result.response));
      
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
          <h3 className={styles.title}>Unlock Your Radiance!</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Dropdown for Venue */}
            <div className={styles.inputGroup}>
              <label htmlFor="selectOption1">Choose a Venue:</label>
              <select
                id="selectOption1"
                className={styles.selectDropdown}
                value={selectedOption1}
                onChange={(e) => setSelectedOption1(e.target.value)}
              >
                <option value="">Select</option>
                {venueOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="selectOption2">Choose Attending Part of the Day:</label>
              <select
                id="selectOption2"
                className={styles.selectDropdown}
                value={selectedOption2}
                onChange={(e) => setSelectedOption2(e.target.value)}
              >
                <option value="">Select</option>
                {timeOptions.map(option => (
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
              <label htmlFor="selectOption5">Pick/Explain Your Mood:</label>
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
              {showTextAreaMood && (
                <div className={styles.inputGroup}>
                  <textarea
                    id="inputData"
                    className={styles.textarea}
                    value={otherMood}
                    onChange={(e) => setOtherMood(e.target.value)}
                    placeholder="Describe your desired mood or emotion for the event"
                    maxLength={60}
                  />
                </div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="selectOption6">Pick Gender Orientation</label>
              <select
                id="selectOption6"
                className={styles.selectDropdown}
                value={selectedOption6}
                onChange={(e) => setSelectedOption6(e.target.value)}
              >
                <option value="">Select</option>
                {genderOrientation.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="inputData">Desired Outcome?</label>
              <textarea
                id="inputData"
                className={styles.textarea}
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Explain your position in the setting"
                maxLength={60}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="inputData">Spill the vibe! or What's your energy like?</label>
              <textarea
                id="inputData"
                className={styles.textarea}
                value={selectedOption4}
                onChange={(e) => setSelectedOption4(e.target.value)}
                placeholder="Explain your position in the setting"
                maxLength={50}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? "Cooking..." : "Cook"}
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </div>
        { showResult &&
        <div className={styles.resultContainer}>
          <h2>Your Recommendations</h2>
            <Accordion outfitRecommendations={response.outfitRecommendations}/>
        </div>
        }
    </main>
    </div>
  );
}