import Ball from './Ball'
import { ballViewBuilder } from './utils'

class BouncingBalls {
  private balls: Ball[] = []

  constructor () {

  }

  render () {
    const ball = new Ball({ x0: 10, vx: 90 }, { y0: 30, vy: 20 })
    const ball1 = new Ball({ x0: 300, vx: 20 }, { y0: 300, vy: 130 })
    const ball3 = new Ball({ x0: 300, vx: 20 }, { y0: 100, vy: 180 })
    const ball4 = new Ball({ x0: 300, vx: 180 }, { y0: 300, vy: 130 })
    const ball5 = new Ball({ x0: 300, vx: 140 }, { y0: 300, vy: 130 })
    const ball6 = new Ball({ x0: 300, vx: 120 }, { y0: 300, vy: 200 })
    ball6.navigate()
    ball5.navigate()
    ball4.navigate()
    ball3.navigate()
    ball1.navigate()
    ball.navigate()
  }
}

export default BouncingBalls
