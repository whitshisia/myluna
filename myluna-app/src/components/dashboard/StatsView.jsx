import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Card from '../shared/Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatsView({ cycleData }) {
  const cycleLengths = cycleData?.periodHistory?.map((p, i, arr) => {
    if (i === 0) return null;
    const prev = new Date(arr[i-1].startDate);
    const curr = new Date(p.startDate);
    return Math.round((curr - prev) / (1000 * 60 * 60 * 24));
  }).filter(Boolean) || [];

  const avgCycleLength = cycleLengths.length > 0 
    ? Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length)
    : 28;

  // Chart data for cycle lengths
  const cycleLengthData = {
    labels: cycleLengths.map((_, i) => `Cycle ${i + 1}`),
    datasets: [
      {
        label: 'Cycle Length (days)',
        data: cycleLengths,
        backgroundColor: 'rgba(212, 83, 126, 0.6)',
        borderColor: '#D4537E',
        borderWidth: 2,
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cycle Length History'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 40,
        ticks: {
          stepSize: 5
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-2xl font-serif text-rose font-bold">
            {cycleData?.periodHistory?.length || 0}
          </div>
          <div className="text-sm text-muted">Cycles Tracked</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-serif text-rose font-bold">
            {avgCycleLength}
          </div>
          <div className="text-sm text-muted">Avg. Cycle Length</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-serif text-rose font-bold">
            {cycleLengths.length > 0 ? Math.max(...cycleLengths) : '-'}
          </div>
          <div className="text-sm text-muted">Longest Cycle</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-serif text-rose font-bold">
            {cycleLengths.length > 0 ? Math.min(...cycleLengths) : '-'}
          </div>
          <div className="text-sm text-muted">Shortest Cycle</div>
        </Card>
      </div>

      {/* Chart */}
      {cycleLengths.length > 0 && (
        <Card>
          <div className="h-64">
            <Bar data={cycleLengthData} options={chartOptions} />
          </div>
        </Card>
      )}

      {/* Cycle History Table */}
      <Card>
        <h3 className="text-lg font-medium text-plum mb-4">Cycle History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-rose-lt">
                <th className="text-left py-2 text-muted font-medium">Cycle</th>
                <th className="text-left py-2 text-muted font-medium">Start Date</th>
                <th className="text-left py-2 text-muted font-medium">End Date</th>
                <th className="text-left py-2 text-muted font-medium">Length</th>
              </tr>
            </thead>
            <tbody>
              {cycleData?.periodHistory?.map((period, index) => {
                const start = new Date(period.startDate);
                const end = new Date(period.endDate);
                const length = Math.round((end - start) / (1000 * 60 * 60 * 24));
                return (
                  <tr key={index} className="border-b border-rose-lt/50 hover:bg-blush">
                    <td className="py-2 text-plum">#{index + 1}</td>
                    <td className="py-2 text-muted">{start.toLocaleDateString()}</td>
                    <td className="py-2 text-muted">{end.toLocaleDateString()}</td>
                    <td className="py-2 text-plum font-medium">{length} days</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}