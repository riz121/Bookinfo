import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";

import { CheckSVG, CloseSVG } from "@/icons";
import {
	addbookinfo,
	setModalOpen,
	setSelectedbookinfo,
	updatebookinfo,
} from "@/store";
import { useState } from "react";



export function Modal() {
	const [currentPage, setCurrentPage] = useState(1); 
	const {
		register,
		handleSubmit,
		errors,
		reset,
		setValue,
	} = useForm();

	const state = useSelector((state) => state.bookinfo);
	const viewMode = useSelector((state) => state.bookinfo.viewMode);
	const dispatch = useDispatch();

	const closeModal = () => {
		reset();
		dispatch(setModalOpen(false));
		dispatch(setSelectedbookinfo(undefined));
		dispatch({ type: "bookinfo_SELECTED_VIEW", payload: false }); // Reset view mode
	};

	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
		if (state.selectedbookinfo) {
			dispatch(updatebookinfo({ _id: state.selectedbookinfo._id, ...data }));

		} else {
			dispatch(addbookinfo(data));
		}
	};

	useEffect(() => {
		if (state.selectedbookinfo) {
			setValue("title", state.selectedbookinfo.title);
			setValue("isbn", state.selectedbookinfo.isbn);
			setValue("qty", state.selectedbookinfo.qty);
			setValue("author", state.selectedbookinfo.author?.name || "");
		}
	}, [state.selectedbookinfo, setValue]);

	const isReadOnly = state.viewMode;

	return state.isModalOpen
		? ReactDOM.createPortal(
				<div className="modal">
					<div className="modal__content">
						<header className="header modal__header">
							<h1 className="header__h2">
								{state.viewMode
									? <>View <span>Book</span></>
									: state.selectedbookinfo
									? <>Edit <span>Book</span></>
									: <>Add <span>Book</span></>}
							</h1>
							<button
								className="btn btn__compact btn__close"
								onClick={closeModal}
							>
								<CloseSVG />
							</button>
						</header>

						<form
							className="form modal__form"
							onSubmit={handleSubmit(onSubmitHandler)}
							noValidate
						>
							<div className="form__element">
								<label className={cx("label", errors.title && "label--error")}>
									{errors.title ? "Title is required!" : <>Title<span className="label__required">*</span></>}
								</label>
								<input
									type="text"
									name="title"
									placeholder="Title"
									disabled={isReadOnly}
									className={cx("input", errors.title && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__element">
								<label className={cx("label", errors.isbn && "label--error")}>
									{errors.isbn ? "Isbn is required!" : <>Isbn<span className="label__required">*</span></>}
								</label>
								<textarea
									name="isbn"
									placeholder="Isbn"
									disabled={isReadOnly}
									className={cx("area", errors.isbn && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							<div className="form__element">
								<label className={cx("label", errors.qty && "label--error")}>
									{errors.qty ? "Qty is required!" : <>Qty<span className="label__required">*</span></>}
								</label>
								<input
									type="text"
									name="qty"
									placeholder="Qty"
									disabled={isReadOnly}
									className={cx("input", errors.qty && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__element">
								<label className={cx("label", errors.author && "label--error")}>
									{errors.author ? "Author is required!" : <>Author<span className="label__required">*</span></>}
								</label>
								<input
									type="text"
									name="author"
									placeholder="Author"
									disabled={isReadOnly}
									className={cx("input", errors.author && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__action">
								<button
									className="btn btn__icon btn__cancel"
									type="button"
									onClick={closeModal}
								>
									<CloseSVG /> Close
								</button>
								{!viewMode && (
		<button className="btn btn__primary btn__icon" type="submit">
			<CheckSVG /> {state.selectedbookinfo ? "Update" : "Submit"}
		</button>
	)}
							</div>
						</form>
					</div>
				</div>,
				document.body
			)
		: null;
}
