import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { select, axisBottom, axisRight, scaleLinear, scaleBand, stack, max } from 'd3'
//import { useResizeObserver } from '@/components/useResizeObserver'//

export const TemplateStackedBarChart = ({ ups, downs, templateViews, totalViews }) => {
  const svgRef = useRef()
  //const wrapperRef = useRef()
  //const dimensions = useResizeObserver(wrapperRef)
  const allKeys = ['upVotes', 'downVotes', 'templateViews', 'totalViewsWithoutCurrentMeme']
  const colors = {
    upVotes: 'steelblue',
    downVotes: 'rgba(198, 45, 205, 0.8)',
    templateViews: 'rgb(12,240,233)',
    totalViewsWithoutCurrentMeme: 'rgb(51,102,255)',
  }
  const [keys, setKeys] = useState(allKeys)

  useEffect(() => {
    const data = [
      {
        type: 'Votes',
        upVotes: ups,
        downVotes: downs,
        templateViews: 0,
        totalViewsWithoutCurrentMeme: 0,
      },
      {
        type: 'Views',
        upVotes: 0,
        downVotes: 0,
        templateViews: templateViews,
        totalViewsWithoutCurrentMeme: totalViews - templateViews,
      },
    ]
    console.log('votes,', ups)
    const svg = select(svgRef.current)
    //const views = [{ templateviews: templateViews, totalViews: totalViews }]
    //const view_keys = ['templateViews', 'totalViews']

    const stackVotesGenerator = stack().keys(keys)
    //const stackViewsGenerator = stack().keys(view_keys)
    const layers = stackVotesGenerator(data)
    console.log('layers: ', layers)
    const extent = [0, max(layers, (layer) => max(layer, (sequence) => sequence[1]))]
    console.log('extent ', extent)
    //const viewLayers = stackViewsGenerator(views)

    const xScale = scaleBand()
      .domain(data.map((d) => d.type))
      .range([0, 100])
      .padding(0.25)
    const xAxis = axisBottom(xScale)
    const yScale = scaleLinear().domain(extent).range([200, 0])
    const yAxis = axisRight(yScale).ticks(6)

    svg
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', (layer) => colors[layer.key])
      .selectAll('rect')
      .data((layer) => layer)
      .join('rect')
      .attr('x', (sequence) => {
        //console.log('sequence:', sequence)
        return xScale(sequence.data.type)
      })
      .attr('width', xScale.bandwidth())
      .attr('y', (sequence) => yScale(sequence[1]))
      .attr('height', (sequence) => yScale(sequence[0]) - yScale(sequence[1]))

    //svg.selectAll('.mylayer2').data(viewLayers).join('g').attr('class', 'layer')

    svg.select('.x-axis').attr('transform', `translate(0, 200)`).call(xAxis)
    svg.select('.y-axis').style('transform', 'translateX(100px)').call(yAxis)

    svg.attr('width', 200)
    svg.attr('height', 230)
  })

  return (
    <div>
      <div id="stackedBar">
        <h2>Bar Chart</h2>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
      <div className="fields">
        {allKeys.map((key) => (
          <div key={key} className="field">
            <input
              id={key}
              type="checkbox"
              checked={keys.includes(key)}
              onChange={(e) => {
                if (e.target.checked) {
                  setKeys(Array.from(new Set([...keys, key])))
                } else {
                  setKeys(keys.filter((_key) => _key !== key))
                }
              }}
            />
            <label htmlFor={key} style={{ color: colors[key] }}>
              {key}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

TemplateStackedBarChart.propTypes = {
  ups: PropTypes.number,
  downs: PropTypes.number,
  templateViews: PropTypes.number,
  totalViews: PropTypes.number,
}
