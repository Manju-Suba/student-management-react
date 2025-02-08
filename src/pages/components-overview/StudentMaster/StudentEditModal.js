/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { studentDataUpdate, getAllStudentRecord } from 'components/redux/StudentCreation/action';
import { getAllCourse } from 'components/redux/CourseCreation/action';
// eslint-disable-next-line react/prop-types

const StudentEditModal = ({ editStudent, StatusType, isEditModalOpen, setIsEditModalOpen }) => {
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
					formData.append('name', values.name);
					formData.append('age', values.age);
					formData.append('phone_no', values.phone_no);
					formData.append('qualification', values.qualification);
					formData.append('course', values.course);
					dispatch(studentDataUpdate(editStudent.id, formData))
						.then((response) => {
							if(response.data.status == 200){
								toast.success(response.data.message);
								const controller = new AbortController();
								const signal = controller.signal;
								dispatch(getAllStudentRecord(signal));
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
				name: editStudent.name,
				age: editStudent.age,
				phone_no: editStudent.phone_no,
				qualification: editStudent.qualification,
				course: editStudent.course.course
			});
		}
	}, [isEditModalOpen, dispatch, formEdit, editStudent]);

	return (
		<Modal
			title={'Asset Ticket ' + StatusType}
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
					label="Student Name"
					name="name"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="Enter Name" style={{ height: '40px' }} />
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
					<Input placeholder="Enter Phone no." style={{ height: '40px' }} />
				</Form.Item>
				<Form.Item
					label="Qualification"
					name="qualification"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="Enter Your Qualification" style={{ height: '40px' }} />
				</Form.Item>
				<Form.Item
					label="Courses"
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
export default StudentEditModal;
