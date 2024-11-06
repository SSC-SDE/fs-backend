"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const handleCtaClick = async () => {
    try {
      const isAuthenticated = await checkAuthentication();
      
      if (isAuthenticated) {
        router.push('/signin');
      } else {
        router.push('/register');
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      router.push('/register');
    }
  };

  const checkAuthentication = async () => {
    // Mock authentication check logic, replace with real auth check if available
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(false); // Simulating unauthenticated user for demo purposes
      }, 1000);
    });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image src="/logo.png" alt="Brand Logo" width={100} height={50} />
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Elevate Your Style with Our Expertise</h1>
        <h1 className={styles.title}>and also a little bit of AI</h1>
        <p className={styles.tagline}>
          Discover personalized fashion consultations that make every look unforgettable.
        </p>
        <button className={styles.ctaButton} onClick={handleCtaClick}>
          Point of No Regrets
        </button>
      </main>
      <section className={styles.features}>
        <div className={styles.featureItem}>
          <Image src="/style-icon.svg" alt="Style Icon" width={50} height={50} />
          <h3>Personalized Styling</h3>
          <p>Unique fashion tips tailored just for you.</p>
        </div>
        <div className={styles.featureItem}>
          <Image src="/trend-icon.svg" alt="Trend Icon" width={50} height={50} />
          <h3>Trend Insights</h3>
          <p>Stay ahead with the latest in fashion trends.</p>
        </div>
        <div className={styles.featureItem}>
          <Image src="/accessory-icon.svg" alt="Accessory Icon" width={50} height={50} />
          <h3>Accessory Advice</h3>
          <p>Complete your look with the perfect accessories.</p>
        </div>
      </section>
      <footer className={styles.footer}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Image src="/instagram-icon.svg" alt="Instagram" width={24} height={24} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <Image src="/facebook-icon.svg" alt="Facebook" width={24} height={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Image src="/twitter-icon.svg" alt="Twitter" width={24} height={24} />
        </a>
      </footer>
    </div>
  );
}
