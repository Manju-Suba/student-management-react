import { Card } from '../../../node_modules/@mui/material/index';
import AllStudentDetails from './StudentMaster/AllStudentDetails';
import ComponentSkeleton from './ComponentSkeleton';

const StudentMaster = () => {
	return (
		<ComponentSkeleton>
			<Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
				<AllStudentDetails />
			</Card>
		</ComponentSkeleton>
	);
};

export default StudentMaster;
