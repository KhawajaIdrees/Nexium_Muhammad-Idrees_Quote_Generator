"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { Sun, Moon } from "lucide-react";

const quotes = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { text: "Don’t count the days, make the days count.", author: "Muhammad Ali" },
  { text: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
  { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "Try not to become a man of success. Rather become a man of value.", author: "Albert Einstein" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  // You can add more...
];

export default function Home() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<typeof quotes>([]);

  useEffect(() => {
    const savedQuote = localStorage.getItem("lastQuote");
    const savedTheme = localStorage.getItem("theme");
    if (savedQuote) {
      try {
        setQuote(JSON.parse(savedQuote));
      } catch {
        setQuote(quotes[0]);
      }
    }
    if (savedTheme === "dark") {
      setIsDark(true);
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
    if (!quote) return;
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    toast.success("Quote copied to clipboard!");
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleSearch = () => {
    const filtered = quotes.filter((q) =>
      q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuotes(filtered);
    if (filtered.length === 0) toast.error("No matching quotes found!");
  };

  return (
    <div className={`${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen flex flex-col transition-colors`}>
      
      {/* --- Header/Navbar --- */}
      <header className={`${isDark ? "bg-gray-800" : "bg-white"} shadow-md py-2 px-4 flex justify-between items-center`}>
        <h1 className="text-xl font-bold">Quote Generator</h1>
        <Button
  onClick={toggleTheme}
  variant="ghost"
  className="rounded-full p-2 shadow-none focus:outline-none focus:ring-0 border-none"
>
  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
</Button>

      </header>

      {/* --- Main Section --- */}
      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className={`${isDark ? "bg-gray-800" : "bg-white"} w-full max-w-2xl p-8 rounded-lg shadow-lg text-center`}>
          {quote && (
            <blockquote className="mb-6">
              <p className="text-2xl font-semibold md:text-3xl">
                "{quote.text}"
              </p>
              <cite className="block mt-4 text-lg not-italic">
                — {quote.author}
              </cite>
            </blockquote>
          )}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Button
              onClick={getNewQuote}
              className="bg-lime-500 hover:bg-lime-600 text-white"
            >
              New Quote
            </Button>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="text-lime-500 border-lime-500 hover:bg-lime-500 hover:text-white"
            >
              Copy
            </Button>
          </div>

          <div className="mt-8">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by word or author..."
              className={`w-full px-4 py-2 rounded-md border mt-2 mb-4 ${
                isDark ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"
              }`}
            />
            <Button
              onClick={handleSearch}
              className="bg-lime-500 hover:bg-lime-600 text-white w-full"
            >
              Search
            </Button>
          </div>

          {filteredQuotes.length > 0 && (
            <div className="mt-6 text-left space-y-4">
              <h3 className="text-xl font-semibold">Search Results:</h3>
              {filteredQuotes.map((q, idx) => (
                <div key={idx} className="p-4 border rounded-md bg-opacity-10 border-lime-400">
                  <p className="text-md">"{q.text}"</p>
                  <p className="text-sm mt-1 text-gray-500">— {q.author}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="text-center py-4 text-sm bg-black text-white w-full">
        © 2025 Quote Generator by Idrees — All rights reserved.
      </footer>
    </div>
  );
}
