import { CourseService } from './course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from './course';

@Component({
    templateUrl: './course-info.component.html'
})

export class CourseInfoCompenent implements OnInit {

    course: Course;

    constructor(private activatedRoute: ActivatedRoute, private CourseService: CourseService) {}

    ngOnInit(): void {
        this.CourseService.retrieveById(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe({
            next: course => this.course = course,
            error: err => console.log('Error', err)
        })
    }


    save(): void {
        this.CourseService.save(this.course).subscribe({
            next: course => console.log('Saved with sucess', course),
            error: err => console.log('Error', err)
        });
    }
}