export async function later(delay: number) {
  if (!delay) delay = 5000;
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}