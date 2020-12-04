import React, { useEffect, useRef, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import data from '../zuidoost.json'
import { select } from 'd3';
import { MapBarChart } from './MapBarChart';


export interface MapProps {
cijfers: any
}

export const D3Map: React.FC<MapProps> = ({cijfers}) => {
  const [selectedBuurt, setSelectedBuurt] = useState(null)
  const [politieData, setPolitieData] = useState()
  const svgRef = useRef();
  const wrapperRef = useRef();
  // const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {

    const svg = select(svgRef.current);
    console.log(politieData)

    // const {width | height} = dimensions || wrapperRef.current?.getBoundingClientRect();
    const projection = geoMercator().fitSize([700, 700], (data as any))
    const pathGenerator = geoPath().projection(projection)
    

    svg
    .selectAll("country")
    .data(data.features)
    .join("path")
    .on("click", (event, feature) => {
      setSelectedBuurt(feature.properties.name)
      setPolitieData(cijfers[feature.properties.name])
    })
    .attr("class", "country")
    .transition()
    .attr("fill", "#6C63FF")
    .attr("d", (feature: any) => pathGenerator(feature))
  

  }, [data, selectedBuurt, cijfers])

  return (
    <div className="map" ref={wrapperRef}>
      <svg ref={svgRef} width="700" height="700"></svg>
      {selectedBuurt && <MapBarChart cijfers={politieData} buurt={selectedBuurt}/>}

    </div>
  );
};
