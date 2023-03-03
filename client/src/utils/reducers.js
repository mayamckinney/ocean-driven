import { useReducer } from 'react';
import {
  UPDATE_BOATS,
  ADD_TO_USER,
} from './actions';

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducer = (state, action) => {
  switch (action.type) {
   
    case UPDATE_BOATS:
      return {
        ...state,
        boats: [...action.boats],
      };

    case ADD_TO_USER:
      return {
        ...state,

      };

    // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
    // This saves us from a crash.
    default:
      return state;
  }
};

export function useBoatReducer(initialState) {
  return useReducer(reducer, initialState);
}
