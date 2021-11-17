const utils = () : SVGSVGElement => {
  const rootElement = document.getElementsByTagName('body')
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.classList.add('swipe-to-refresh__svg--root')

  svg.setAttribute('height', '70')
  svg.setAttribute('width', '70')

  const bigCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  bigCircle.setAttribute('cx', '35')
  bigCircle.setAttribute('cy', '35')
  bigCircle.setAttribute('r', '35')
  bigCircle.setAttribute('fill', 'lightgrey')

  const smallCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  smallCircle.setAttribute('cy', '15')
  smallCircle.setAttribute('cx', '35')
  smallCircle.setAttribute('r', '10')
  smallCircle.setAttribute('fill', 'black')

  svg.append(bigCircle)
  svg.append(smallCircle)
  rootElement[0]?.append(svg)
  return svg
}

export default utils
