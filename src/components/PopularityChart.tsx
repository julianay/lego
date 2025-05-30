import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ColorData {
  color: string;
  count: number;
}

interface PopularityChartProps {
  data: ColorData[];
  title: string;
}

const PopularityChart = ({ data, title }: PopularityChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const width = 100;
    const height = 100;
    const radius = Math.min(width, height) / 2;

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
      tooltip
        .style('visibility', 'visible')
        .html(`Color: ${d.data.color}<br/>Count: ${d.data.count}`);
    })
    .on('mousemove', function(event) {
      tooltip
        .style('top', (event.pageY - 10) + 'px')
        .style('left', (event.pageX + 10) + 'px');
    })
    .on('mouseout', function() {
      tooltip.style('visibility', 'hidden');
    });

  }, [data]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-semibold mb-4" style={{ fontSize: '0.7rem', lineHeight: '0.7rem' }}>{title}</div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default PopularityChart; 