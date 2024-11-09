"use client"; // Ensures this component runs on the client side in Next.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "../dashboard/dashboard.module.css";
import Link from "next/link"; // Import Link for navigation

export default function Settings() {
  const [theme, setTheme] = useState<string>("light"); // Default theme is light
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // Effect hook to fetch the current theme on page load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"; // Get the theme from localStorage
    setTheme(savedTheme);
    document.body.className = savedTheme; // Apply the theme to the body
  }, []);

  // Handle theme change
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save the theme in localStorage
    document.body.className = newTheme; // Apply the new theme to the body
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
          <h2 className={styles.title}>Settings</h2>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.themeSelector}>
            <h3>Theme Settings</h3>
            <p>Current theme: {theme}</p>
            <button
              className={styles.themeButton}
              onClick={() => handleThemeChange("light")}
            >
              Light Mode
            </button>
            <button
              className={styles.themeButton}
              onClick={() => handleThemeChange("dark")}
            >
              Dark Mode
            </button>
          </div>
          <p className={styles.alternateAction}>
          Want to go back to Home? <Link href="/dashboard">go here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
