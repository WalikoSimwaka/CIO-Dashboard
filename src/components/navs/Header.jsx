import { useTheme } from "../../contexts/ThemeContext";
import nbsLogo from "../../assets/nbslogo.png"; // Adjust path as needed

const Header = () => {
	const { darkMode, toggleDarkMode } = useTheme();

	return (
		<header
			className={`p-4 border-b ${
				darkMode
					? "bg-[#020217] text-white border-gray-800"
					: "bg-white text-black border-gray-300"
			}`}>
			<div className="container flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<img src={nbsLogo} alt="NBS Logo" className="h-8 w-auto" />
					<h1 className="text-xl font-bold hidden sm:block">CIO Dashboard</h1>
				</div>

				<div className="flex items-center">
					<label className="relative inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							className="sr-only peer"
							checked={darkMode}
							onChange={toggleDarkMode}
						/>
						<div className="w-12 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:bg-blue-600"></div>
						<span className="absolute left-1 top-1 bg-white rounded-full w-4 h-4 transition-all peer-checked:left-7"></span>
					</label>
					<span className="ml-2 text-sm hidden sm:inline">Dark Mode</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
