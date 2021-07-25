export function debounce(fn: any, delay: number) {
  let timer: any = null;

  return function(this: any) {
    // eslint-disable-next-line prefer-rest-params
    const context: any = this as any;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments as any;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

export function throttle(func: any, wait?: any, options?: any) {
  let timeout: any, context: any, args: any, result;
  let previous = 0;
  if (!options) options = {};

  const later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  const throttled = function(this: any) {
    const now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    // eslint-disable-next-line prefer-rest-params
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };
  return throttled;
}
