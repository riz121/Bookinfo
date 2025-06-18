import * as t from "../types";

export const setModalOpen = (isModalOpen) => {
	return {
		type: t.MODAL_OPEN,
		payload: isModalOpen,
	};
};

export const fetchbookinfos = () => {
	return {
		type: t.bookinfo_FETCH_REQUESTED,
	};
};

export const addbookinfo = (bookinfo) => {
	return {
		type: t.bookinfo_ADD_REQUESTED,
		payload: bookinfo,
	};
};

export const updatebookinfo = (bookinfo) => {
	return {
		type: t.bookinfo_UPDATE_REQUESTED,
		payload: bookinfo,
	};
};

export const deletebookinfo = (id) => {
	return {
		type: t.bookinfo_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedbookinfo = (id) => {
	return {
		type: t.bookinfo_SELECTED,
		payload: id,
	};
};

export const setViewMode = (id) => {
	return {
		type: t.bookinfo_SELECTED_VIEW,
		payload: id,
	};
};


