"use client";

import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const useAuthFetch = (url: string, options: AxiosRequestConfig = {}) => {
  const [data, setData] = useState<any>(null); // Optionally replace `any` with the expected response type.
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const refreshResponse = await axios.post('http://localhost:5000/api/auth/token', { refreshToken });
            const newAccessToken = refreshResponse.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);

            // Retry the failed request
            const retryResponse = await axios.get(url, {
              ...options,
              headers: {
                ...options.headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
            setData(retryResponse.data);
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

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};

export default useAuthFetch;
