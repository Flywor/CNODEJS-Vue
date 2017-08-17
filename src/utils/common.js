const throttle = {
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
    tm.remaining = wait - (tm.now - tm.previous)
    if (tm.remaining > 0) {
      return
    } else {
      tm.previous = tm.now
    }
    if (tm.remaining < 1) {
      tm.remaining = wait
      tm.previous = tm.now
    }
    callback()
  }
}

const now = () => {
  let tmp = Date.parse(new Date()).toString()
  return tmp.substr(0, 10)
}

exports.throttle = throttle
