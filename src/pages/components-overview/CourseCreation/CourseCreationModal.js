/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { courseCreate, getCourseNoCount, getAllCourse } from 'components/redux/CourseCreation/action';
// eslint-disable-next-line react/prop-types
const CourseCreationModal = ({ isModalOpen, setIsModalOpen }) => {
	const dispatch = useDispatch();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();
	const CourseNoCount = useSelector((state) => state.CourseCreationData && state.CourseCreationData.CourseNoCount);
	const handleOk = async () => {
		setConfirmLoading(true);
		form.validateFields()
			.then((values) => {
				console.log(values);
				const formData = new FormData();
				formData.append('course', values.course);
				formData.append('description', values.description);
				formData.append('ticketNo', values.ticketNo);
				dispatch(courseCreate(formData))
					.then((response) => {
						toast.success(response.data.message);
						const controller = new AbortController();
						const signal = controller.signal;
						dispatch(getCourseNoCount());
						dispatch(getAllCourse(0, 10, signal));
						form.resetFields();
						setIsModalOpen(false);
						setConfirmLoading(false);
						form.setFieldsValue({
							ticketNo: `CRS-${(CourseNoCount.count + 1).toString().padStart(5, '0')}`
						});
					})
					.catch((error) => {
						toast.error(error.response.data.message);
						setConfirmLoading(false);
					});
			})
			.catch((errorInfo) => {
				console.log(errorInfo);
				setConfirmLoading(false);
				toast.error('Validation error', errorInfo);
			});
	};
	const handleCancel = () => {
		form.resetFields();
		setIsModalOpen(false);
		setConfirmLoading(false);
	};

	useEffect(() => {
		console.log('isModalOpen', isModalOpen);
		dispatch(getCourseNoCount());
	}, [isModalOpen, dispatch]);

	useEffect(() => {
		if (!isModalOpen) {
			form.setFieldsValue({
				ticketNo: `CRS-${(CourseNoCount.count + 1).toString().padStart(5, '0')}`
			});
		}
	}, [isModalOpen, CourseNoCount, form]);

	return (
		<Modal
			title={'Course Creation Form'}
			open={isModalOpen}
			okText="Submit"
			onOk={handleOk}
			confirmLoading={confirmLoading}
			onCancel={handleCancel}
			width={600}
			className="text-arul"
			sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
		>
			<Divider />
			<Form form={form}>
				<Form.Item
					label="course ID."
					name="ticketNo"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="Enter Course No" style={{ height: '40px' }} readOnly />
				</Form.Item>
				<Form.Item
					label="Course"
					name="course"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="Enter Course" style={{ height: '40px' }} />
				</Form.Item>
				<Form.Item
					label="Course Description"
					name="description"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="Enter Description" style={{ height: '100px', verticalAlign: 'top', textAlign: 'left' }} />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default CourseCreationModal;
