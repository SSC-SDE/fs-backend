"use client"; // Ensures this component runs on the client side in Next.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "../dashboard/dashboard.module.css"; // Import styles
import Header from "../header/headernav";

export default function Profile() {
  const [currentName, setCurrentName] = useState<string>("");
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [privilege, setPrivilege] = useState<string>("guest");
  const [trialTokens,setTrialTokens] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showUpdateSection, setShowUpdateSection] = useState<boolean>(false); // State for toggle switch
  const router = useRouter();

  // Fetch the user's current profile information on page load
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/user/${localStorage.getItem('userId')}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
          },
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result, "result");
          setCurrentName(result.name);
          setCurrentEmail(result.email);
          setPrivilege(result.role);
          setTrialTokens(result.tokens.normal);
        } else {
          setError("Failed to fetch user profile. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("An error occurred. Please try again.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (e:any) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/${localStorage.getItem('userId')}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password, oldPassword }),
      });
  
      // Log response status and text for debugging
  
      if (!response.ok) {
        const text = await response.text(); // Read as plain text
        const messageToShow = JSON.parse(JSON.stringify(text));
        console.error("Error response text:", messageToShow.message);
        setError(messageToShow || "Failed to update profile. Please try again.");
        return;
      }
      const result = await response.json(); // Parse JSON if response is OK
    
      setSuccessMessage("Profile updated successfully!");
      setError("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Current Profile</h2>
          {error && <p className={styles.error}>{error}</p>}
          {successMessage && <p className={styles.success}>{successMessage}</p>}
          <div className={styles.profileInfo}>
            <p><strong>Name:</strong> {currentName}</p>
            <p><strong>Email:</strong> {currentEmail}</p>
            <p><strong>Priviledge:</strong> {privilege}</p>
            <p><strong>TrialMode:</strong> Enabled <strong>TrialKeysAvaialble:</strong> {trialTokens}</p>
          </div>

          {/* Fancy Toggle Switch for Update Profile Section */}
          <div className={styles.toggleContainer}>
            <label htmlFor="toggle-update" className={styles.toggleLabel}>
              Want to update your Profile?
              <input
                type="checkbox"
                id="toggle-update"
                checked={showUpdateSection}
                onChange={() => setShowUpdateSection(!showUpdateSection)}
                className={styles.toggleInput}
              />
              <span className={styles.toggleSwitch}></span>
            </label>
          </div>

          {showUpdateSection && (
            <div>
              <h2 className={styles.title}>Update Profile</h2>
              <form className={styles.form} onSubmit={handleUpdateProfile}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type=" text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your new name"
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your new email"
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new password"
                  />
                </div>
                {(password.length > 0 || email.length > 0 || name.length > 0) && (
                  <div className={styles.inputGroup}>
                    <label htmlFor="current-password">Verify Current Password</label>
                    <input
                      type="password"
                      id="current-password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter your current password"
                    />
                  </div>
                )}
                <button type="submit" className={styles.submitButton}>
                  Update Profile
                </button>
              </form>
            </div>
          )}
          <p className={styles.alternateAction}>
            Want to go back to Home? <Link href="/dashboard">go here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}