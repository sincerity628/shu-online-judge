import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ data, options }) => {
  return (
    <div className="doughnut-chart">
        <Doughnut
          data={data}
          options={options}
          width={400}
        />
    </div>
  );
}

export default DoughnutChart;
