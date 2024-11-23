'use client';

import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { PlayIcon, StopIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Include PrismJS theme

const codeSnippets = {
  js: `// JavaScript
function greet(name) {
  return 'Hello, ' + name;
}

console.log(greet('World'));`,
  py: `# Python
def greet(name):
    return "Hello, " + name

print(greet("World"))`,
  go: `// Go
package main

import "fmt"

func greet(name string) string {
  return "Hello, " + name
}

func main() {
  fmt.Println(greet("World"))
}`,
  java: `// Java
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,
};

export default function Home() {
  const [language, setLanguage] = useState('js');
  const [textToType, setTextToType] = useState(codeSnippets.js);
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll(); // Reapply syntax highlighting whenever code changes
  }, [textToType]);

  const startTimer = () => {
    setIsTyping(true);
    inputRef.current.focus();
    timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsTyping(false);
  };

  const resetTest = () => {
    stopTimer();
    setUserInput('');
    setTimer(0);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setProgress(0);
    setShowModal(false);
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setTextToType(codeSnippets[selectedLanguage]);
    resetTest();
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    if (!isTyping) startTimer();

    const currentErrors = countErrors(input, textToType);
    setErrors(currentErrors);

    const progressPercentage = Math.round((input.length / textToType.length) * 100);
    setProgress(progressPercentage);

    if (input === textToType) {
      stopTimer();
      calculateWPM(input);
      calculateAccuracy(input);
      setShowModal(true);
    }
  };

  const countErrors = (input, text) => {
    let errorCount = 0;
    for (let i = 0; i < Math.max(input.length, text.length); i++) {
      if (input[i] !== text[i]) errorCount++;
    }
    return errorCount;
  };

  const calculateWPM = (input) => {
    const words = input.split(/\s+/).length;
    const minutes = timer / 60;
    setWpm(Math.round(words / minutes));
  };

  const calculateAccuracy = (input) => {
    const correctChars = input.split('').filter((char, i) => char === textToType[i]).length;
    setAccuracy(Math.round((correctChars / textToType.length) * 100));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={clsx('min-h-screen p-4', darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100')}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Coding Typing Speed Test</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-800 text-white"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? '🌙' : '🌞'}
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="language" className="text-lg mr-2">
          Choose Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="p-2 border-2 border-gray-300 rounded-md"
        >
          {Object.keys(codeSnippets).map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <motion.div
          className="text-lg mb-6 whitespace-pre-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <pre className={`language-${language}`}>
            <code>{textToType}</code>
          </pre>
        </motion.div>

        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing here..."
          rows="8"
          className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-4 bg-gray-200 rounded-full h-3">
          <div
            className={clsx('h-3 rounded-full', progress === 100 ? 'bg-green-500' : 'bg-blue-500')}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between mt-4">
          <p>Time: {timer}s</p>
          <p>Accuracy: {accuracy}%</p>
        </div>

        <div className="mt-4">
          <p className="text-xl font-semibold">WPM: {wpm}</p>
          <p className="text-red-500">Errors: {errors}</p>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={resetTest}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            Restart
          </button>
          {isTyping ? (
            <button
              onClick={stopTimer}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md"
            >
              <StopIcon className="w-5 h-5 mr-2" />
              Stop
            </button>
          ) : (
            <button
              onClick={startTimer}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md"
            >
              <PlayIcon className="w-5 h-5 mr-2" />
              Start
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Test Complete!</h2>
            <p className="text-lg">WPM: {wpm}</p>
            <p className="text-lg">Accuracy: {accuracy}%</p>
            <p className="text-lg text-red-500">Errors: {errors}</p>
            <button
              onClick={resetTest}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
