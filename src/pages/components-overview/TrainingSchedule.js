import { Card } from '../../../node_modules/@mui/material/index';
import ScheduledData from './TrainingSchedule/ScheduledData';
import ComponentSkeleton from './ComponentSkeleton';

const TrainingSchedule = () => {
	return (
		<ComponentSkeleton>
			<Card sx={{ height: '100%', width: '100%', overflow: 'auto', boxShadow: 'none', borderRadius: '10px' }}>
				<ScheduledData />
			</Card>
		</ComponentSkeleton>
	);
};

export default TrainingSchedule;
