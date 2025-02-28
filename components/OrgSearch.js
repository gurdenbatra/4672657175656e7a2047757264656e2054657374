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

    // Clear selected organization
    const clearOrganization = () => {
      setSelectedOrg(null);
    };

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

      {/* Selected Organization */}
      {selectedOrg && (
        <div className="mt-5 p-4 border rounded-md bg-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center">
              <img
                src={selectedOrg.avatar_url}
                alt={selectedOrg.login}
                className="w-8 h-8 rounded-full mr-2"
              />
              {selectedOrg.login}
            </h2>
            <button onClick={clearOrganization} className="text-red-500 hover:cursor-pointer">
              Clear
            </button>
          </div>
          <a
            href={selectedOrg.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm"
          >
            View on GitHub
          </a>
        </div>
      )}
    </>
  );
};

export default OrgSearch;
