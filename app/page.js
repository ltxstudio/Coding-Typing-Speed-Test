'use client'

import { useState, useEffect, useRef } from 'react';

const codeSnippets = {
  js: `// JavaScript
function greet(name) {
  return 'Hello, ' + name;
}

console.log(greet('World'));`,
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
  py: `# Python
def greet(name):
    return "Hello, " + name

print(greet("World"))`,
  c: `// C
#include <stdio.h>

void greet(char* name) {
  printf("Hello, %s\n", name);
}

int main() {
  greet("World");
  return 0;
}`,
  cpp: `// C++
#include <iostream>
using namespace std;

void greet(string name) {
  cout << "Hello, " << name << endl;
}

int main() {
  greet("World");
  return 0;
}`,
  node: `// Node.js
function greet(name) {
  console.log('Hello, ' + name);
}

greet('World');`,
};

export default function Home() {
  const [language, setLanguage] = useState('js'); // Default language is JavaScript
  const [textToType, setTextToType] = useState(codeSnippets.js);
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [showModal, setShowModal] = useState(false);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Function to start the timer
  const startTimer = () => {
    setIsTyping(true);
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  // Function to stop the timer
  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsTyping(false);
  };

  // Function to handle language selection
  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    setLanguage(selectedLang);
    setTextToType(codeSnippets[selectedLang]);
    setUserInput('');
    setTimer(0);
    setWpm(0);
    setAccuracy(100);
    setShowModal(false);
  };

  // Function to handle user input change
  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    if (!isTyping) {
      startTimer();
    }

    if (input === textToType) {
      stopTimer();
      calculateWPM(input);
      calculateAccuracy(input);
      setShowModal(true);
    }
  };

  // Function to calculate WPM (words per minute)
  const calculateWPM = (input) => {
    const words = input.trim().split(' ').length;
    const minutes = timer / 60;
    const calculatedWpm = Math.round(words / minutes);
    setWpm(calculatedWpm);
  };

  // Function to calculate accuracy
  const calculateAccuracy = (input) => {
    let correct = 0;
    for (let i = 0; i < Math.min(input.length, textToType.length); i++) {
      if (input[i] === textToType[i]) {
        correct++;
      }
    }
    const calculatedAccuracy = Math.round((correct / textToType.length) * 100);
    setAccuracy(calculatedAccuracy);
  };

  // Function to reset the test
  const resetTest = () => {
    setUserInput('');
    setTimer(0);
    setWpm(0);
    setAccuracy(100);
    setIsTyping(false);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Coding Typing Speed Test</h1>
      <p className="text-lg text-center mb-8">Select a programming language and type the code below:</p>

      <div className="mb-6">
        <label htmlFor="language" className="text-lg mr-2">Choose Language:</label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="p-2 border-2 border-gray-300 rounded-md"
        >
          <option value="js">JavaScript</option>
          <option value="go">Go</option>
          <option value="java">Java</option>
          <option value="py">Python</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="node">Node.js</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl">
        <div className="text-lg font-semibold text-gray-700 mb-6 whitespace-pre-wrap">{textToType}</div>
        
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing here..."
          rows="10"
          className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="flex justify-between mt-4">
          <div className="text-gray-700 font-medium">Time: {timer}s</div>
          <div className="text-gray-700 font-medium">Accuracy: {accuracy}%</div>
        </div>

        <div className="mt-4">
          <p className="text-xl font-semibold">Your Speed: {wpm} WPM</p>
        </div>
        
        <button
          onClick={resetTest}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Restart Test
        </button>
      </div>

      {/* Modal for results */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-8 rounded-lg shadow-xl w-80">
            <h2 className="text-2xl font-semibold text-center mb-4">Test Complete!</h2>
            <div className="text-center">
              <p className="text-lg">Your WPM: {wpm}</p>
              <p className="text-lg">Accuracy: {accuracy}%</p>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={resetTest}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
