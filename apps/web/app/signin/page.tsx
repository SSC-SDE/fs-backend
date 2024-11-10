"use client"; // Ensures this component runs on the client side in Next.js
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "./signIn.module.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError("");

    try {
      // Send login request to the backend without any tokens
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Allows cookies, including the refresh token, to be sent
        body: JSON.stringify({ email, password }), // Pass email and password in the body
      });

      if (response.ok) {
        
        const result = await response.json();
        setError(result.message);
        if (result.accessToken) {  // Assuming the backend returns an access token in the response
          // Store the access token in local storage
          localStorage.setItem('accessToken', result.accessToken);

          localStorage.setItem('refreshToken', result.refreshToken);
    
          localStorage.setItem('userId', result.userId);

          console.log("Login successful:", result);
          
          // Redirect to another page after login, e.g., dashboard
          router.push("/dashboard");  
        } else {
          setError("Login failed. Please try again.");
        }
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
          <h2 className={styles.title}>Welcome Back</h2>
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
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitButton}>
              Sign In
            </button>
          </form>
          <p className={styles.alternateAction}>
  Forgot your password? <Link href="/forgotpassword">Reset it here</Link>
</p>
          <p className={styles.alternateAction}>
            Don't have an account? <Link href="/register">Register here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
