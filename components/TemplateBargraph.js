import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { select, axisBottom, axisRight, scaleLinear, scaleBand, scaleOrdinal } from 'd3'

export const TemplateBargraph = ({ up, down, views }) => {
  const svgRef = useRef()
  // will be called initially and on every data change
  useEffect(() => {
    const test = [up, down, views]
    var yMax = Math.max(...test)
    let tickLabels = ['upVotes', 'downVotes', 'views']
    console.log('max', yMax)
    console.log('array', test)

    const svg = select(svgRef.current)

    const xScale = scaleBand().domain([0, 1, 2]).range([0, 300]).padding(0.3)

    //domain = input values, for scaling index values - range = visual presentation of the data,
    //.domain([0,6]).range([0,300])so when input 0 = 0, when input 6 = 300
    const yScale = scaleLinear()
      .domain([0, yMax])
      .range([yMax * 2.5, 0])

    var myColor = scaleOrdinal()
      .domain(test)
      .range(['steelblue', 'rgba(198, 45, 205, 0.8)', 'rgb(12,240,233)'])

    const xAxis = axisBottom(xScale)
      .ticks(test.length)
      .tickFormat((d, i) => tickLabels[i])

    const yAxis = axisRight(yScale)

    svg
      .select('.x-axis')
      .style('transform', `translateY(${yMax * 2.5}px)`)
      .call(xAxis)

    svg.select('.y-axis').style('transform', 'translateX(280px)').call(yAxis)

    svg
      .selectAll('.bar')
      .data(test)
      .join('rect')
      .attr('class', 'bar')
      .attr('fill', (d) => myColor(d))
      .attr('x', (value, index) => xScale(index))
      .attr('y', yScale)
      .attr('width', xScale.bandwidth())
      .attr('height', (value) => yMax * 2.5 - yScale(value))
  })

  return (
    <div className="overflow-visible">
      Barchart
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  )
}
TemplateBargraph.propTypes = {
  up: PropTypes.number,
  down: PropTypes.number,
  views: PropTypes.number,
}
