import { Card } from '../../../node_modules/@mui/material/index';
import AllCourses from './CourseCreation/AllCourses';
// import Assetlistheader from './Assetlist/Assetlistheader';
import ComponentSkeleton from './ComponentSkeleton';

const CourseCreation = () => {
	return (
		<ComponentSkeleton>
			<Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
				<AllCourses />
			</Card>
		</ComponentSkeleton>
	);
};

export default CourseCreation;
