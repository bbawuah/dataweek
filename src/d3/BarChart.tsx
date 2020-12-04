import React, { useEffect, useRef, useState } from 'react';
import { axisBottom, axisLeft, max, scaleBand, scaleLinear, select } from 'd3';
import { misdrijf } from '../format/misdrijven';

const LijstMetMisdrijven = Object.values(misdrijf.misdrijf)

export interface BarChartProps {
  cijfers: any[]
}

export const BarChart: React.FC<BarChartProps> = ({cijfers}) => {
  const [period, setPeriod] = useState<any>("2020 oktober")
  const svgRef = useRef();
  
  const margin = { top: 20, right: 20, bottom: 30, left: 165 },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  const y = scaleBand().range([height, 0]).padding(0.1);
  const x = scaleLinear().domain([0, 500]).range([0, width]);

  useEffect(() => {
    if(cijfers) {

      const dataOverPeriod = cijfers.map((item: any[]) => {
        const filter = item.filter((buurt: any) => buurt["Perioden"] === period)
        
        return filter
      })


      const perMisdrijf = LijstMetMisdrijven.map((misdrijf) => {
        const filter = dataOverPeriod.map((buurt: any) => {
          const arr = buurt.filter((b: any) => b["Soort misdrijf"] === misdrijf)
          return arr
        })

        return filter.filter((d) => d.length !== 0)
      })

      const format = perMisdrijf.map((buurt) => {
        let count = 0
        let title = ''

        buurt.forEach((b) => {
          b.forEach((d: any) => {
            title = d["Soort misdrijf"]
            count = count + d["Geregistreerde misdrijven (aantal)"]
          })
        })

        return {
          misdrijf: title,
          count
        }
      })

     const valseMisdrijven = LijstMetMisdrijven.filter((misdrijf, index) => {
        const misdrijven = format.map((m) => m.misdrijf);
        return misdrijven[index] !== misdrijf
      })

    const objVanValseMisdrijven = valseMisdrijven.map((misdrijf) => {
      return {
        misdrijf,
        count: 0
      }
    })
    

      const final = format.concat(objVanValseMisdrijven).filter((d) => d.misdrijf !== '')
    

      const svg = 
      select(svgRef.current)
      .attr("transform", "translate(" + 0 + "," + margin.top + ")");

      
      const y = scaleBand().range([height, 0]).padding(0.1);

      const x = scaleLinear().domain([0, 300]).range([0, width]);
  
      x.domain([0, max(final, (data) => data.count)]);
      y.domain(final.map((data) => data.misdrijf));
  
      svg
        .select(".x-axis")
        .attr('transform', `translate(0, ${height})`)
        .style("text-anchor", "middle")
        .text("Aantallen")
        .call(axisBottom(x));
  
      svg
        .select(".y-axis")
        .call(axisLeft(y));
  
      svg
        .selectAll(".bar")
        .data(final)
        .join("rect")
        .attr("class", "bar")
        .attr("y", (data) => y(data.misdrijf))
        .attr("width", (data) => x(data.count))
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .transition()
        .attr("fill", "#6C63FF")
        .attr("height", y.bandwidth());
    }
  }, [cijfers, period])

  return (
      <div className="svg-container">
        <form className="form">
          <select id="select" name="select" onChange={(value) => setPeriod(value.target.value)}>
            <option value="2020 oktober">2020 oktober</option>
            <option value="2020 september">2020 september</option>
            <option value="2020 augustus">2020 augustus</option>
            <option value="2020 juli">2020 juli</option>
            <option value="2020 juni">2020 juni</option>
          </select>
        </form>
      <svg ref={svgRef} width={width + margin.left + margin.right}
	      height={height + margin.top + margin.bottom}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g className="x-axis"/>
              <g className="y-axis" />
          </g>
      </svg>
      </div>
  );
};
