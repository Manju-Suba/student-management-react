/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { studentCreate, getAllStudentRecord } from 'components/redux/StudentCreation/action';
import { getAllCourse } from 'components/redux/CourseCreation/action';

const StudentCreationModal = ({ isModalOpen, setIsModalOpen }) => {
	const dispatch = useDispatch();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const CourseDetails = useSelector((state) => state.CourseCreationData && state.CourseCreationData.Course);
	
	const [form] = Form.useForm();
	const { Option } = Select;
	const handleOk = async () => {
		setConfirmLoading(true);
		form.validateFields()
			.then((values) => {
				const formData = new FormData();
				formData.append('name', values.name);
				formData.append('age', values.age);
				formData.append('phone_no', values.phone_no);
				formData.append('qualification', values.qualification);
				formData.append('course', values.course);
				dispatch(studentCreate(formData))
					.then((response) => {

						if(response.data.status == 200){
							toast.success(response.data.message);
							const controller = new AbortController();
							const signal = controller.signal;
							dispatch(getAllStudentRecord(signal));
							form.resetFields();
							setIsModalOpen(false);
							setConfirmLoading(false);
						}else{
							toast.error(response.data.error);
							setConfirmLoading(false);
						}
						
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
		dispatch(getAllCourse());
	}, [isModalOpen, dispatch]);

	return (
		<Modal
			title={'Student Form'}
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
					label="Full Name"
					name="name"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="Enter Full Name" style={{ height: '40px' }} />
				</Form.Item>
				<Form.Item
					label="Age"
					name="age"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="Enter Age" style={{ height: '40px' }} />
				</Form.Item>
				<Form.Item
					label="Phone No."
					name="phone_no"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="Enter Phone Number" style={{ height: '40px' }} />
				</Form.Item>
				<Form.Item
					label="Qualification"
					name="qualification"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="Enter Qualification" style={{ height: '40px' }} />
				</Form.Item>
				<Form.Item
					label="Select Course"
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
			</Form>
		</Modal>
	);
};
export default StudentCreationModal;
