import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaPlus, FaEllipsisV, FaUserCircle, FaTimes } from "react-icons/fa";

const WarRoom = () => {
	const { darkMode } = useTheme();
	const [tasks, setTasks] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newIncident, setNewIncident] = useState({
		title: "",
		description: "",
		priority: "Critical",
		assignees: "",
		dueDate: "",
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// Close modal on Escape key press
		const handleEscape = (e) => {
			if (e.key === "Escape") {
				setIsModalOpen(false);
			}
		};
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, []);

	const getPriorityColor = (priority) => {
		switch (priority) {
			case "Critical":
				return "bg-red-500 bg-opacity-10 text-red-700 dark:bg-red-500 dark:bg-opacity-30 border border-red-700";
			case "Moderate":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
			case "Low":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewIncident((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newIncident.title || !newIncident.description) {
			alert("Please fill all required fields!");
			return;
		}
		setLoading(true);
		const newTask = {
			id: tasks.length + 1,
			title: newIncident.title,
			description: newIncident.description,
			status: "New",
			dueDate: newIncident.dueDate || "Not specified",
			priority: newIncident.priority,
			assignees: newIncident.assignees
				? [newIncident.assignees]
				: ["Unassigned"],
		};
		setTasks((prevTasks) => [...prevTasks, newTask]);
		setNewIncident({
			title: "",
			description: "",
			priority: "Critical",
			assignees: "",
			dueDate: "",
		});
		setIsModalOpen(false);
		setLoading(false);
	};

	return (
		<div
			className={`p-2 md:p-4 rounded shadow h-full flex flex-col border ${
				darkMode
					? "bg-[#020217] text-white border-gray-800"
					: "bg-white text-black border-gray-300"
			}`}>
			<div className="flex justify-between items-center mb-2 md:mb-4">
				<h2 className="text-lg md:text-lg font-semibold">War Room</h2>
				<button
					onClick={() => setIsModalOpen(true)}
					className={`p-1 md:p-2 rounded-full ${
						darkMode
							? "bg-gray-700 hover:bg-gray-600"
							: "bg-gray-200 hover:bg-gray-300"
					}`}>
					<FaPlus className="text-xs md:text-sm" />
				</button>
			</div>

			{/* Incident List */}
			<div className="space-y-2 md:space-y-4 overflow-y-auto flex-1">
				{tasks.map((task) => (
					<div
						key={task.id}
						className={`p-2 md:p-4 rounded-lg border ${
							darkMode
								? "bg-[#03021E] border-gray-800"
								: "bg-gray-50 border-gray-300"
						}`}>
						<div className="flex items-start justify-between">
							<div className="flex-1 min-w-0">
								<h3 className="font-medium text-sm md:text-base mb-1 truncate">
									{task.title}
								</h3>
								<p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2 md:mb-3 line-clamp-2">
									{task.description}
								</p>
							</div>
							<button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2">
								<FaEllipsisV className="text-xs md:text-sm" />
							</button>
						</div>

						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
							<div className="flex items-center space-x-2">
								<span className="text-xs text-gray-500 dark:text-gray-400">
									Assignees:
								</span>
								<div className="flex items-center">
									<FaUserCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 text-gray-400" />
									<span className="text-xs md:text-sm truncate">
										{task.assignees[0]}
									</span>
								</div>
							</div>

							<div className="flex items-center space-x-2 md:space-x-3">
								<span className="text-xs text-gray-500 dark:text-gray-400 truncate">
									{task.dueDate}
								</span>
								<span
									className={`px-2 py-1 text-xs rounded-md w-16 md:w-20 text-center truncate ${getPriorityColor(
										task.priority
									)}`}>
									{task.priority}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Add Incident Modal */}
			{isModalOpen && (
				<div
					className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
						darkMode ? "bg-black/70" : "bg-gray-500/70"
					}`}>
					<div
						className={`relative w-full max-w-md rounded-lg shadow-xl p-6 ${
							darkMode
								? "bg-[#020217] border border-gray-800"
								: "bg-white border border-gray-300"
						}`}>
						<button
							onClick={() => setIsModalOpen(false)}
							className={`absolute top-4 right-4 p-1 rounded-full ${
								darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
							}`}>
							<FaTimes className="text-gray-500" />
						</button>

						<h3 className="text-lg font-semibold mb-4">Log New Incident</h3>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									className={`block text-sm mb-1 ${
										darkMode ? "text-gray-300" : "text-gray-700"
									}`}>
									Incident Title*
								</label>
								<input
									type="text"
									name="title"
									value={newIncident.title}
									onChange={handleInputChange}
									required
									className={`w-full px-3 py-2 rounded border ${
										darkMode
											? "bg-[#03021E] border-gray-700 focus:border-blue-500"
											: "bg-white border-gray-300 focus:border-blue-500"
									} focus:outline-none focus:ring-1 focus:ring-blue-500`}
								/>
							</div>

							<div>
								<label
									className={`block text-sm mb-1 ${
										darkMode ? "text-gray-300" : "text-gray-700"
									}`}>
									Description*
								</label>
								<textarea
									name="description"
									value={newIncident.description}
									onChange={handleInputChange}
									required
									rows={3}
									className={`w-full px-3 py-2 rounded border ${
										darkMode
											? "bg-[#03021E] border-gray-700 focus:border-blue-500"
											: "bg-white border-gray-300 focus:border-blue-500"
									} focus:outline-none focus:ring-1 focus:ring-blue-500`}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label
										className={`block text-sm mb-1 ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}>
										Priority*
									</label>
									<select
										name="priority"
										value={newIncident.priority}
										onChange={handleInputChange}
										className={`w-full px-3 py-2 rounded border ${
											darkMode
												? "bg-[#03021E] border-gray-700 focus:border-blue-500"
												: "bg-white border-gray-300 focus:border-blue-500"
										} focus:outline-none focus:ring-1 focus:ring-blue-500`}>
										<option value="Critical">Critical</option>
										<option value="Moderate">Moderate</option>
										<option value="Low">Low</option>
									</select>
								</div>

								<div>
									<label
										className={`block text-sm mb-1 ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}>
										Due Date
									</label>
									<input
										type="datetime-local"
										name="dueDate"
										value={newIncident.dueDate}
										onChange={handleInputChange}
										className={`w-full px-3 py-2 rounded border ${
											darkMode
												? "bg-[#03021E] border-gray-700 focus:border-blue-500"
												: "bg-white border-gray-300 focus:border-blue-500"
										} focus:outline-none focus:ring-1 focus:ring-blue-500`}
									/>
								</div>
							</div>

							<div>
								<label
									className={`block text-sm mb-1 ${
										darkMode ? "text-gray-300" : "text-gray-700"
									}`}>
									Assigned To
								</label>
								<input
									type="text"
									name="assignees"
									value={newIncident.assignees}
									onChange={handleInputChange}
									placeholder="Enter assignee name"
									className={`w-full px-3 py-2 rounded border ${
										darkMode
											? "bg-[#03021E] border-gray-700 focus:border-blue-500"
											: "bg-white border-gray-300 focus:border-blue-500"
									} focus:outline-none focus:ring-1 focus:ring-blue-500`}
								/>
							</div>

							<div className="flex justify-end space-x-3 pt-2">
								<button
									type="button"
									onClick={() => setIsModalOpen(false)}
									className={`px-4 py-2 rounded ${
										darkMode
											? "bg-gray-700 hover:bg-gray-600"
											: "bg-gray-200 hover:bg-gray-300"
									}`}>
									Cancel
								</button>
								<button
									type="submit"
									disabled={loading}
									className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
									{loading ? "Logging..." : "Log Incident"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default WarRoom;
