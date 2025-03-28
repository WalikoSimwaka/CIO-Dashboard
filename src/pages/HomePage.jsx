// src/pages/HomePage.jsx
import PriorityTasks from "../components/sections/PriorityTasks";
import HighPriorityProjects from "../components/sections/HighPriorityProjects";
import WarRoom from "../components/sections/WarRoom";
import { useTheme } from "../contexts/ThemeContext";

const HomePage = () => {
	const { darkMode } = useTheme();

	return (
		<main
			className={`h-full w-full p-2 md:p-4 ${
				darkMode ? "bg-[#03021E] text-white" : "bg-[#EFEFF3] text-black"
			}`}>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 h-full">
				{/* Two smaller sections at the top */}
				<div className="lg:col-span-1 h-full min-h-0">
					<PriorityTasks />
				</div>

				<div className="lg:col-span-1 h-full min-h-0">
					<WarRoom />
				</div>

				{/* Big horizontal section at the bottom */}
				<div className="lg:col-span-2 h-full min-h-0">
					<HighPriorityProjects />
				</div>
			</div>
		</main>
	);
};

export default HomePage;
