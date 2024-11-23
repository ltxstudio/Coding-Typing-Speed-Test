'use client';

import { useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [metaTags, setMetaTags] = useState('');

  const handleGenerate = (e) => {
    e.preventDefault();

    const generatedMetaTags = `
      <meta name="description" content="${description}" />
      <meta name="keywords" content="${keywords}" />
      <meta name="author" content="${author}" />
      <title>${title}</title>
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="your-image-url.jpg" />
      <meta name="twitter:title" content="${title}" />
      <meta name="twitter:description" content="${description}" />
      <meta name="twitter:image" content="your-image-url.jpg" />
    `;

    setMetaTags(generatedMetaTags);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <form onSubmit={handleGenerate}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="keywords" className="block text-lg font-medium">Keywords</label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-lg font-medium">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Generate Meta Tags
        </button>
      </form>

      {metaTags && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">Generated Meta Tags</h2>
          <textarea
            rows="10"
            cols="50"
            value={metaTags}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md font-mono text-sm bg-gray-50"
          />
        </div>
      )}
    </div>
  );
}
