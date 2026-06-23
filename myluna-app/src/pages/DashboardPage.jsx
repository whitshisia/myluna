import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-blush flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="calendar" element={<div>Calendar View</div>} />
          <Route path="symptoms" element={<div>Symptom Logger</div>} />
          <Route path="insights" element={<div>Health Insights</div>} />
          <Route path="settings" element={<div>Settings</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}