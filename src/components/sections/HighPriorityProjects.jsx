import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaPlus } from "react-icons/fa";
import AddProjectModal from "../modals/project/AddProjectModal";

const HighPriorityProjects = () => {
	const { darkMode } = useTheme();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [projects, setProjects] = useState([
		{
			name: "UPS Upgrade",
			startdate: "Feb 15, 2025",
			duedate: "March 27, 2025",
			status: "overdue",
			responsible: "Waliko Simwaka",
		},
		{
			name: "Server Migration",
			startdate: "March 1, 2025",
			duedate: "April 15, 2025",
			status: "on track",
			responsible: "Chisomo Banda",
		},
		{
			name: "Network Optimization",
			startdate: "March 10, 2025",
			duedate: "May 10, 2025",
			status: "on track",
			responsible: "Tadala Tembo",
		},
	]);

	const getStatusStyle = (status) => {
		switch (status) {
			case "overdue":
				return {
					bg: "bg-red-500 bg-opacity-10 dark:bg-red-500 dark:bg-opacity-30 border border-red-700",
					text: "text-red-800 dark:text-white",
					dot: "bg-red-500",
				};
			case "on track":
				return {
					bg: "bg-green-500 bg-opacity-20 dark:bg-green-500 dark:bg-opacity-30 border border-green-700",
					text: "text-green-800 dark:text-white",
					dot: "bg-green-500",
				};
			default:
				return {
					bg: "bg-gray-500 bg-opacity-20 dark:bg-gray-500 dark:bg-opacity-30 border border-gray-700",
					text: "text-gray-800 dark:text-white",
					dot: "bg-gray-500",
				};
		}
	};

	const handleAddProject = (newProject) => {
		const formattedProject = {
			...newProject,
			startdate: new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			}).format(new Date(newProject.startdate)),
			duedate: new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			}).format(new Date(newProject.duedate)),
		};
		setProjects([...projects, formattedProject]);
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
					<h2 className="text-lg md:text-lg font-semibold">
						High Priority Projects
					</h2>
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

				<div className="flex-1 overflow-auto">
					<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead>
							<tr>
								<th
									className={`px-2 py-1 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b ${
										darkMode ? "border-gray-700" : "border-gray-300"
									} truncate`}>
									Project
								</th>
								<th
									className={`px-2 py-1 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b ${
										darkMode ? "border-gray-700" : "border-gray-300"
									} truncate`}>
									Start Date
								</th>
								<th
									className={`px-2 py-1 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b ${
										darkMode ? "border-gray-700" : "border-gray-300"
									} truncate`}>
									Due Date
								</th>
								<th
									className={`px-2 py-1 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b ${
										darkMode ? "border-gray-700" : "border-gray-300"
									} truncate`}>
									Status
								</th>
								<th
									className={`px-2 py-1 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b ${
										darkMode ? "border-gray-700" : "border-gray-300"
									} truncate`}>
									Responsible
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
							{projects.map((project, index) => {
								const statusStyle = getStatusStyle(project.status);
								return (
									<tr
										key={index}
										className="hover:bg-gray-50 dark:hover:bg-gray-800">
										<td className="px-2 py-1 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-sm font-medium truncate">
											{project.name}
										</td>
										<td className="px-2 py-1 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">
											{project.startdate}
										</td>
										<td className="px-2 py-1 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-sm truncate">
											{project.duedate}
										</td>
										<td className="px-2 py-1 md:px-4 md:py-3 whitespace-nowrap">
											<div className="flex items-center">
												<span
													className={`flex items-center px-2 py-1 text-xs font-normal rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
													<div
														className={`w-2 h-2 rounded-full mr-1 ${statusStyle.dot}`}></div>
													<span className="truncate">{project.status}</span>
												</span>
											</div>
										</td>
										<td className="px-2 py-1 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-sm truncate">
											{project.responsible}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>

			<AddProjectModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onAddProject={handleAddProject}
			/>
		</>
	);
};

export default HighPriorityProjects;
