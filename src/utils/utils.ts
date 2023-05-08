export const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const getInitialAmount = () => {
  return randomIntFromInterval(100, 999) + randomIntFromInterval(10, 99) / 100
}
