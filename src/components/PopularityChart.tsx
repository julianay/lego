import { useState } from 'react';
import * as d3 from 'd3';

interface DataItem {
  name: string;
  count: number;
  color: string;
}

interface PopularityChartProps {
  data: DataItem[];
}

interface TooltipData {
  x: number;
  y: number;
  name: string;
  count: number;
}

const PopularityChart: React.FC<PopularityChartProps> = ({ data }) => {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  // Set up dimensions
  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  // Create pie generator
  const pie = d3.pie<DataItem>()
    .value(d => d.count)
    .sort(null);

  // Create arc generator
  const arc = d3.arc<d3.PieArcDatum<DataItem>>()
    .innerRadius(0)
    .outerRadius(radius);

  // Generate pie data
  const pieData = pie(data);

  const handleMouseMove = (event: React.MouseEvent<SVGGElement>, d: d3.PieArcDatum<DataItem>) => {
    const [x, y] = d3.pointer(event);
    setTooltip({
      x: x + width/2,
      y: y + height/2,
      name: d.data.name,
      count: d.data.count
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex flex-col items-center relative">
        <svg width={width} height={height}>
          <g transform={`translate(${width/2},${height/2})`}>
            {pieData.map((d, i) => (
              <g 
                key={i}
                onMouseMove={(e) => handleMouseMove(e, d)}
                onMouseLeave={handleMouseLeave}
              >
                <path
                  d={arc(d) || undefined}
                  fill={d.data.color}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                />
                <text
                  transform={`translate(${arc.centroid(d)})`}
                  dy=".35em"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {d.data.count}
                </text>
              </g>
            ))}
          </g>
        </svg>
        
        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute bg-white shadow-lg rounded-lg p-2 text-sm pointer-events-none z-10"
            style={{
              left: tooltip.x + 10,
              top: tooltip.y - 10,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="font-medium">{tooltip.name}</div>
            <div className="text-gray-600">Count: {tooltip.count}</div>
          </div>
        )}
        
        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          {data.map((item, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm">{item.name}</span>
              <span className="text-sm text-gray-500">({item.count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularityChart; 