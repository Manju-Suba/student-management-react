import React, { useState, useRef } from 'react';
import { Space, Table, Button, Checkbox, Tag, Popconfirm, Popover } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { useLocation } from 'react-router-dom';
// image
import { getAllScheduledRecord, deleteScheduledRecord } from 'components/redux/TrainingSchedule/action';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box } from '@mui/material';
//Select Dropdown
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import { PlusOutlined } from '@ant-design/icons';
//import style css
import '../../../menu-items/style.css';
import ScheduleCreationModal from './ScheduleCreationModal';
import ScheduledDataEditModal from './ScheduledDataEditModal';
import { toast } from 'react-toastify';

const ScheduledData = () => {
	const dispatch = useDispatch();
	const [pageNo, setPageNo] = useState();
	const [pageSize, setPageSize] = useState(10);
	const AllData = useSelector((state) => state.ScheduledListData );
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
	const [editRecord, setEditRecord] = React.useState([]);
	const [statusType, setStatusType] = React.useState();
	const scheduledList = AllData?.ScheduleData || [];

	const getAllData = async () => {
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			await dispatch(
				getAllScheduledRecord(signal)
			);
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleStatusModal = () => {
		setIsModalOpen(true);
	};
	const handleEditModal = (record, status) => {
		setEditRecord(record);
		setStatusType(status);
		setIsEditModalOpen(true);
	};

	const addSerialNumbers = (data) => {
		return data.map((item, index) => {
			let paagereduce;
			if (pageNo == 0) {
				paagereduce = pageNo;
			} else {
				if (pageNo == undefined) {
					paagereduce = 0;
				} else {
					paagereduce = pageNo - 1;
				}
			}

			const numberstart = paagereduce * pageSize;
			return {
				...item,
				sno: numberstart + index + 1
			};
		});
	};

	const dataWithSerialNumbers = addSerialNumbers(scheduledList);

	const getpagerecord = (pageNumber, pageSize) => {
		setPageNo(pageNumber);
		setPageSize(pageSize);
	};
	
	const handleConfirm = (record) => {
		dispatch(deleteScheduledRecord(record.id))
			.then((response) => {
				if(response.data.status == 200){
					toast.success(response.data.message);
					getAllData();
				}else{
					toast.error(response.data.message);
				}
				
			})
			.catch((error) => {
				toast.error(error);
			});
	};

	const handleCancel = () => {
		getAllData();
	};
	
	const columns = [
		{
			title: <span className="table-hd-fs">SI.No</span>,
			dataIndex: 'sno',
			key: 'sno',
			sorter: {
				compare: (a, b) => a.sno - b.sno,
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			}
		},
		{
			title: <span className="table-hd-fs">Course</span>,
			key: 'course.course',
			render: (text, record) => record.course ? record.course.course : 'N/A',
		},
		{
			title: <span className="table-hd-fs">Duration</span>,
			dataIndex: 'duration',
			key: 'duration',
			sorter: {
				compare: (a, b) => a.duration.localeCompare(b.duration),
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			}
		},
		{
			title: <span className="table-hd-fs">Start Date</span>,
			dataIndex: 'start_date',
			key: 'start_date',
			sorter: {
				compare: (a, b) => a.start_date.localeCompare(b.start_date),
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			}
		},
		{
			title: <span className="table-hd-fs">End date</span>,
			dataIndex: 'end_date',
			key: 'end_date',
			sorter: {
				compare: (a, b) => a.end_date.localeCompare(b.end_date),
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			}
		},
		{
			title: <span className="table-hd-fs">Shift</span>,
			dataIndex: 'shift',
			key: 'shift',
			sorter: {
				compare: (a, b) => a.shift.localeCompare(b.shift),
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			}
		},
		{
			title: <span className="table-hd-fs">Hrs Per Day</span>,
			dataIndex: 'hrs_per_day',
			key: 'hrs_per_day',
			sorter: {
				compare: (a, b) => a.hrs_per_day.localeCompare(b.hrs_per_day),
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			}
		},
		{
			title: <span className="table-hd-fs">Action</span>,
			key: 'action',
			render: (_, record) => {
				return (
					<Space>
						<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
							<div
								role="button"
								className="btn-scrap-transfer"
								tabIndex="0"
								onClick={() => handleEditModal(record, 'Edit')}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										handleEditModal(record, 'Edit');
									}
								}}
							>
								<EditSharpIcon sx={{ fontSize: '16px' }} />
							</div>
						</Grid>
						<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
							<Popconfirm
								title="Delete the Record"
								description="Are you sure to delete this record?"
								onConfirm={() => handleConfirm(record)}
								onCancel={handleCancel}
								okText="Yes"
								cancelText="No"
							>
								<div role="button" className="btn-scrap-transfer" tabIndex="0">
									<DeleteIcon sx={{ fontSize: '16px' }} />
								</div>
							</Popconfirm>
						</Grid>
					</Space>
				);
			}
		}
	];

	React.useEffect(() => {
		getAllData();
	}, [dispatch]);

	return (
		<>
			<Container maxWidth="xl" sx={{ height: 'auto', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
				<Toolbar disableGutters sx={{ height: '50%' }}>
					<Grid item container spacing={2} columns={16}>
						<Grid item lg={16} sm={16}>
							<Box display="flex" justifyContent="flex-end">
								<Button
									type="primary"
									icon={<PlusOutlined />}
									style={{ height: '33px' }}
									onClick={() => handleStatusModal()}
								>
									Course Schedule
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Toolbar>
			</Container>
			<Table
				className="table-hd table-asset-creation"
				columns={columns}
				dataSource={dataWithSerialNumbers}
				pagination={false}
				loading={loading}
				showSorterTooltip={false}
			/>

			<ScheduleCreationModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

			<ScheduledDataEditModal
				editData={editRecord}
				StatusType={statusType}
				isEditModalOpen={isEditModalOpen}
				setIsEditModalOpen={setIsEditModalOpen}
			/>
		</>
	);
};

export default ScheduledData;
