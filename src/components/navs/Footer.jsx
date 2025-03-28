import { useTheme } from "../../contexts/ThemeContext";

const Footer = () => {
	const { darkMode } = useTheme();

	return (
		<footer
			className={`p-4 text-center ${
				darkMode
					? "bg-[#020217] text-gray-300 border border-gray-800"
					: "bg-white"
			}`}>
			<p>
				&copy; {new Date().getFullYear()} Chief Information Officer Dashboard
			</p>
		</footer>
	);
};

export default Footer;
