"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./register.module.css";
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    // Logging form data for now
    console.log(formData);

    // You can now make a POST request to your backend
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User registered:", result);
        router.push('/signin');
        // You can redirect or perform any other action after successful registration
      } else {
        console.log("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image src="/logo.png" alt="Brand Logo" width={100} height={50} />
      </header>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Create Account</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Register
            </button>
          </form>
          <p className={styles.alternateAction}>
            Already have an account?{" "}
            <Link href="/signin">Sign in here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
