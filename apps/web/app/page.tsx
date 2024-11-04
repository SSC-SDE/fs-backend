import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>

      {/* Header Section */}

      <header className={styles.header}>

        <Image src="/logo.png" alt="Brand Logo" width={100} height={50} />

      </header>



      {/* Hero Section */}

      <main className={styles.main}>

        <h1 className={styles.title}>Elevate Your Style with Our Expertise</h1>

        <p className={styles.tagline}>

          Discover personalized fashion consultations that make every look unforgettable.

        </p>

        <button className={styles.ctaButton}>Point of No Regrets</button>

      </main>

      {/* Features Section */}
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

      {/* Footer Section */}
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
