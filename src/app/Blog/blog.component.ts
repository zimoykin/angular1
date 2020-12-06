import { Component, OnInit, Input } from '@angular/core'
import { Blog } from '../home/home.component'

@Component ({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})

export class blogComponent implements OnInit {

    @Input() blog: Blog;
    @Input() index: number;

    ngOnInit () {}

}