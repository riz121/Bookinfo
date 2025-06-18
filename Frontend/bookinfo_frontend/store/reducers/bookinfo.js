import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	bookinfoList: [],
	selectedbookinfo: null,
	isModalOpen: false,
	viewMode: false,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.MODAL_OPEN:
			return {
				...state,
				isModalOpen: action.payload,
			};
		case t.bookinfo_FETCH_SUCCEEDED:
			return {
				...state,
				bookinfoList: action.payload,
			};
		case t.bookinfo_ADD_SUCCEEDED:
			return {
				...state,
				bookinfoList: [action.payload, ...state.bookinfoList],
			};
		case t.bookinfo_UPDATE_SUCCEEDED:
			const updatedbookinfo = state.bookinfoList.map((bookinfo) => {
				if (bookinfo._id === action.payload._id) {
					return {
						...bookinfo,
						title: action.payload.title,
						isbn: action.payload.isbn,
						qty: action.payload.qty,
						author: action.payload.author,
					};
				}
				return bookinfo;
			});

			return { ...state, bookinfoList: updatedbookinfo };
		case t.bookinfo_DELETE_SUCCEEDED:
			const newbookinfoList = state.bookinfoList.filter(
				(bookinfo) => bookinfo._id !== action.payload
			);
			return {
				...state,
				bookinfoList: newbookinfoList,
			};
		case t.bookinfo_SELECTED:
			return {
				...state,
				selectedbookinfo: action.payload,  // payload should be full object
			  };
		case t.bookinfo_SELECTED_VIEW:
			return {
				...state,
				viewMode: action.payload, 
			  };
		
		default:
			return state;

	}
};

export default mainReducer;
