import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ColorData {
  color: string;
  count: number;
}

interface PopularityChartProps {
  data: ColorData[];
  title: string;
  total_count: number;
}

const PopularityChart = ({ data, title, total_count }: PopularityChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Calculate size based on total_count
    const maxCount = 5140; // Maximum count from the data (Star Wars theme)
    const minSize = 20; // Minimum size for very small themes
    const maxSize = 80; // Maximum size for large themes
    // Use square root to make area proportional to count
    const scale = Math.sqrt(total_count / maxCount) * (maxSize - minSize) + minSize;
    
    const width = scale + 2;  // Add 2px for stroke
    const height = scale + 2; // Add 2px for stroke
    const radius = Math.min(width, height) / 2 - 1; // Adjusted to account for stroke

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<ColorData>()
      .value(d => d.count)
      .sort(null);

    const arc = d3.arc<d3.PieArcDatum<ColorData>>()
      .innerRadius(0)
      .outerRadius(radius);

    // Add the outer circle for the border
    svg.append('circle')
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('stroke', '#cccccc')
      .style('stroke-width', '1px');

    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    // Add slices
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .on('mouseover', function() {
        d3.select(this)
          .style('opacity', 0.7)
          .style('cursor', 'pointer');
      })
      .on('mouseout', function() {
        d3.select(this)
          .style('opacity', 1);
      });

    // Add tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('border', '1px solid #ddd')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('pointer-events', 'none');

    arcs.on('mouseover', function(_, d) {
      const percentage = ((d.data.count / total_count) * 100).toFixed(1);
      tooltip
        .style('visibility', 'visible')
        .html(`Color: ${d.data.color}<br/>Count: ${d.data.count} (${percentage}%)<br/>Total: ${total_count}`);
    })
    .on('mousemove', function(event) {
      tooltip
        .style('top', (event.pageY - 10) + 'px')
        .style('left', (event.pageX + 10) + 'px');
    })
    .on('mouseout', function() {
      tooltip.style('visibility', 'hidden');
    });

  }, [data, total_count]);

  return (
    <div className="flex flex-col items-center w-full">
      <svg ref={svgRef}></svg>
      <div className="text-2xl font-semibold mt-4 text-center w-full" style={{ fontSize: '0.7rem', lineHeight: '0.7rem' }}>{title}</div>
    </div>
  );
};

export default PopularityChart; 