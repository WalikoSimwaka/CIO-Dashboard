import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaPlus, FaEllipsisV, FaUserCircle } from "react-icons/fa";

const WarRoom = () => {
	const { darkMode } = useTheme();
	const [tasks] = useState([
		{
			id: 1,
			title: "Production Server Outage - Database Failure",
			description:
				"Critical database failure causing complete service disruption. Investigate, restore, and implement failover.",
			status: "Overdue",
			dueDate: "27 March, 2025 17:00",
			priority: "Critical",
			assignees: ["Alice Banda"],
		},
		// {
		// 	id: 2,
		// 	title: "Security Breach - Unauthorized Access Detected",
		// 	description:
		// 		"Intrusion detection system triggered. Investigate potential data breach and secure systems immediately.",
		// 	status: "Implementation",
		// 	dueDate: "27 March, 2025 15:06",
		// 	priority: "Critical",
		// 	assignees: ["Eve Falama"],
		// },
		// {
		// 	id: 3,
		// 	title: "Network Connectivity Loss - Main Office",
		// 	description:
		// 		"Complete network outage affecting all users in the main office. Diagnose and restore connectivity ASAP.",
		// 	status: "In Research",
		// 	dueDate: "27 March, 2025 12:04",
		// 	priority: "Moderate",
		// 	assignees: ["Grace Howe"],
		// },
	]);

	const getPriorityColor = (priority) => {
		switch (priority) {
			case "Critical":
				return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
			case "Moderate":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
			case "Low":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
		}
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
					className={`p-1 md:p-2 rounded-full ${
						darkMode
							? "bg-gray-700 hover:bg-gray-600"
							: "bg-gray-200 hover:bg-gray-300"
					}`}>
					<FaPlus className="text-xs md:text-sm" />
				</button>
			</div>

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
		</div>
	);
};

export default WarRoom;
