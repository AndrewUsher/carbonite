const randomColor = (): string => Math
  .floor(Math.random() * 16777215)
  .toString(16)
  .padEnd(6, 'f')

export {
  randomColor
}
