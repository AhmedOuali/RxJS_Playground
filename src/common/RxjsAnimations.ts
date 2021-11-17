import { animationFrameScheduler, defer, interval, Observable, of } from 'rxjs'
import { concat, map, takeWhile } from 'rxjs/operators'

class RxjsAnimations {
  private animationFrames$: Observable<number>;
  public animationTicks$: Observable<number>

  constructor () {
    this.animationFrames$ = interval(0, animationFrameScheduler);
    this.animationTicks$ = defer(() => {
      const start = animationFrameScheduler.now();
      return this.animationFrames$.pipe(
        map(() => animationFrameScheduler.now() - start),
      );
    });
  }

  private translationProgression (ms: number): Observable<number> {
    return this.animationTicks$.pipe(
      map((t) => t / ms ),
      takeWhile(t => t <= 1),
      concat(of(1))
    )
  }

  /**
   * @param start
   * @param end
   * @param speed pixel per second
   */
  public translate (start: number, end: number, speed: number) {
    const distance  = Math.abs(end - start);
    const animationDuration = 1 / (speed / distance) * 1000
    return this.translationProgression(animationDuration).pipe(
      map(percentage => (start) + percentage * (end - start) )
    )
  }
}

export default RxjsAnimations;
