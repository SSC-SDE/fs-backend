"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import styles from "../dashboard/dashboard.module.css"; 
import Header from '../header/headernav';

interface Query {
  _id: string;
  userId: string;
  createdAt: string;
  selectedOptions: string;
  generatedResponse: string;
  // Add other fields based on your Query schema
}

const UserQueries: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // Track the expanded state

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Access token
        const response = await axios.get('http://localhost:5000/api/users/user-queries', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQueries(response.data.queries);
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken'); // Get refresh token
          if (refreshToken) {
            try {
              const refreshResponse = await axios.post('http://localhost:5000/api/auth/token', { refreshToken });
              const newAccessToken = refreshResponse.data.accessToken;
              localStorage.setItem('token', newAccessToken);

              const retryResponse = await axios.get('http://localhost:5000/api/users/user-queries', {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });

              setQueries(retryResponse.data.queries);
            } catch (refreshError) {
              setError('Failed to refresh token');
            }
          } else {
            setError('No refresh token available');
          }
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  const toggleResponse = (index: number) => {
    // Toggle the expanded state of the clicked query
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
                          {/* Here you can use a button or clickable area to toggle the response */}
                          <button className={styles.submitButton} onClick={() => toggleResponse(index)}>
                            {expandedIndex === index ? 'Hide Response' : 'Expand Response'}
                          </button>
                        </td>
                      </tr>

                      {/* Show the response only if the query is expanded */}
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
