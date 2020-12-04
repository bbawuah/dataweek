import React, { useEffect, useRef, useState } from 'react';
import { axisBottom, axisLeft, max, scaleBand, scaleLinear, select } from 'd3';
import data from '../surveydata.json'


export const StaticBarChart: React.FC = () => {
  const [selectedBuurt, setSelectedBuurt] = useState(null)
  const [period, setPeriod] = useState<any>("2020 oktober")
  const svgRef = useRef();
  const gRef = useRef();
  const wrapperRef = useRef();
  // const dimensions = useResizeObserver(wrapperRef);
  
  const margin = { top: 20, right: 20, bottom: 30, left: 165 },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  const y = scaleBand().range([height, 0]).padding(0.1);
  const x = scaleLinear().domain([0, 500]).range([0, width]);

  useEffect(() => {

      const svg = 
      select(svgRef.current)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      
      const y = scaleBand().range([height, 0]).padding(0.1);

      const x = scaleLinear().domain([0, 300]).range([0, width]);
  
      x.domain([0, max(data, (data:any) => data.count)]);
      y.domain(data.map((data) => data.misdrijf));
  
      svg
        .select(".x-axis")
        .attr('transform', `translate(0, ${height})`)
        .call(axisBottom(x));
  
      svg
        .select(".y-axis")
        .call(axisLeft(y));
  
      svg
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("y", (data) => y(data.misdrijf))
        .attr("width", (data) => x(data.count))
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .transition()
        .attr("fill", "#35307E")
        .attr("height", y.bandwidth());

  }, [ period])

  return (

      <svg ref={svgRef} width={width + margin.left + margin.right}
	      height={height + margin.top + margin.bottom} className="staticSvg">
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g className="x-axis"/>
              <g className="y-axis" />
          </g>
      </svg>

  );
};
