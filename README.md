# Coding Typing Speed Test

A coding typing speed test application built with Next.js and TailwindCSS. This app allows users to practice typing speed with code snippets in various programming languages. It tracks metrics like WPM (Words per Minute), accuracy, and typing progress in real-time. The app includes features like dark mode, language selection, and a responsive design.

## Features

- **Language Selection**: Supports various programming languages (JavaScript, Python, Go, Java, Rust, PHP, Swift, Kotlin, Ruby).
- **Typing Metrics**: Tracks WPM (Words per Minute), accuracy, and errors.
- **Real-time Highlighting**: Highlights correctly typed text in green and errors in red.
- **Dark Mode**: Toggle between light and dark themes.
- **Responsive Design**: Optimized for all screen sizes using TailwindCSS.
- **Custom Fonts**: Custom typography with local fonts for a smooth UI experience.

## Technologies Used

- **Next.js**: A React framework for building modern web applications.
- **TailwindCSS**: A utility-first CSS framework for designing custom, responsive user interfaces.
- **PrismJS**: A syntax highlighter to display programming code with syntax highlighting.
- **Framer Motion**: For smooth animations.

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
# Clone the repository
git clone https://github.com/ltxstudio/Coding-Typing-Speed-Test

# Navigate to the project directory
cd coding-typing-speed-test

# Install dependencies
npm install
```

## Running the Development Server

Once the dependencies are installed, you can run the development server:

```bash
# Start the development server
npm run dev
```

Open your browser and go to `http://localhost:3000` to view the app.

## Building for Production

To build the app for production:

```bash
# Build the project for production
npm run build

# Start the production server
npm run start
```

## Configuration

### TailwindCSS

TailwindCSS is used for styling, and it is configured to include custom colors, breakpoints, and responsive utilities. Here are some notable settings:

- **Primary color**: `#4C51BF`
- **Secondary color**: `#F6AD55`
- **Dark mode**: Toggle dark mode using a class.

### Fonts

The project uses custom local fonts:

- **Geist Sans**: For the primary text.
- **Geist Mono**: For monospaced text (code snippets).

Fonts are loaded using `next/font/local` for optimal performance.

### Responsive Design

TailwindCSS’s responsive design system is fully utilized, with grid layouts that adapt to different screen sizes:

- 1 column on small screens (`grid-cols-1`)
- 2 columns on medium screens (`sm:grid-cols-2`)
- 3 columns on large screens (`lg:grid-cols-3`)

### Dark Mode

Dark mode can be toggled via the button in the UI, applying a dark background and light text colors.

## Customizing the App

You can modify the default code snippets in the `codeSnippets` object to add new programming languages or change the existing ones. The following languages are supported:

- JavaScript
- Python
- Go
- Java
- Rust
- PHP
- Swift
- Kotlin
- Ruby

You can also adjust the font styles, breakpoints, and color scheme by modifying the `globals.css` and `tailwind.config.js` files.

## Contributing

If you'd like to contribute to the project, feel free to fork the repository and create a pull request with your changes. Please ensure that your code follows the existing code style and includes appropriate tests (if applicable).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
