import Constants from '../constants';

const initialState = {
  ownedEvents: [],
  showForm: false,
  formErrors: null,
  fetching: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.EVENTS_FETCHING:
      return { ...state, fetching: true };

    case Constants.EVENTS_RECEIVED:
      return { ...state, ownedEvents: action.ownedEvents, fetching: false };

    case Constants.EVENTS_NEW_EVENT_CREATED:
      return { ...state, ownedEvents: [action.event].concat(state.ownedEvents) };

    case Constants.EVENTS_CREATE_ERROR:
      return { ...state, formErrors: action.errors };

    case Constants.EVENTS_SHOW_FORM:
      return { ...state, showForm: action.show };

    case Constants.EVENTS_RESET:
      return { ...state, showForm: false, formErrors: null, fetching: false };

    default:
      return state;
  }
}
