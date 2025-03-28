import { useTheme } from "../../contexts/ThemeContext";
import { FaPlus } from "react-icons/fa";

const PriorityTasks = () => {
	const { darkMode } = useTheme();

	const tasks = [
		{
			id: 1,
			title: "Finalize Q2 Financial Report",
			priority: "high",
			due: "07 March 2025, 09:00 AM",
			completed: false,
		},
		{
			id: 2,
			title: "Review Vendor Contracts",
			priority: "medium",
			due: "07 March 2025, 11:00 AM",
			completed: false,
		},
		{
			id: 4,
			title: "Update Security Protocols",
			priority: "high",
			due: "07 March 2025, 15:00 PM",
			completed: false,
		},
		{
			id: 5,
			title: "Finalize Q2 Financial Report",
			priority: "high",
			due: "07 March 2025, 09:00 AM",
			completed: false,
		},
		{
			id: 6,
			title: "Review Vendor Contracts",
			priority: "medium",
			due: "07 March 2025, 11:00 AM",
			completed: false,
		},
	];

	return (
		<div
			className={`p-2 md:p-4 rounded-lg shadow h-full flex flex-col border ${
				darkMode
					? "bg-[#020217] text-gray-100 border-gray-800"
					: "bg-white text-gray-800 border-gray-300"
			}`}>
			<div className="flex justify-between items-center mb-2 md:mb-4">
				<h2 className="text-lg md:text-lg font-semibold">Priority Tasks</h2>
				<button
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
						<div className="flex-1 min-w-0">
							<p
								className={`text-xs md:text-sm font-medium truncate ${
									task.completed
										? "line-through text-gray-400 dark:text-gray-500"
										: ""
								}`}>
								{task.title}
							</p>
							<div className="flex items-center mt-1">
								<span className="text-xs text-gray-500 dark:text-gray-400 truncate">
									{task.due}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PriorityTasks;
