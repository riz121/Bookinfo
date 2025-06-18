import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG,EyeSVG } from "@/icons";
import {
	deletebookinfo,
	fetchbookinfos,
	setModalOpen,
	setSelectedbookinfo,
	setViewMode
	
} from "@/store";
import { useEffect, useState } from "react";

export function Table() {
	const state = useSelector((state) => state.bookinfo);
	const dispatch = useDispatch();

	// State for filters and pagination
	const [titleFilter, setTitleFilter] = useState("");
	const [authorFilter, setAuthorFilter] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 10;

	useEffect(() => {
		dispatch(fetchbookinfos());
	}, [dispatch]);

	// Filtered data
	const filteredList = (state.bookinfoList || []).filter(book => 
		book && 
		book.title?.toLowerCase().includes(titleFilter.toLowerCase()) &&
		book.author?.name?.toLowerCase().includes(authorFilter.toLowerCase())
	  );
	// Pagination logic
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = filteredList.slice(indexOfFirstRecord, indexOfLastRecord);
	const totalPages = Math.ceil(filteredList.length / recordsPerPage);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			{/* Filter Section */}
			<div className="flex gap-4 mb-4">
				<input
					type="text"
					placeholder="Filter by Title"
					value={titleFilter}
					onChange={(e) => {
						setTitleFilter(e.target.value);
						setCurrentPage(1);
					}}
					className="input"
				/>
				<input
					type="text"
					placeholder="Filter by Author"
					value={authorFilter}
					onChange={(e) => {
						setAuthorFilter(e.target.value);
						setCurrentPage(1);
					}}
					className="input"
				/>
			</div>

			{/* Table */}
			<table className="table">
				<thead className="table__head">
					<tr>
						<th>Title</th>
						<th>Isbn</th>
						<th>Qty</th>
						<th>Author</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody className="table__body">
					{currentRecords.length > 0 ? (
						currentRecords.map((book) => (
							<tr key={book._id}>
								<td>{book.title}</td>
								<td>{book.isbn}</td>
								<td>{book.qty}</td>
								<td>{book.author?.name || "No Author"}</td>
								<td className="flex gap-2">
									<button
										className="btn btn__compact btn__view"
										onClick={() => {
											dispatch(setSelectedbookinfo(book));
											dispatch({ type: "bookinfo_SELECTED_VIEW", payload: true });
											dispatch(setModalOpen(true));
										}}
									>
										<EyeSVG />
									</button>
									<button
										className="btn btn__compact btn__edit"
										onClick={() => {
											dispatch(setSelectedbookinfo(book));
											dispatch(setModalOpen(true));
											
												
										}}
									>
										<PencilSVG />
									</button>
									<button
										className="btn btn__compact btn__delete"
										onClick={() => {
											dispatch(deletebookinfo(book._id));
											setTimeout(() => {
											  window.location.reload();
											}, 500); // adjust delay as needed
										  }}
										>
										<TrashSVG />
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={4}>No matching books found...</td>
						</tr>
					)}
				</tbody>
			</table>

			{/* Pagination */}
			<div className="pagination mt-4 flex gap-2">
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						key={i + 1}
						onClick={() => paginate(i + 1)}
						className={`btn btn__compact ${currentPage === i + 1 ? 'btn__primary' : ''}`}
					>
						{i + 1}
					</button>
				))}
			</div>
		</>
	);
}

