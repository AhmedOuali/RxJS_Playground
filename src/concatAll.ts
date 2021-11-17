import { fromEvent, interval } from 'rxjs';
import { map, take, concatAll } from 'rxjs/operators';

export function concatAllDefault () {
  const clicks = fromEvent(document, 'click');
  const higherOrder = clicks.pipe(
    map(() => interval(1000).pipe(take(4))),
  );
  const firstOrder = higherOrder.pipe(concatAll());
  firstOrder.subscribe(console.log);
}


