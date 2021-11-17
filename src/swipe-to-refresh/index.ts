import { animationFrameScheduler, defer, fromEvent, interval, Observable, of } from 'rxjs'
import { concat, filter, map, switchMap, takeUntil, takeWhile, tap, concatWith } from 'rxjs/operators'
import utils from './utils'
import RxjsAnimations from '../common/RxjsAnimations'

class Index {
  private mouseDown$: Observable<MouseEvent>
  private mouseUp$: Observable<MouseEvent>
  private mouseMove$: Observable<MouseEvent>
  private svg: SVGSVGElement
  private dragStartY: number = 0
  private dragEndY: number = 0
  private infBound: number = 0
  private supBound: number = window.innerHeight / 2

  constructor () {
    this.mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown')
    this.mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup')
    this.mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove')
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.updateCirclePosition = this.updateCirclePosition.bind(this)
    this.render = this.render.bind(this)
    this.heightBoundFilter = this.heightBoundFilter.bind(this)
  }

  render () {
    this.svg = utils()
    this.start()
  }

  start () {
    const rxjsAnimation = new RxjsAnimations()
    const mouseUp$ = this.mouseUp$.pipe(tap(({ clientY }) => this.dragEndY = clientY))

    const mouseMove$ = this.mouseMove$.pipe(
      map(({ clientY }) => clientY - this.dragStartY),
      filter(this.heightBoundFilter),
      takeUntil(mouseUp$),
      concatWith(defer(() => rxjsAnimation.translate(this.dragEndY - this.dragStartY > this.supBound - this.infBound ? this.supBound - this.infBound : this.dragEndY - this.dragStartY, 0, 500))),
    )

    const mouseDown$ = this.mouseDown$.pipe(
      map(({ clientY }) => {
        this.dragStartY = clientY
        return clientY
      }),
      switchMap(() => mouseMove$),
    )
    mouseDown$.pipe().subscribe(y => this.updateCirclePosition(y))
  }

  private updateCirclePosition (y: number) {
    const rotationDeg = y % 360
    this.svg.style.transform = `rotate(${rotationDeg}deg)`
    this.svg.style.top = `${y}`
  }

  private heightBoundFilter = (y: number): boolean => {
    return (y > this.infBound) && (y < this.supBound)
  }
}

export default Index
