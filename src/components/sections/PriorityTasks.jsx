// src/components/tasks/PriorityTasks.jsx
import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaPlus } from "react-icons/fa";
import AddTaskModal from "../modals/task/AddTaskModal";

const PriorityTasks = () => {
	const { darkMode } = useTheme();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tasks, setTasks] = useState([]);

	// Retrieve tasks from localStorage when component mounts
	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem("tasks"));
		if (storedTasks) {
			setTasks(storedTasks);
		}
	}, []);

	// Save tasks to localStorage whenever tasks state changes
	useEffect(() => {
		if (tasks.length > 0) {
			localStorage.setItem("tasks", JSON.stringify(tasks));
		}
	}, [tasks]);

	const handleAddTask = (newTask) => {
		const formattedTask = {
			...newTask,
			due: newTask.due
				? new Intl.DateTimeFormat("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
						hour: "2-digit",
						minute: "2-digit",
				  }).format(new Date(newTask.due))
				: "No deadline set",
		};
		setTasks((prevTasks) => [...prevTasks, formattedTask]);
	};

	return (
		<>
			<div
				className={`p-2 md:p-4 rounded-lg shadow h-full flex flex-col border ${
					darkMode
						? "bg-[#020217] text-gray-100 border-gray-800"
						: "bg-white text-gray-800 border-gray-300"
				}`}>
				<div className="flex justify-between items-center mb-2 md:mb-4">
					<h2 className="text-lg md:text-lg font-semibold">Priority Tasks</h2>
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

				<div className="space-y-1 md:space-y-3 flex-1 overflow-y-auto">
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
									<p
										className={`text-xs md:text-sm font-medium truncate ${
											task.completed
												? "line-through text-gray-400 dark:text-gray-500"
												: ""
										}`}>
										{task.title}
									</p>
									<div className="flex items-center mt-1 space-x-2">
										<span className="text-xs text-gray-500 dark:text-gray-400 truncate">
											{task.due}
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<AddTaskModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onAddTask={handleAddTask}
			/>
		</>
	);
};

export default PriorityTasks;
