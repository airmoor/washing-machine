import { combineReducers } from 'redux';
import modeReducer from './mode';
import washerReducer from './washer';

export const rootReducer = combineReducers({
  mode: modeReducer,
  washer: washerReducer,
});
