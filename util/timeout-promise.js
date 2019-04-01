export default function timeoutPromise(time, error, promise) {
  return Promise.race([
    promise,
    new Promise((res, rej) => {
      setTimeout(() => {
        rej(new Error(error));
      }, time);
    })
  ]);
}
