'use client';

import { useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [twitterCard, setTwitterCard] = useState('summary');
  const [metaTags, setMetaTags] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleGenerate = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!title || !description || !keywords || !author) {
      setIsValid(false);
      return;
    }
    setIsValid(true);

    const generatedMetaTags = `
      <meta name="description" content="${description}" />
      <meta name="keywords" content="${keywords}" />
      <meta name="author" content="${author}" />
      <title>${title}</title>
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="${ogImage || 'default-image-url.jpg'}" />
      <meta name="twitter:title" content="${title}" />
      <meta name="twitter:description" content="${description}" />
      <meta name="twitter:card" content="${twitterCard}" />
      <meta name="twitter:image" content="${ogImage || 'default-image-url.jpg'}" />
    `;
    
    setMetaTags(generatedMetaTags);
  };

  const handleDownload = () => {
    const blob = new Blob([metaTags], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'seo-meta-tags.txt';
    link.click();
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
            className={`mt-1 p-2 w-full border ${isValid ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            required
          />
          {!isValid && !title && <p className="text-red-500 text-sm">Title is required.</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`mt-1 p-2 w-full border ${isValid ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            required
          />
          {!isValid && !description && <p className="text-red-500 text-sm">Description is required.</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="keywords" className="block text-lg font-medium">Keywords</label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className={`mt-1 p-2 w-full border ${isValid ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            required
          />
          {!isValid && !keywords && <p className="text-red-500 text-sm">Keywords are required.</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-lg font-medium">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={`mt-1 p-2 w-full border ${isValid ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            required
          />
          {!isValid && !author && <p className="text-red-500 text-sm">Author is required.</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="ogImage" className="block text-lg font-medium">Open Graph Image URL</label>
          <input
            type="text"
            id="ogImage"
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="twitterCard" className="block text-lg font-medium">Twitter Card Type</label>
          <select
            id="twitterCard"
            value={twitterCard}
            onChange={(e) => setTwitterCard(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="summary">Summary</option>
            <option value="summary_large_image">Summary with Large Image</option>
            <option value="player">Player</option>
          </select>
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
            value={metaTags}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md font-mono text-sm bg-gray-50"
          />
          <button
            onClick={handleDownload}
            className="mt-4 w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Download Meta Tags (.txt)
          </button>
        </div>
      )}
    </div>
  );
}
