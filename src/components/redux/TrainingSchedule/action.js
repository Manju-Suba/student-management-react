import {
	GET_SCHEDULED_DATA,
	GET_ASSET_TICKET_BY_ID
} from 'components/redux/actionType';
import axiosInstance from '../../../constants/Global';

export const trainingScheduleDetails = (data) => {
	return async () => {
		const response = await axiosInstance.post(`/schedule_create`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};

export const getAllScheduledRecord = ( signal) => {
	return (dispatch) => {
		let url = `/scheduled_data`;
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
					type: GET_SCHEDULED_DATA,
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

export const dataUpdate = (id, data) => {
	return async () => {
		const response = await axiosInstance.post(`/data_update/${id}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	};
};

export const deleteScheduledRecord = (id) => {
	return async () => {
		const response = await axiosInstance.delete(`/detele_schedule_data/${id}`, {
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
