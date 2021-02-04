import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BlogModel } from '../_model/BlogModel';
import { Day, Month, Week } from '../_model/Month';
import { Constants as K } from '../_model/Constants'
import { Http } from '../_services/http-service.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  month: Month
  blogs: [BlogModel]
  $dt = new Date()


  constructor( 
    private http: Http 
  ) { }

  ngOnInit(): void {
    this.GetBuildThisMonth()
  }

  nextMonth(month: number) {
    this.$dt.setMonth(this.$dt.getMonth() + month)
    this.GetBuildThisMonth()
  }

  chooseDay (date: Date) {
    console.log (date)
    this.getBlogsOnDay(date)
  }

  getBlogsOnDay (date: Date) {

    this.http.get<[BlogModel]>(`api/blogs/onday/${date.prepareDateConvertToString()}`)
      .then ( val => {
        this.blogs = val.body
      }
    )
  }

  GetBuildThisMonth() {

    const _month = this.$dt.toLocaleDateString('en', { month: 'long' });
    const _year = this.$dt.getFullYear().toString();

    let startOfMonth = new Date(this.$dt.getFullYear(), this.$dt.getMonth(), 1)
    let endOfMonth = new Date(this.$dt.getFullYear(), this.$dt.getMonth() + 1, 0)

    this.month = new Month(_month, _year)

    //add day before and first week
    console.log(0 - startOfMonth.getDay())
    let week = new Week('1')

    for (let dayBefore = (0 - startOfMonth.getDay() + (startOfMonth.getDay() == 0 ? -6 : 1)); dayBefore < 0; dayBefore++) {
      let curDay = new Date(startOfMonth.getTime() + (86400 * 1000 * dayBefore))
      console.log(curDay)
      week.days.push(new Day(curDay, curDay.getDay() == 0 || curDay.getDay() == 6 ? true : false))
    }

    week.days.sort((a, b) => {
      if (a.date > b.date) { return 1 }
      if (a.date < b.date) { return -1 }
    })

    for (let dayofWeek = 0; week.days.length < 7; dayofWeek++) {
      let curDay = new Date(startOfMonth.getTime() + (86400 * 1000 * dayofWeek))
      week.days.push(new Day(curDay, curDay.getDay() == 0 || curDay.getDay() == 6 ? true : false))
      console.log(week)
    }

    // next week
    let lastDayOfWeek = week.days[week.days.length - 1].date;
    console.log(lastDayOfWeek);
    this.month.week.push(week);

    for (let numberWeek = 2; numberWeek < 7; numberWeek++) {

      let week = new Week(numberWeek.toString());
      let firstDayWeek: Date = new Date(lastDayOfWeek.getTime() + 86400 * 1000)

      if (firstDayWeek.getMonth() == startOfMonth.getMonth()) {

        for (let dayOfWeek = 1; dayOfWeek < 8; dayOfWeek++) {
          let curDay = new Date(lastDayOfWeek.getTime() + (86400 * 1000 * dayOfWeek))
          week.days.push(new Day(curDay, curDay.getDay() == 0 || curDay.getDay() == 6 ? true : false))
          console.log(week)
        }

        lastDayOfWeek = week.days[week.days.length - 1].date;
        console.log(lastDayOfWeek);

        week.days.sort((a, b) => {
          if (a.date > b.date) { return 1 }
          if (a.date < b.date) { return -1 }
        })

        this.month.week.push(week)

      }
    }
  }

  isMobile () : boolean {
    return K.isMobile()
  }
}