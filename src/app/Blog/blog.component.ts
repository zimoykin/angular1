import { Component, OnInit, Input } from '@angular/core'
import { BlogModel } from '../_model/BlogModel'

@Component ({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})

export class blogComponent implements OnInit {

    @Input() blog: BlogModel;
    @Input() index: number;
    @Input() isFullVersion: boolean

    ngOnInit () {}

}