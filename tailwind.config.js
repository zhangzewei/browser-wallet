/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./entrypoints/**/*.{js,ts,jsx,tsx,html}"
    ],
    plugins: [require("tailwindcss-animate")],
}  