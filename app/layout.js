import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  author: "Your Name", // Add your name for better SEO
  viewport: "width=device-width, initial-scale=1", // Optimizes for mobile
  robots: "index, follow", // Allows search engines to index the page
  openGraph: {
    type: "website",
    title: "Create Next App",
    description: "Generated by create next app",
    url: "https://yourwebsite.com", // Add your website URL
    image: "/path-to-image.jpg", // Add an image for social sharing
  },
  twitter: {
    card: "summary_large_image", // Use a large image for sharing
    site: "@yourtwitterhandle", // Replace with your Twitter handle
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="robots" content={metadata.robots} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.image} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.openGraph.title} />
        <meta name="twitter:description" content={metadata.openGraph.description} />
        <meta name="twitter:image" content={metadata.openGraph.image} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white`}
      >
        <div className="container mx-auto px-4 py-6">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Welcome to My Next.js App
            </h1>
            <p className="text-lg mt-2 text-gray-600">Fast, modern, and scalable!</p>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
