import React, { useState, useRef } from 'react';
import { Space, Table, Button, Popconfirm } from 'antd';
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
import { getAllCourse, deleteCourse } from 'components/redux/CourseCreation/action';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box } from '@mui/material';
//Select Dropdown
import CustomSelect from '../CustomSelect';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import { PlusOutlined } from '@ant-design/icons';
//import style css
import '../../../menu-items/style.css';
import CourseCreationModal from './CourseCreationModal';
import CourseEditModal from './CourseEditModal';
import { toast } from 'react-toastify';

const AllCourses = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [selectAll, setSelectAll] = React.useState(false);
	const [selectedRows, setSelectedRows] = React.useState([]);
	const search = useRef(false);
	const searchValue = useRef('');
	const [pageNo, setPageNo] = useState();
	const [pageSize, setPageSize] = useState(10);
	const queryParams = new URLSearchParams(location.search);
	const AllCourse = useSelector((state) => state.CourseCreationData );
	const AssetListcount = useSelector(
		(state) => state.CourseCreationData && state.CourseCreationData.Course && state.CourseCreationData.Course.assetTicketCount
	);
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
	const [editCourseRecord, setEditCourseRecord] = React.useState([]);
	const [statusType, setStatusType] = React.useState();
	const courseList = AllCourse?.Course || [];

	const getAllCourseData = async (pagenumber, Size) => {
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			const paagereduce = pagenumber - 1;
			await dispatch(
				getAllCourse( paagereduce, Size, signal)
			);
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	// for datatable search start
	// const handleSearchChange = (event) => {
	// 	searchValue.current = event.target.value;
	// 	if (event.target.value != '') {
	// 		search.current = true;
	// 	} else {
	// 		search.current = false;
	// 	}
	// 	setPageNo(1);
	// 	getAllCourseData(1, pageSize);
	// };

	const handleStatusModal = () => {
		setIsModalOpen(true);
	};
	const handleEditModal = (record, status) => {
		setEditCourseRecord(record);
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

	const dataWithSerialNumbers = addSerialNumbers(courseList);

	const getpagerecord = (pageNumber, pageSize) => {
		setPageNo(pageNumber);
		setPageSize(pageSize);
	};
	
	const handleConfirm = (record) => {
		dispatch(deleteCourse(record.id))
			.then((response) => {
				if(response.data.status == 200){
					toast.success(response.data.message);
					getAllCourseData(1, pageSize);
				}else{
					toast.error(response.data.message);
				}
				
			})
			.catch((error) => {
				toast.error(error);
			});
	};

	const handleCancel = () => {
		getAllCourseData(1, pageSize);
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
			dataIndex: 'course_id',
			key: 'course_id',
			title: <span className="table-hd-fs">Course ID</span>,
			sorter: {
				compare: (a, b) => a.course_id.localeCompare(b.course_id),
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

			dataIndex: 'course',
			key: 'course',
			sorter: {
				compare: (a, b) => a.course.localeCompare(b.course),
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
			title: <span className="table-hd-fs">Description</span>,

			dataIndex: 'description',
			key: 'description',
			sorter: {
				compare: (a, b) => a.description.localeCompare(b.description),
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
								title="Delete the Course"
								description="Are you sure to delete this course?"
								onConfirm={() =>  handleConfirm(record)}
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
		getAllCourseData(pageNo, pageSize);
	}, [dispatch, pageNo, pageSize]);

	return (
		<>
			<Container maxWidth="xl" sx={{ height: 'auto', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
				<Toolbar disableGutters sx={{ height: '50%' }}>
					<Grid item container spacing={2} columns={16}>
						{/* <Grid item lg={3} sm={5}>
							<TextField
								name="asset"
								type={'text'}
								placeholder="search "
								className="search-input-bg"
								sx={{ border: 'none' }}
								InputProps={{
									style: { width: '100%', height: '33px', color: '#C7C7C7', bgcolor: '#FBFBFB' },
									startAdornment: (
										<IconButton aria-label="Toggle password visibility" edge="start">
											<SearchSharpIcon sx={{ color: '#C7C7C7', fontSize: '18px', fontWeight: '700' }} />
										</IconButton>
									)
								}}
								value={searchValue.current}
								onChange={handleSearchChange}
							/>
						</Grid> */}


						<Grid item lg={16} sm={16}>
							<Box display="flex" justifyContent="flex-end">
								<Button
									type="primary"
									icon={<PlusOutlined />}
									style={{ height: '33px' }}
									onClick={() => handleStatusModal()}
								>
									Create New Course
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
			<div className="align-center-data">
				<Pagination
					defaultCurrent={pageNo}
					total={AssetListcount}
					current={pageNo}
					pageSize={pageSize}
					onChange={getpagerecord}
					hideOnSinglePage={true}
				/>
			</div>

			<CourseCreationModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

			<CourseEditModal
				editCourse={editCourseRecord}
				StatusType={statusType}
				isEditModalOpen={isEditModalOpen}
				setIsEditModalOpen={setIsEditModalOpen}
			/>
		</>
	);
};

export default AllCourses;
