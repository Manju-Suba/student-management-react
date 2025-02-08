// master - business
import { combineReducers } from 'redux';
import menu from '../../store/reducers/menu';
import CourseCreation from './CourseCreation/reducer';
import StudentData from './StudentCreation/reducer';
import ScheduledData from './TrainingSchedule/reducer';

const reducers = combineReducers({
	menu,
	CourseCreationData: CourseCreation,
	StudentListData: StudentData,
	ScheduledListData: ScheduledData
});

export default reducers;
