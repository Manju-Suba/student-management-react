import {
	GET_STUDENT_DATA,
	GET_ASSET_TICKET_BY_ID
} from 'components/redux/actionType';
import axiosInstance from '../../../constants/Global';

export const studentCreate = (data) => {
	return async () => {
		const response = await axiosInstance.post(`/student_create`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};

export const getAllStudentRecord = ( signal) => {
	return (dispatch) => {
		let url = `/student/fetch_all`;
		axiosInstance
			.get(url, {
				signal: signal,
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				console.log(res.data.data.data);
				dispatch({
					type: GET_STUDENT_DATA,
					payload: res.data.data.data
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const getAssetTicketById = (id) => {
	return (dispatch) => {
		let url = `/asset-ticket/get-by-id?id=${id}`;

		axiosInstance
			.get(url, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				dispatch({
					type: GET_ASSET_TICKET_BY_ID,
					payload: res.data.data
				});
			})
			.catch((error) => {
				dispatch({
					type: GET_ASSET_TICKET_BY_ID,
					payload: []
				});
				console.log('error', error);
			});
	};
};

export const studentDataUpdate = (id, data) => {
	return async () => {
		const response = await axiosInstance.post(`/student_data_update/${id}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};

export const deleteStudent = (id) => {
	return async () => {
		const response = await axiosInstance.delete(`/detele_student/${id}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	};
};

export const statusUpdate = (id, status) => {
	return async () => {
		const response = await axiosInstance.put(`/asset-ticket/staus-update?id=${id}&status=${status}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	};
};
