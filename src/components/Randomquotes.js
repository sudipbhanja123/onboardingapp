import React, { useEffect, useState } from "react";

const RandomQuotes = () => {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async (retries = 3) => {
      try {
        const response = await fetch(
          "https://api.api-ninjas.com/v1/quotes?category=inspirational",
          {
            headers: {
              "X-Api-Key": "uoVE1+qdLGjWc3oDpxpMGQ==9Z99ESxUqwgdEybd",
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        setQuote(data[0].quote);
        setError(null);
      } catch (error) {
        console.error("Fetching quote failed:", error.message);
        if (retries > 0) {
          setTimeout(() => fetchQuote(retries - 1), 1000);
        } else {
          setError("Fetching quote failed");
        }
      }
    };
    fetchQuote();
    const interval = setInterval(() => fetchQuote(), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-200 p-4 rounded-lg mt-4">
      {error ? (
        <p className="text-center text-sm ">{error}</p>
      ) : (
        <p className="text-center text-sm italic">{quote}</p>
      )}
    </div>
  );
};

export default RandomQuotes;
