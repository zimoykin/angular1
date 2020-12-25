

//Calendar
export class Month {
    title: string
    year: string
    week: Array<Week>

    constructor ( title: string, year: string ) {
        this.title = title
        this.year = year
        this.week = new Array<Week>()
    }
}

export class Week {
    title: string
    days: Array<Day>

    constructor ( week: string ) {
        this.title = week
        this.days = new Array<Day>()
    }
 }

export class Day {
    date: Date
    title: string
    isDayOff: boolean

    constructor (day: Date, isDayOff: boolean) {
        this.date = day
        this.title = day.toLocaleDateString()
        this.isDayOff = isDayOff
    }
}