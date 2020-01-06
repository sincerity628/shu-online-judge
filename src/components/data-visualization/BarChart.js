import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, options }) => {
  return (
    <div className="bar-chart">
      <Bar
        data={data}
        height={100}
      />
    </div>
  );
}

export default BarChart;
