"use client"; // Ensures this component runs on the client side in Next.js
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "../dashboard/dashboard.module.css";

export default function Profile() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();

  // Fetch the user's current profile information on page load
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for authentication
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
      // Send updated profile data to the backend
      const response = await fetch("http://localhost:5000/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Allow cookies to be sent
        body: JSON.stringify({ name, email, password }), // Send updated fields
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
      <header className={styles.header}>
        <h1>The Crescendo</h1>
        <nav className={styles.navMenu}>
        <Link href="/dashboard" className={styles.navItem}>Home</Link>
          <Link href="/profile" className={styles.navItem}>Profile</Link>
          <Link href="/settings" className={styles.navItem}>Settings</Link>
          <a href="#" className={styles.navItem}>Logout</a>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Update Profile</h2>
          {error && <p className={styles.error}>{error}</p>}
          {successMessage && <p className={styles.success}>{successMessage}</p>}
          <form className={styles.form} onSubmit={handleUpdateProfile}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
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
                placeholder="Enter your email"
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
