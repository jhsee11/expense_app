import React from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function PieChart({ chartData }) {
  return (
    <div>
      <Pie
        data={chartData}
        height="200px"
        width="200px"
        options={{
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
        }}
      />
    </div>
  );
}

export default PieChart;
