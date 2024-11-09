"use client"; // Ensures this component runs on the client side in Next.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "../dashboard/dashboard.module.css"; // Import styles
import Header from "../header/headernav";

export default function Profile() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();

  // Fetch the user's current profile information on page load
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/user/${localStorage.getItem('userId')}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          setName(result.name);
          setEmail(result.email);
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

  const handleUpdateProfile = async (e: any) => {
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
        body: JSON.stringify({ newName, newEmail, password }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage("Profile updated successfully!");
        setError("");
      } else {
        const result = await response.json();
        setError(result.message || "Failed to update profile. Please try again.");
      }
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
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
          </div>

          <h2 className={styles.title}>Update Profile</h2>
          <form className={styles.form} onSubmit={handleUpdateProfile}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter your new name"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
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
            <button type="submit" className={styles.submitButton}>
              Update Profile
            </button>
          </form>
          <p className={styles.alternateAction}>
            Want to go back to Home? <Link href="/dashboard">go here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}