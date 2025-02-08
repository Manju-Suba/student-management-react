/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { courseDataUpdate, getAllCourse } from 'components/redux/CourseCreation/action';
// eslint-disable-next-line react/prop-types
const CourseEditModal = ({ editCourse, StatusType, isEditModalOpen, setIsEditModalOpen }) => {
	const dispatch = useDispatch();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [formEdit] = Form.useForm();
	const handleOk = async () => {
		if (StatusType == 'Edit') {
			setConfirmLoading(true);
			formEdit
				.validateFields()
				.then((values) => {
					const formData = new FormData();
					formData.append('course_id', values.course_id);
					formData.append('course', values.course);
					formData.append('description', values.description);
					dispatch(courseDataUpdate(editCourse.id, formData))
						.then((response) => {
							toast.success(response.data.message);
							const controller = new AbortController();
							const signal = controller.signal;
							dispatch(getAllCourse(0, 10, signal));
							formEdit.resetFields();
							setIsEditModalOpen(false);
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
			formEdit.setFieldsValue({
				course_id: editCourse.course_id,
				course: editCourse.course,
				description: editCourse.description
			});
		}
	}, [isEditModalOpen, dispatch, formEdit, editCourse]);

	return (
		<Modal
			title={'Course ' + StatusType}
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
					label="Course ID"
					name="course_id"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="Enter Course ID" style={{ height: '40px' }} readOnly />
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
					label="Description"
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
export default CourseEditModal;
