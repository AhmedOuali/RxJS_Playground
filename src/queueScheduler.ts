import { from, queueScheduler,  interval} from 'rxjs'

export function testQueueSchedulerDefault(): void {
  const observer = from([1,2,3,4,5,6,7,8], queueScheduler)
  console.log("Before queueScheduler")
  observer.subscribe(console.log)
  console.log("After queueScheduler")
};

export function testQueueSchedulerTimer(): void {
  const observer = interval(1000, queueScheduler)
  console.log("Before queueScheduler")
  observer.subscribe(console.log)
  console.log("After queueScheduler")
};
