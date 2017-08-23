export const throttle = {
  time: {
    now: 0,
    remaining: 0,
    previous: 0
  },
  listener: (callback, wait) => {
    let t = this.throttle
    let tm = t.time
    tm.now = now()
    if (!tm.previous) tm.previous = tm.now
    console.log(tm.now - tm.previous)
    tm.remaining = wait - (tm.now - tm.previous)
    if (tm.remaining > 0) {
      return
    }
    if (tm.remaining < 1) {
      tm.remaining = wait
      tm.previous = tm.now
    }
    callback()
  }
}

const now = () => {
  return new Date().getTime()
}
