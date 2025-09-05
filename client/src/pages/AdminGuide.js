import React from "react";
import SkyBackground from "../components/SkyBackground";

export default function AdminGuide() {
  return (
    <SkyBackground>
      <div className="container mx-auto py-12 min-h-[60vh] flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-6 text-white drop-shadow">Admin Operation Guide</h2>
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 w-full max-w-2xl animate-fade-in space-y-6">
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-2">User Management</h3>
            <ol className="list-decimal ml-6">
              <li>Access the Admin Dashboard.</li>
              <li>View, add, or remove users and assign roles.</li>
            </ol>
          </div>
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-2">Report Generation</h3>
            <ol className="list-decimal ml-6">
              <li>Navigate to the Reports section in the Admin Dashboard.</li>
              <li>Select the report type and date range, then generate/download.</li>
            </ol>
          </div>
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-2">System Configuration</h3>
            <ol className="list-decimal ml-6">
              <li>Update system settings, permissions, and security protocols as needed.</li>
            </ol>
          </div>
        </div>
      </div>
    </SkyBackground>
  );
}
