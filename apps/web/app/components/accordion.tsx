import React, { useState } from "react";
import styles from "../dashboard/dashboard.module.css"; // Assuming you have styles for your accordion

interface Recommendation {
  recommendationNumber: number;
  outfitDetails: {
    title: string;
    description: string;
    items: { item: string; details: string }[];
  };
}

interface Props {
  outfitRecommendations: Recommendation[];
}

const Accordion: React.FC<Props> = ({ outfitRecommendations }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={styles.accordionContainer}>
      {outfitRecommendations.map((recommendation, index) => (
        <div className={styles.accordion} key={index}>
          {/* Accordion Header */}
          <button
            className={styles.accordionHeader}
            onClick={() => toggleAccordion(index)}
          >
            Recommendation {recommendation.recommendationNumber}:{" "}
            {recommendation.outfitDetails.title}
          </button>

          {/* Accordion Content */}
          {activeIndex === index && (
            <div className={styles.accordionContent}>
              <p>{recommendation.outfitDetails.description}</p>
              <ul>
                {recommendation.outfitDetails.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <strong>{item.item}:</strong> {item.details}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
