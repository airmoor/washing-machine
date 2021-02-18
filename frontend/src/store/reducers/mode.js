import * as actionTypes from '../actions/actionTypes';

const initialState = {
	modes: [],
	mode: {}
};

const reducer = (state = initialState, action) => {

	const { type } = action;

	switch (type) {

		case actionTypes.GET_MODES:
			return { ...state, modes: [...action.modes] };
		case actionTypes.GET_MODE:
			return { ...state, mode: {...action.mode} };
		case actionTypes.UPDATE_MODE:
			return { ...state, mode: {...action.mode} };
		case actionTypes.DELETE_MODE:
			return { ...state, modes: state.modes.slice(1) };
		default: return state
	}
};

export default reducer;
