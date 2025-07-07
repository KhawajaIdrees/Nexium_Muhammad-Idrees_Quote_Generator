'use client';

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

const quotes = [
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela"
  },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    author: ""
  },
  {
    text: "Great things never come from comfort zones.",
    author: ""
  },
];

export default function Home() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const savedQuote = localStorage.getItem("lastQuote");
    if (savedQuote) {
      try {
        setQuote(JSON.parse(savedQuote));
      } catch (e) {
        setQuote(quotes[0]);
      }
    }
  }, []);

  const getNewQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[index];
    setQuote(newQuote);
    localStorage.setItem("lastQuote", JSON.stringify(newQuote));
    toast.success("New quote loaded!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    toast.success("Quote copied to clipboard!");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 mx-4 bg-white rounded-lg shadow-lg text-center">
        <blockquote className="mb-6">
          <p className="text-2xl font-semibold text-gray-800 md:text-3xl">
            “{quote.text}”
          </p>
          <cite className="block mt-4 text-lg text-gray-600 not-italic">
            - {quote.author}
          </cite>
        </blockquote>
        <div className="flex justify-center space-x-4">
          <Button onClick={getNewQuote} className="bg-blue-500 hover:bg-blue-600 text-white">
            New Quote
          </Button>
          <Button onClick={copyToClipboard} variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
            Copy
          </Button>
        </div>
      </div>
    </main>
  );
}
