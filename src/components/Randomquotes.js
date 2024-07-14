// import React, { useEffect, useState } from "react";

// const RandomQuotes = () => {
//   const [quote, setQuote] = useState("");

//   useEffect(() => {
//     const fetchQuote = async () => {
//       const response = await fetch("https://api.quotable.io/random");
//       const data = await response.json();
//       setQuote(data.content);
//     };
//     fetchQuote();
//     const interval = setInterval(fetchQuote, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-gray-200 p-4 rounded-lg mt-4">
//       <p className="text-center text-sm italic">{quote}</p>
//     </div>
//   );
// };

// export default RandomQuotes;

import React, { useEffect, useState } from "react";

const RandomQuotes = () => {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api-ninjas.com/api/quotes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuote(data.content);
      } catch (error) {
        setError("Network response was not ok");
      }
    };
    fetchQuote();
    const interval = setInterval(fetchQuote, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-200 p-4 rounded-lg mt-4">
      {error ? (
        <p className="text-center text-sm">{error}</p>
      ) : (
        <p className="text-center text-sm italic">{quote}</p>
      )}
    </div>
  );
};

export default RandomQuotes;
