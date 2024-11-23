'use client';

import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { PlayIcon, StopIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Include PrismJS theme

const codeSnippets = {
  js: `// JavaScript - Fibonacci Sequence
function fibonacci(n) {
  let a = 0, b = 1, temp;
  while (n-- > 0) {
    temp = a;
    a = b;
    b = temp + b;
  }
  return a;
}
console.log(fibonacci(10));`,
  py: `# Python - Palindrome Checker
def is_palindrome(s):
    return s == s[::-1]

word = "radar"
print(is_palindrome(word))`,
  go: `// Go - Factorial Function
package main

import "fmt"

func factorial(n int) int {
  if n == 0 {
    return 1
  }
  return n * factorial(n-1)
}

func main() {
  fmt.Println(factorial(5))
}`,
  java: `// Java - Reverse a String
public class Main {
  public static void main(String[] args) {
    String str = "Hello World";
    String reversed = new StringBuilder(str).reverse().toString();
    System.out.println(reversed);
  }
}`,
  rust: `// Rust - Find Maximum in Array
fn max_in_array(arr: &[i32]) -> i32 {
  *arr.iter().max().unwrap()
}

fn main() {
  let numbers = [3, 1, 4, 1, 5];
  println!("Max: {}", max_in_array(&numbers));
}`,
  php: `// PHP - Count Vowels
<?php
function count_vowels($str) {
  return preg_match_all('/[aeiou]/i', $str);
}

echo count_vowels("Hello World");
?>`,
  swift: `// Swift - Prime Checker
func isPrime(_ n: Int) -> Bool {
  if n <= 1 { return false }
  for i in 2..<n {
    if n % i == 0 { return false }
  }
  return true
}

print(isPrime(7))`,
  kotlin: `// Kotlin - Sum of Array
fun sumArray(arr: IntArray): Int {
  return arr.sum()
}

fun main() {
  val nums = intArrayOf(1, 2, 3, 4, 5)
  println("Sum: {sumArray(nums)}")
}`,
  ruby: `# Ruby - Check Even or Odd
def even_or_odd(num)
  num.even? ? "Even" : "Odd"
end

puts even_or_odd(7)`
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
  const [showModal, setShowModal] = useState(false);
  const [highlightedText, setHighlightedText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll(); // Apply syntax highlighting
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
    setUserInput('');
    setTimer(0);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setProgress(0);
    setShowModal(false);
    setHighlightedText('');
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setTextToType(codeSnippets[selectedLanguage]);
    resetTest(); // Reset on language change
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    if (!isTyping) startTimer();

    const errorCount = countErrors(input, textToType);
    setErrors(errorCount);

    const progressPercentage = Math.round((input.length / textToType.length) * 100);
    setProgress(progressPercentage);

    highlightErrors(input, textToType);

    if (input === textToType) {
      stopTimer();
      calculateWPM(input);
      calculateAccuracy(input);
      setShowModal(true);
    }
  };

  const countErrors = (input, text) => {
    let errorCount = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== text[i]) errorCount++;
    }
    return errorCount;
  };

  const highlightErrors = (input, text) => {
    let highlighted = '';
    for (let i = 0; i < text.length; i++) {
      if (input[i] === text[i]) {
        highlighted += `<span class="text-green-500">${text[i]}</span>`;
      } else if (i < input.length) {
        highlighted += `<span class="text-red-500">${text[i]}</span>`;
      } else {
        highlighted += text[i];
      }
    }
    setHighlightedText(highlighted);
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
          dangerouslySetInnerHTML={{ __html: highlightedText || `<pre><code class="language-${language}">${textToType}</code></pre>` }}
        />

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
