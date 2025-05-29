import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataItem {
  name: string;
  count: number;
  color: string;
}

interface PopularityChartProps {
  data: DataItem[];
}

const PopularityChart: React.FC<PopularityChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2},${height/2})`);

    // Create pie chart
    const pie = d3.pie<DataItem>()
      .value(d => d.count)
      .sort(null);

    const arc = d3.arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(0)
      .outerRadius(radius);

    // Create tooltip
    const tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('border', '1px solid #ddd')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('pointer-events', 'none');

    // Add pie slices
    svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .on('mouseover', (event, d) => {
        tooltip
          .style('visibility', 'visible')
          .html(`${d.data.name}: ${d.data.count}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mousemove', (event) => {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    // Add labels
    const labelArc = d3.arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6);

    svg.selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', 'white')
      .text(d => d.data.name);

  }, [data]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Name Popularity</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default PopularityChart; 