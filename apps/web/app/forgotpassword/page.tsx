"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../signin/signIn.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // Send forgot password request to the backend
      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Pass email in the request body
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message || "Please check your email for the reset link.");
      } else {
        setError("Unable to process the request. Please try again.");
      }
    } catch (error) {
      console.error("Error during forgot password request:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image src="/logo.png" alt="OnlyFashionSense" width={100} height={50} />
      </header>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Forgot Password</h2>
          <p>Enter your email address to reset your password</p>
          <form className={styles.form} onSubmit={handleSubmit}>
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
            {message && <p className={styles.success}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitButton}>
              Send Reset Link
            </button>
          </form>
          <p className={styles.alternateAction}>
            Remembered your password? <Link href="/signin">Sign In</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
