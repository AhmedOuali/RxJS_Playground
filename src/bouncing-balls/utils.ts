
export const ballViewBuilder = () : HTMLElement => {
  const rootElement = document.getElementById('root')

  const figure = document.createElement('figure')
  figure.classList.add('bouncing-balls__ball')

  const shadow = document.createElement('span')
  shadow.classList.add('shadow')

  figure.appendChild(shadow)

  rootElement?.appendChild(figure)
  return figure
}
