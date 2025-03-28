// src/components/modals/AddTaskModal.jsx
import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { FaTimes } from "react-icons/fa";

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
	const { darkMode } = useTheme();
	const [taskData, setTaskData] = useState({
		title: "",
		priority: "medium",
		due: "",
		completed: false,
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setTaskData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newTask = {
			...taskData,
			id: Date.now(), // Generate unique ID
			due: taskData.due || "No deadline set",
		};
		onAddTask(newTask);
		setTaskData({
			title: "",
			priority: "medium",
			due: "",
			completed: false,
		});
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
				darkMode ? "bg-black/70" : "bg-gray-500/70"
			}`}
			style={{ backdropFilter: "blur(2px)" }}>
			<div
				className={`relative w-full max-w-md rounded-lg shadow-xl p-6 ${
					darkMode
						? "bg-[#020217] border border-gray-800"
						: "bg-white border border-gray-300"
				}`}>
				<button
					onClick={onClose}
					className={`absolute top-4 right-4 p-1 rounded-full ${
						darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
					}`}>
					<FaTimes className="text-gray-500" />
				</button>

				<h3 className="text-lg font-semibold mb-4">Add New Task</h3>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							className={`block text-sm mb-1 ${
								darkMode ? "text-gray-300" : "text-gray-700"
							}`}>
							Task Title*
						</label>
						<input
							type="text"
							name="title"
							value={taskData.title}
							onChange={handleInputChange}
							required
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
								value={taskData.priority}
								onChange={handleInputChange}
								className={`w-full px-3 py-2 rounded border ${
									darkMode
										? "bg-[#03021E] border-gray-700 focus:border-blue-500"
										: "bg-white border-gray-300 focus:border-blue-500"
								} focus:outline-none focus:ring-1 focus:ring-blue-500`}>
								<option value="high">High</option>
								<option value="medium">Medium</option>
								<option value="low">Low</option>
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
								name="due"
								value={taskData.due}
								onChange={handleInputChange}
								className={`w-full px-3 py-2 rounded border ${
									darkMode
										? "bg-[#03021E] border-gray-700 focus:border-blue-500"
										: "bg-white border-gray-300 focus:border-blue-500"
								} focus:outline-none focus:ring-1 focus:ring-blue-500`}
							/>
						</div>
					</div>

					<div className="flex justify-end space-x-3 pt-2">
						<button
							type="button"
							onClick={onClose}
							className={`px-4 py-2 rounded ${
								darkMode
									? "bg-gray-700 hover:bg-gray-600"
									: "bg-gray-200 hover:bg-gray-300"
							}`}>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
							Add Task
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddTaskModal;
