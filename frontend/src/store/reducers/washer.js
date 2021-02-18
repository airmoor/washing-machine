import * as actionTypes from '../actions/actionTypes';

const initialState = {
	washers: [],
	washer: {}
};

const reducer = (state = initialState, action) => {

	const { type } = action;

	switch (type) {
		case actionTypes.GET_WASHERS:
			return { ...state, washers: [...action.washers] };
		case actionTypes.GET_WASHER:
			return { ...state, washer: {...action.washer} };
		case actionTypes.UPDATE_WASHER:
			return { ...state, washer: {...action.washer} };
		default: return state;
	}
};

export default reducer;
