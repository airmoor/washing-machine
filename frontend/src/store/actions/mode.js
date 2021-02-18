import * as actionTypes from './actionTypes';
import ModeDataService from "../../services/mode.service";
// Actions

export const getModesAC = (modes) => ({
	type: actionTypes.GET_MODES,
	modes: modes.data
});

export const getModeAC = (mode) => ({
	type: actionTypes.GET_MODE,
	mode: mode.data
});

export const setModeAC = (mode) => ({
	type: actionTypes.UPDATE_MODE,
	mode: mode.data
});

export const createModeAC = (mode) => ({
	type: actionTypes.CREATE_MODE,
	mode: mode.data
});



// Dispatchers
export const getModes = () => {
	return (dispatch) => {
		return ModeDataService.getAll()
			.then(response => dispatch(getModesAC(response)))
			.catch(e => {
				console.log(e);
			});
	};
};

export const getMode = (id) => {
	return (dispatch) => {
		return ModeDataService.get(id)
			.then(response => dispatch(getModeAC(response)))
			.then(response => {
				console.log('getMode response: ', response);
			})
			.catch(e => {
				console.log('getModeAC error: ',e);
			});
	};
};

export const deleteMode = (id) => {
	return (dispatch) => {
		return ModeDataService.delete(id)
			.then(response => {
				console.log(response.data);
			}).then((res) => {
				getModes()
			})
			.catch(e => {
				console.log(e);
			});
	};
};


export const updateMode = (id, data) => {
	return (dispatch) => {
		return ModeDataService.update(id, data)
			.then(response => {
				dispatch(setModeAC(response))
			})
			.catch(e => {
				console.log(e);
			});
	};
};

export const createMode = (data) => {
	return (dispatch) => {
		return ModeDataService.create(data)
			.then(response => {
				dispatch(createModeAC(response))
			})
			.catch(e => {
				console.log('create mode error', e);
			});
	};
};


