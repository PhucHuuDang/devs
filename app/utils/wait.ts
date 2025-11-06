export const wait = (ms: number = 500): Promise<boolean> =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("test waiting");
      resolve(true);
    }, ms);
  });
