import React from "react";
import BarChartComponent from "@/components/analytics/barChart";
import Card from "@/components/analytics/card";
import Sidebar from "@/components/ui/sidebar";
// Ensure LineChartComponent is imported correctly
import LineChartComponent from "@/components/analytics/lineChart";

const Reports = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 space-y-8 w-full sm:ml-64">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
            <BarChartComponent />
          
        </div>
      </div>
    </div>
  );
};

export default Reports;
