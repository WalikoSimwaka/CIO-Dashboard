// src/App.jsx
import Header from "./components/navs/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/navs/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
	return (
		<ThemeProvider>
			<div className="flex flex-col h-screen">
				<Header />
				<div className="flex-1 w-full overflow-hidden">
					<HomePage />
				</div>
				<Footer />
			</div>
		</ThemeProvider>
	);
}

export default App;
