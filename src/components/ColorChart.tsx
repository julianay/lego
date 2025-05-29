import React from 'react';
import * as d3 from 'd3';

interface DataItem {
  name: string;
  count: number;
}

interface PopularityChartProps {
  data: DataItem[];
}

const PopularityChart: React.FC<PopularityChartProps> = ({ data }) => {
  // Create a scale to map count values to pixel widths
  const widthScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count) || 0])
    .range([0, 300])
    .nice();

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-sm text-gray-500">{item.count} occurrences</span>
            </div>
            <div
              className="h-4 rounded bg-blue-500 transition-all duration-300"
              style={{
                width: `${widthScale(item.count)}px`,
                maxWidth: '100%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularityChart; 