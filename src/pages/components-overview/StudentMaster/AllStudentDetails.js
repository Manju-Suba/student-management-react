import React, { useState, useRef } from 'react';
import { Space, Table, Button, Checkbox, Tag, Popconfirm, Popover } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { useLocation } from 'react-router-dom';
import { Pagination } from 'antd';
// image
import { getAllStudentRecord, statusUpdate, deleteStudent } from 'components/redux/StudentCreation/action';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box } from '@mui/material';
//Select Dropdown
import CustomSelect from '../CustomSelect';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import { PlusOutlined } from '@ant-design/icons';
//import style css
import '../../../menu-items/style.css';
import StudentCreationModal from './StudentCreationModal';
import StudentEditModal from './StudentEditModal';
import { toast } from 'react-toastify';

const AllStudentDetails = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [pageNo, setPageNo] = useState();
	const [pageSize, setPageSize] = useState(10);
	const AllStudents = useSelector((state) => state.StudentListData );
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
	const [studentEditRecord, setStudentEditRecord] = React.useState([]);
	const [statusType, setStatusType] = React.useState();
	const studentList = AllStudents?.StudentData || [];

	const getAllStudentData = async () => {
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			await dispatch(
				getAllStudentRecord(signal)
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
		setStudentEditRecord(record);
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

	const dataWithSerialNumbers = addSerialNumbers(studentList);

	const getpagerecord = (pageNumber, pageSize) => {
		setPageNo(pageNumber);
		setPageSize(pageSize);
	};
	
	const handleConfirm = (record) => {
		dispatch(deleteStudent(record.id))
			.then((response) => {
				if(response.data.status == 200){
					toast.success(response.data.message);
					getAllStudentData();
				}else{
					toast.error(response.data.message);
				}
				
			})
			.catch((error) => {
				toast.error(error);
			});
	};

	const handleCancel = () => {
		getAllStudentData();
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
			dataIndex: 'name',
			key: 'name',
			title: <span className="table-hd-fs">Name</span>,
			sorter: {
				compare: (a, b) => a.name.localeCompare(b.name),
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
			title: <span className="table-hd-fs">Age</span>,

			dataIndex: 'age',
			key: 'age',
			sorter: {
				compare: (a, b) => a.age.localeCompare(b.age),
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
			title: <span className="table-hd-fs">Qualification</span>,
			dataIndex: 'qualification',
			key: 'qualification',
			sorter: {
				compare: (a, b) => a.qualification.localeCompare(b.qualification),
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
		getAllStudentData();
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
									Add Student
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

			<StudentCreationModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

			<StudentEditModal
				editStudent={studentEditRecord}
				StatusType={statusType}
				isEditModalOpen={isEditModalOpen}
				setIsEditModalOpen={setIsEditModalOpen}
			/>
		</>
	);
};

export default AllStudentDetails;
