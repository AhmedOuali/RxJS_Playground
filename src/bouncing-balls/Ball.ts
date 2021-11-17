import { ballViewBuilder } from './utils'
import RxjsAnimations from '../common/RxjsAnimations'
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

type PathX = { vx: number, x0: number }
type PathY = { vy: number, y0: number }

class Ball {
  private pathX: PathX = { vx: 0, x0: 0 }
  private pathY: PathY = { vy: 0, y0: 0}
  private ballElement: HTMLElement;
  private checkPointTime: number = 0;

  constructor (pathX: PathX, pathY: PathY) {
    this.pathX = pathX;
    this.pathY = pathY;
    this.ballElement = ballViewBuilder()
    this.translateBall = this.translateBall.bind(this)
    this.navigate = this.navigate.bind(this)
    this.pathXEq = this.pathXEq.bind(this)
    this.pathYEq = this.pathYEq.bind(this)
  }

  pathXEq = (t: number) => {
    return this.pathX.vx * (t - this.checkPointTime) + this.pathX.x0
  }

  pathYEq = (t: number) => {
    return this.pathY.vy * (t - this.checkPointTime) + this.pathY.y0;
  }

  navigate () {
    const rxjsAnimation = new RxjsAnimations()
    rxjsAnimation.animationTicks$.pipe(map(t => t/ 1000)).subscribe(this.translateBall)
  }

  translateBall (t: number) {
    const x = this.pathXEq(t)
    const y = this.pathYEq(t)
    const hasHorizontalContact = y >= window.innerHeight-150 || y <= 0;
    const hasVerticalContact = x >= window.innerWidth- 150 || x <= 0;
    if (hasVerticalContact) {
      this.pathX.x0 = x <= 0 ? 0 : window.innerWidth - 150;
      this.pathX.vx = -this.pathX.vx;
      this.pathY.y0 = y;
      this.pathY.vy = this.pathY.vy;
      this.checkPointTime = t
      debugger
    }
    if (hasHorizontalContact) {
      this.pathX.x0 = x;
      this.pathX.vx = this.pathX.vx;
      this.pathY.y0 = y <= 0 ? 0 : window.innerHeight-150;
      this.pathY.vy = -this.pathY.vy;
      this.checkPointTime = t
    }
      this.ballElement.style.top=y.toString()
      this.ballElement.style.left=x.toString()

  }

}

export default Ball
