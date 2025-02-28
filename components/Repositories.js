"use client";

import { useState, useEffect } from "react";

// set max page limit for pagination
const perPage = 10;

const Repositories = ({ selectedOrg }) => {
  const [repos, setRepos] = useState([]);
  const [repoLoading, setRepoLoading] = useState(false);
  const [totalRepos, setTotalRepos] = useState(0);
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
        setTotalRepos(orgData.public_repos || 0);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setRepoLoading(false);
      }
    };

    fetchRepos();
  }, [selectedOrg, page]);

  return (
    <>
      {/* Repositories Table */}
      {selectedOrg && (
        <div className="mt-5">
          <h3 className="text-md font-semibold">Repositories:</h3>
          <table className="w-full mt-2 border rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Name</th>
                <th className="p-2">Open Issues</th>
                <th className="p-2">Stars</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((repo) => (
                <tr key={repo.id} className="border-t">
                  <td className="p-2">{repo.name}</td>
                  <td className="p-2">{repo.open_issues_count}</td>
                  <td className="p-2">{repo.stargazers_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Repositories;
