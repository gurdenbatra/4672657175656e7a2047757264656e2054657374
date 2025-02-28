"use client";

import { useState, useEffect } from "react";
import { Loader } from "lucide-react";

// set max page limit for pagination
const perPage = 10;

const Repositories = ({ selectedOrg }) => {
  const [repos, setRepos] = useState([]);
  const [repoLoading, setRepoLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  // Fetch repositories for the selected organization
  useEffect(() => {
    if (!selectedOrg) return;

    const fetchRepos = async () => {
      setRepoLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/orgs/${selectedOrg.login}/repos?per_page=${perPage}&page=${page}`,
        );
        const data = await response.json();
        setRepos(data || []);

        // Fetch total repo count
        const orgResponse = await fetch(
          `https://api.github.com/orgs/${selectedOrg.login}`,
        );
        const orgData = await orgResponse.json();
        setTotalPages(Math.ceil(orgData.public_repos / perPage));
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setRepoLoading(false);
      }
    };

    fetchRepos();
  }, [selectedOrg, page]);

  // Repository filters
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [repoNameFilter, setRepoNameFilter] = useState("");
  const [minIssues, setMinIssues] = useState("");
  const [maxIssues, setMaxIssues] = useState("");

  // Validation state
  const [isValid, setIsValid] = useState(true);

  // Apply filters
  useEffect(() => {
    let filtered = repos;

    if (repoNameFilter) {
      filtered = filtered.filter((repo) =>
        repo.name.toLowerCase().includes(repoNameFilter.toLowerCase()),
      );
    }

    if (
      minIssues !== "" &&
      maxIssues !== "" &&
      Number(minIssues) > Number(maxIssues)
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
      if (minIssues !== "") {
        filtered = filtered.filter(
          (repo) => repo.open_issues_count >= Number(minIssues),
        );
      }
      if (maxIssues !== "") {
        filtered = filtered.filter(
          (repo) => repo.open_issues_count <= Number(maxIssues),
        );
      }
    }

    setFilteredRepos(filtered);
  }, [repos, repoNameFilter, minIssues, maxIssues]);

  return (
    <>
      {repoLoading && <Loader className="animate-spin mx-auto mt-2" />}

      {/* Filters */}
      {selectedOrg && (
        <div className="mt-5 p-4 border rounded-md bg-gray-50">
          <h3 className="text-md font-semibold">Filters:</h3>
          <input
            type="text"
            placeholder="Filter by repo name..."
            value={repoNameFilter}
            onChange={(e) => setRepoNameFilter(e.target.value)}
            className="w-full p-2 border rounded-md mt-2"
          />
          <div className="flex space-x-2 mt-2">
            <input
              type="number"
              placeholder="Min open issues"
              value={minIssues}
              onChange={(e) => setMinIssues(e.target.value)}
              className="w-1/2 p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Max open issues"
              value={maxIssues}
              onChange={(e) => setMaxIssues(e.target.value)}
              className="w-1/2 p-2 border rounded-md"
            />
          </div>
          {!isValid && (
            <p className="text-red-500 text-sm mt-1">Min must be ≤ Max</p>
          )}

          {/* Clear Filters Button */}
          <button
            onClick={() => {
              setRepoNameFilter("");
              setMinIssues("");
              setMaxIssues("");
            }}
            className="mt-3 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Clear Filters
          </button>
        </div>
      )}
      {/* Repositories Table */}
      {selectedOrg && (
        <div className="mt-5">
          <h3 className="text-md font-semibold">Repositories:</h3>
          {filteredRepos.length > 0 ? (
            <>
              <table className="w-full mt-2 border text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Name</th>
                    <th className="p-2">🛠 Open Issues</th>
                    <th className="p-2">⭐ Stars</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRepos.map((repo) => (
                    <tr key={repo.id} className="border-t">
                      <td className="p-2">{repo.name}</td>
                      <td className="p-2">{repo.open_issues_count}</td>
                      <td className="p-2">{repo.stargazers_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded-md ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <span className="px-2 w-full">
              No results found, please check filters.
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Repositories;
