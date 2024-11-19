"use client";

import React from 'react';
import styles from '../dashboard/dashboard.module.css';
import Header from '../header/headernav';
import ReactMarkdown from 'react-markdown';
import useAuthFetch from '../customHooks/useAuthFetch';

interface Query {
  _id: string;
  userId: string;
  createdAt: string;
  selectedOptions: string;
  generatedResponse: string;
}

const UserQueries: React.FC = () => {
  const { data, loading, error, refetch } = useAuthFetch('http://localhost:5000/api/users/user-queries');
  const queries = data?.queries || [];
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const toggleResponse = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Your Queries</h1>
          {queries.length === 0 ? (
            <p className={styles.noQueries}>No queries found.</p>
          ) : (
            <div className={styles.queryList}>
              {queries.map((query: Query, index: number) => (
                <div key={query._id} className={styles.queryItem}>
                  <table className={styles.queryTable}>
                    <tbody>
                      <tr>
                        <td className={styles.queryLeft}>
                          <h2>Query ID: {index + 1}</h2>
                        </td>
                        <td className={styles.queryRight}>
                          <button className={styles.submitButton} onClick={() => toggleResponse(index)}>
                            {expandedIndex === index ? 'Hide Response' : 'Expand Response'}
                          </button>
                        </td>
                      </tr>
                      {expandedIndex === index && (
                        <tr>
                          <td colSpan={2} className={styles.queryResponse}>
                            <ReactMarkdown>{query.generatedResponse}</ReactMarkdown>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserQueries;
