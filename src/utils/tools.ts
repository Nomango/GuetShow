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
