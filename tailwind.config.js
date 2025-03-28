/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"Aptos",
					"Segoe UI",
					"Roboto",
					"Helvetica Neue",
					"Arial",
					"sans-serif",
				],
			},
		},
	},
	plugins: [],
};
