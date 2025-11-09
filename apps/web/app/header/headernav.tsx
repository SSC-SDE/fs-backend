"use client"; // Ensures this component runs on the client side in Next.js
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "./header.module.css";
import Link from "next/link"; // Import Link for navigation

export default function Header() {
  const router = useRouter();

  // Logout function with confirmation
  const handleLogout = () => {
    // Confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");

      // Redirect to the home page
      router.push("/"); // Redirect to home
    }
  };

  return (

    <header className={styles.header}>

      <h1>The Crescendo</h1>

      <nav className={styles.navMenu}>

        <Link href="/dashboard" className={styles.navItem}>Home</Link>
        <Link href="/history" className={styles.navItem}>History</Link>
        <Link href="/profile" className={styles.navItem}>Profile</Link>
        <Link href="/settings" className={styles.navItem}>Settings</Link>

        <button onClick={handleLogout} className={styles.logoutButton}>

SignOut

</button>

      </nav>

    </header>

  );

}