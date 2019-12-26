import {compareCourses, Course} from '../model/course';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {CourseActions} from '../action-types';


export interface CoursesState extends EntityState<Course> { // CoursesState is  an entity 
    allCoursesLoaded: boolean // extra state
}


export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
});


export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded:false 
});


export const coursesReducer = createReducer(

    initialCoursesState,

    on(CourseActions.allCoursesLoaded,
        (state, action) => adapter.addAll(
            action.courses,
            {...state, // create new copy of sate object and override allCoursesLoaded to true 
                allCoursesLoaded:true
            })),


    on(CourseActions.courseUpdated, (state, action) =>
        adapter.updateOne(action.update, state) ) // update the state with  action.update course object 

);


export const { 
    selectAll
} = adapter.getSelectors(); // returns a list of selectors and we want to export only the selectAll selector.

