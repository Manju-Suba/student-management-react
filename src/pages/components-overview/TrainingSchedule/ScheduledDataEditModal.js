/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, DatePicker } from 'antd';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { dataUpdate, getAllScheduledRecord } from 'components/redux/TrainingSchedule/action';
import { getAllCourse } from 'components/redux/CourseCreation/action';
import dayjs from "dayjs";

// eslint-disable-next-line react/prop-types

const ScheduledDataEditModal = ({ editData, StatusType, isEditModalOpen, setIsEditModalOpen }) => {
	const dispatch = useDispatch();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [formEdit] = Form.useForm();
	const CourseDetails = useSelector((state) => state.CourseCreationData && state.CourseCreationData.Course);
	const { Option } = Select;
	const handleOk = async () => {
		if (StatusType == 'Edit') {
			setConfirmLoading(true);
			formEdit
				.validateFields()
				.then((values) => {
					const formData = new FormData();
					formData.append('course', values.course);
					formData.append('duration', values.duration);
					formData.append('start_date', values.start_date);
					formData.append('end_date', values.end_date);
					formData.append('shift', values.shift);
					formData.append('hrs_per_day', values.hrs_per_day);
					dispatch(dataUpdate(editData.id, formData))
						.then((response) => {
							if(response.data.status == 200){
								toast.success(response.data.message);
								const controller = new AbortController();
								const signal = controller.signal;
								dispatch(getAllScheduledRecord(signal));
								formEdit.resetFields();
								setIsEditModalOpen(false);
							}else{
								toast.error(response.data.message);
							}
							setConfirmLoading(false);
							
						})
						.catch((error) => {
							toast.error(error);
							setConfirmLoading(false);
						});
				})
				.catch((errorInfo) => {
					console.log(errorInfo);
					setConfirmLoading(false);
					toast.error('Validation error', errorInfo);
				});
		}
	};
	const handleCancel = () => {
		formEdit.resetFields();
		setIsEditModalOpen(false);
		setConfirmLoading(false);
	};

	useEffect(() => {
		if (isEditModalOpen) {
			dispatch(getAllCourse());
			formEdit.setFieldsValue({
				course: editData.course.id,
				duration: editData.duration,
				start_date: editData.start_date ? dayjs(editData.start_date) : null,
  				end_date: editData.end_date ? dayjs(editData.end_date) : null,
				shift: editData.shift,
				hrs_per_day: editData.hrs_per_day
			});
		}
	}, [isEditModalOpen, dispatch, formEdit, editData]);

	return (
		<Modal
			title={'Training Scheduled Data Update Form'}
			open={isEditModalOpen}
			okText="Update"
			onOk={handleOk}
			confirmLoading={confirmLoading}
			onCancel={handleCancel}
			width={600}
			className="text-arul"
			sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
		>
			<Divider />
			<Form form={formEdit}>
				<Form.Item
					label="Choose Course"
					name="course"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Select defaultValue="Choose Course" style={{ height: '40px' }} showSearch>
						{CourseDetails.map((option) => (
							<Option key={option.id} value={option.id}>
								{option.course}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label="Duration"
					name="duration"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="ex: 6 months" style={{ height: '40px' }} />
				</Form.Item>
				<Form.Item
					label="Start Date"
					name="start_date"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<DatePicker 
						format="DD-MM-YYYY" 
						style={{ width: "100%", height: "40px" }} 
					/>
				</Form.Item>
				<Form.Item
					label="End Date"
					name="end_date"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<DatePicker 
						format="DD-MM-YYYY" 
						style={{ width: "100%", height: "40px" }} 
					/>
				</Form.Item>
				<Form.Item
					label="Shift"
					name="shift"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
				>
					<Input placeholder="ex: morning/evening" style={{ height: '40px' }} />
				</Form.Item>
				<Form.Item
					label="Hrs Per Day"
					name="hrs_per_day"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
				>
					<Input placeholder="ex: 5.30" style={{ height: '40px' }} />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default ScheduledDataEditModal;
