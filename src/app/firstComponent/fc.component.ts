import { Component, OnInit } from '@angular/core'

@Component ({
    selector: 'app-fc',
    templateUrl: './fc.component.html',
    styleUrls: ['./fc.component.scss']
})

export class fcComponent implements OnInit {

    inputHandler (event: any) {
        this.title = event.target.value  
    }

    title = 'squadra PALERMO'
    about = `Palermo Football Club, known as Palermo F.C. or more simply Palermo, (Italian: [paˈlɛrmo] (About this soundlisten); locally [paˈlɛmmʊ]) is an Italian football club based in the Sicilian city of Palermo founded on 1 November 1900. Palermo were the first football club founded in Sicily, the first in the South of Italy and also the 7th oldest extant club in the country.[citation needed]

    Unione Sportiva Città di Palermo was excluded from Serie B in 2019, due to financial irregularities,[2] and was re-founded in Serie D.
    
    The team achieved its greatest sporting success in the 2000s, during which it had three 5th-placed finishes in the Serie A (including two in a row) and also reached the 2005–06 UEFA Cup's round of 16. The club counts the Coppa Italia Serie C in 1992–1993 as a major honour in their history. With their appearances in 3 Coppa Italia finals - twice in the 1970s (1974 and 1979) and again in 2011) - and their 5 Serie B titles, alongside the many trophies won in the first twenty years of the twentieth century, Palermo is often considered to be one of the most important and successful clubs of Southern Italy.
    Regarding their performances in European competition, the club has five appearances in UEFA Cup/Europa League; in 2007 it occupied 51st place in UEFA ranking.[3] According to the monthly ranking by the IFFHS the highest ranking ever reached was the 19th place, in both February[4] and June 2006;[5] according to another ranking of the same entity, the rosanero were the 121th best team in the world from 1 January 1991 to 31 December 2009.[6]
    Palermo play in pink shirts, being the sole Italian professional club to do so. This is accompanied by black as the secondary colour.`

    imageUrl = ''


    ngOnInit () {
        this.imageUrl = 'https://seeklogo.com/images/U/us-palermo-logo-62FB57247E-seeklogo.com.jpg' 
    }

}