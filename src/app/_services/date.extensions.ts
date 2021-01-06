export {}

declare global {
  interface Date {
    prepareDateConvertToString: () => string
  }
}

Date.prototype.prepareDateConvertToString = function (): string {
  console.log ('prepareDateConvertToString')
  return this.toLocaleDateString().replace('/', '.').replace('/', '.').replace('-', '.').replace('-', '.')
}
  