import React, { useEffect, useRef, useState } from 'react';
import { axisBottom, axisLeft, max, scaleBand, scaleLinear, select } from 'd3';
import { misdrijf } from '../format/misdrijven';

const LijstMetMisdrijven = Object.values(misdrijf.misdrijf)

export interface BarChartProps {
  cijfers: any[]
  buurt: string
}

export const MapBarChart: React.FC<BarChartProps> = ({cijfers, buurt}) => {
  const svgRef = useRef();
  // const dimensions = useResizeObserver(wrapperRef);
  
  const margin = { top: 20, right: 20, bottom: 30, left: 165 },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  const y = scaleBand().range([height, 0]).padding(0.1);
  const x = scaleLinear().domain([0, 500]).range([0, width]);
    
    useEffect(() => {
        if(cijfers) {
            
            const perMisdrijf = LijstMetMisdrijven.map((misdrijf: any) => {
                const filter = cijfers.map((buurt: any) => {
                    const arr = buurt.filter((b: any) => b["Soort misdrijf"] === misdrijf)
                    return arr
                })
                
                return filter.filter((d: any) => d.length !== 0)
            })
            
            const form = perMisdrijf.map((buurt: any) => {
                let count = 0
                let title = ''
                
                buurt.forEach((b: any) => {
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
            
            const final = form.filter((d: any) => d.misdrijf !== '')

            console.log(final)
            
            const svg = 
            select(svgRef.current)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
            
            const y = scaleBand().range([height, 0]).padding(0.1);
      
            const x = scaleLinear().domain([0, 300]).range([0, width]);
        
            x.domain([0, max(final, (data) => data.count)]);
            y.domain(final.map((data) => data.misdrijf));
        
            svg
              .select(".x-axis")
              .attr('transform', `translate(0, ${height})`)
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
              .attr("fill", "#35307E")
              .attr("height", y.bandwidth());
          }
        }, [cijfers])
      
        return (
            <div >
              <p>Jaarcijfers van {buurt}</p>
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
      