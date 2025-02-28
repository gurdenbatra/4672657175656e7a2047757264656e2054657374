"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const OrgSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);

  // Fetch organizations on query change
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${query}+type:org`,
        );
        const data = await response.json();
        setResults(data.items || []);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API call to handle rate limits and fast typing
    const debounceTimeout = setTimeout(fetchData, 500);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  return (
    <>
    <label>Search GitHub organization</label>
      <input
        type="text"
        placeholder="Start typing here, example: mapbox"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      {loading && <Loader className="animate-spin mx-auto mt-2" />}

      {/* Auto-complete dropdown using basic framer opacity animation*/}
      <motion.div
        className="mt-2 border rounded-md bg-white shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: results.length > 0 ? 1 : 0 }}
      >
        {results.map((org) => (
          <div
            key={org.id}
            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
            onClick={() => {
              setSelectedOrg(org);
              setQuery("");
              setResults([]);
            }}
          >
            <img
              src={org.avatar_url}
              alt={org.login}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>{org.login}</span>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default OrgSearch;
