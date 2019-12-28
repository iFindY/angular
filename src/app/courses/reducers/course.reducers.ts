import {compareCourses, Course} from '../model/course';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {CourseActions} from '../action-types';

/**
 * CoursesState is a State which is linked to the courses module.
 * CoursesState is an entity.
 * can create map(ententes) with "entities: {[key:number]: Course}"
 * where "Courses" is the entity(Model) corresponding to the key.
 * EntityState contain a map(dictionary ) of key:object and an array of an natural order.
 */
export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded: boolean // extra state
}

/**
 * adapter is an auxiliary utility which contain all needed CRUD operations.
 * return an empty Courses map and an empty key array.
 */
export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
});

/**
 * define initial courses state linked to the Course entity
 * add extra initial flag
 */
export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded:false
});


export const coursesReducer = createReducer<CoursesState>(

    initialCoursesState,

    on(CourseActions.allCoursesLoaded,
        // state is an entity state with a dictionary and an order array
        // with the adapter.addAll() the state can be easily updated
        // the adapter.addAll() take new stuff and the current state and return a new version
        (state, action) => adapter.addAll(
            action.courses,
            {...state, // create new copy of sate object and override allCoursesLoaded to true
                allCoursesLoaded:true
            })),


    on(CourseActions.courseUpdated, (state, action) =>
        adapter.updateOne(action.update, state) ) // update the state with action.update course object

);


export const {
    selectAll // export only this const from the list
} = adapter.getSelectors(); // returns a list of implemented common selectors and we want to export only the selectAll selector.

