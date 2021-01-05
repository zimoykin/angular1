export {}

declare global {
    interface Date {
      prepareDateConvertToString() : string
    }
  }
  
   Date.prototype.prepareDateConvertToString = function() : string {
    return this.toLocaleDateString().replace ('/', '.').replace ('/', '.').replace ('-', '.').replace ('-', '.')
  }
  