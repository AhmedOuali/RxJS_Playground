import { animationFrameScheduler, observable, Observable, fromEvent } from 'rxjs'
import { debounceTime, delay, exhaustMap, observeOn, switchMap, takeUntil } from 'rxjs/operators'

export function mousePainter () {
  const rootElement = document.getElementById('root')

  // create canvas element
  const canvasElement = document.createElement('div')
  canvasElement.classList.add('mouse-printer__canvas')
  canvasElement.setAttribute('id', 'canvas')
  rootElement?.appendChild(canvasElement)

  // create clear Button
  const clearButton = document.createElement('button')
  clearButton.textContent = 'Clear'
  clearButton.addEventListener('click', () => {

    // @ts-ignore
    canvasElement.innerHTML = ''
  })
  rootElement?.appendChild(clearButton)
  const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup')

  //
  const mouseMovements$ = fromEvent<MouseEvent>(document, 'mousemove')
    .pipe(
      observeOn(animationFrameScheduler),
      takeUntil(mouseUp$),
    )
  const mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown')
    .pipe(
      exhaustMap(() => mouseMovements$),
    )

  mouseDown$.subscribe(({ clientX, clientY }) => {
    const rootElement = document.getElementById('canvas')
    const newElement = document.createElement('div')
    newElement.classList.add('mouse-printer__colored-movement')
    newElement.style.top = clientY.toString()
    newElement.style.left = clientX.toString()
    rootElement?.appendChild(newElement)
  })

}
