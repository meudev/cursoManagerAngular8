import { CourseService } from './course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from './course';

@Component({
    templateUrl: './course-list.component.html'
})

export class CourseListComponent implements OnInit {

    filterCourses: Course[] = [];

    _courses: Course[] = [];

    _filterBy: String;

    constructor(private courseService: CourseService) {}

    ngOnInit(): void {
        this.retrieveAll();
    }

    retrieveAll(): void {
        this.courseService.retrieveAll().subscribe({
            next: courses => {
                this._courses = courses;
                this.filterCourses = this._courses;
            },
            error: err => console.log('Error', err)
        });
        
    }

    deleteById(courseId: number): void {
        this.courseService.deletById(courseId).subscribe({
            next: () => {
                console.log('Deleted with sucess');
                this.retrieveAll();
            },
            error: err => console.log('Error', err)
        })
    }

    set filter(value: String) {
        this._filterBy = value;

        this.filterCourses = this._courses.filter((course: Course) => course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1)
    }

    get filter() {
        return this._filterBy;
    }
}