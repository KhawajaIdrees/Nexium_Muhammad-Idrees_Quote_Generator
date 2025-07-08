"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { Sun, Moon, Heart, X } from "lucide-react";
import { motion } from "framer-motion";

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
];

export default function Home() {
  const [quote, setQuote] = useState(quotes[0]);
  const [isDark, setIsDark] = useState(false);
  const [favorites, setFavorites] = useState<typeof quotes>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<typeof quotes>([]);

  useEffect(() => {
    const savedQuote = localStorage.getItem("lastQuote");
    const savedTheme = localStorage.getItem("theme");
    const savedFavs = localStorage.getItem("favorites");

    if (savedQuote) setQuote(JSON.parse(savedQuote));
    if (savedTheme === "dark") setIsDark(true);
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  const getNewQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[index];
    setQuote(newQuote);
    localStorage.setItem("lastQuote", JSON.stringify(newQuote));
    toast.success("New quote loaded!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    toast.success("Quote copied!");
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const addToFavorites = () => {
    if (favorites.some((q) => q.text === quote.text && q.author === quote.author)) {
      toast.info("Already in favorites.");
      return;
    }
    const updated = [...favorites, quote];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    toast.success("Added to favorites!");
  };

  const removeFromFavorites = (text: string, author: string) => {
    const updated = favorites.filter(q => !(q.text === text && q.author === author));
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    toast.success("Removed from favorites!");
  };

  const handleSearch = () => {
    const results = quotes.filter(q =>
      q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuotes(results);
    if (results.length === 0) toast.error("No matching quotes found.");
  };

  return (
    <div className={`${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen flex flex-col`}>
      <header className={`${isDark ? "bg-gray-800" : "bg-white"} shadow py-4 px-6 flex justify-between items-center`}>
        <h1 className="text-xl font-bold">Quote Generator</h1>
        <Button onClick={toggleTheme} variant="ghost" className="rounded-full">
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={quote.text}
          className={`${isDark ? "bg-gray-800" : "bg-white"} p-8 rounded-xl shadow-xl w-full max-w-xl text-center`}
        >
          <blockquote>
            <p className="text-2xl font-semibold">"{quote.text}"</p>
            <cite className="block mt-4 text-lg">— {quote.author}</cite>
          </blockquote>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button onClick={getNewQuote} className="bg-indigo-500 hover:bg-indigo-600 text-white">New Quote</Button>
            <Button onClick={copyToClipboard} className="border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white" variant="outline">Copy</Button>
            <Button onClick={addToFavorites} className="bg-pink-500 hover:bg-pink-600 text-white">
              <Heart className="w-4 h-4 mr-1" /> Favorite
            </Button>
          </div>

          <div className="mt-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by text or author..."
              className={`w-full px-4 py-2 rounded-md border mt-2 mb-4 ${isDark ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
            />
            <Button
              onClick={handleSearch}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Search
            </Button>
          </div>

          {filteredQuotes.length > 0 && (
            <div className="mt-6 text-left space-y-4">
              <h3 className="text-xl font-semibold">Search Results:</h3>
              {filteredQuotes.map((q, idx) => (
                <div key={idx} className="p-4 border rounded-md bg-opacity-10 border-indigo-400">
                  <p className="text-md">"{q.text}"</p>
                  <p className="text-sm mt-1 text-gray-500">— {q.author}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {favorites.length > 0 && (
        <section className="px-6 py-10 bg-opacity-20">
          <h2 className="text-lg font-semibold mb-4">Favorites:</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {favorites.map((fav, i) => (
              <div
                key={i}
                className={`${isDark ? "bg-gray-700" : "bg-gray-200"} p-4 rounded shadow relative`}
              >
                <Button
                  onClick={() => removeFromFavorites(fav.text, fav.author)}
                  size="icon"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-transparent"
                  variant="ghost"
                >
                  <X className="w-4 h-4" />
                </Button>
                <p className="text-sm">"{fav.text}"</p>
                <p className="text-xs text-right mt-2">— {fav.author}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="text-center py-4 text-sm bg-black text-white">
        © 2025 Quote Generator by Idrees — All rights reserved.
      </footer>
    </div>
  );
}