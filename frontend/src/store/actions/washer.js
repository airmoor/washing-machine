import * as actionTypes from './actionTypes';
import WasherDataService from "../../services/washer.service";
// Actions

export const getWashersAC = (washers) => ({
	type: actionTypes.GET_WASHERS,
	washers: washers.data
});

export const getWasherAC = (washer) => ({
	type: actionTypes.GET_WASHER,
	washer: washer.data
});

export const setWasherAC = (washer) => ({
	type: actionTypes.UPDATE_WASHER,
	washer: washer.data
});

export const createWasherAC = (washer) => ({
	type: actionTypes.CREATE_WASHER,
	washer: washer.data
});

// Dispatchers

export const getWashers = () => {
	return (dispatch) => {
		return WasherDataService.getAll()
			.then(response => dispatch(getWashersAC(response)))
			.then(response => console.log('response', response))
			.catch(e => {
				console.log(e);
			});
	};
};

export const getWasher = (id) => {
	return (dispatch) => {
		return WasherDataService.get(id)
			.then(response => dispatch(getWasherAC(response)))
			.then(response => {
				console.log('response', response);
			})
			.catch(e => {
				console.log(e);
			});
	};
};

export const deleteWasher = (id) => {
	return (dispatch) => {
		return WasherDataService.delete(id)
			.then(response => {
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	};
};

export const updateWasher = (id, data) => {
	return (dispatch) => {
		return WasherDataService.update(id, data)
			.then(response => {
				console.log('WasherDataService response', response)
				dispatch(setWasherAC(response))
			})
			.catch(e => {
				console.log(e);
			});
	};
};

export const createWasher = (data) => {
	return (dispatch) => {
		return WasherDataService.create(data)
			.then(response => {
				dispatch(createWasherAC(response))
			})
			.catch(e => {
				console.log('e', e, e.message);
			});
	};
};