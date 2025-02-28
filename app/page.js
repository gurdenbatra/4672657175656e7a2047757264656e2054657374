"use client";
import { useState } from "react";

import OrgSearch from "@/components/OrgSearch";
import Repositories from "@/components/Repositories";

export default function Home() {
  const [selectedOrg, setSelectedOrg] = useState(null);
  return (
    <div className="w-96 mx-auto mt-10">
      <main className="">
        <OrgSearch onSelectOrg={setSelectedOrg} selectedOrg={selectedOrg} />
        {selectedOrg && (
          <Repositories
            selectedOrg={selectedOrg}
            onClearOrg={() => setSelectedOrg(null)}
          />
        )}
      </main>
      <footer className=""></footer>
    </div>
  );
}
