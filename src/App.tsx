import React, { useState } from "react";
import Select from "react-select";
import "tailwindcss/tailwind.css";

interface Blog {
  id: number;
  title: string;
  category: string;
  description: string;
}

const dummyData: Blog[] = [
  {
    id: 1,
    title: "React Basics",
    category: "React",
    description: "Learn the basics of React.js.",
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    category: "JavaScript",
    description: "Understand JavaScript core concepts.",
  },
  {
    id: 3,
    title: "Styling in React with Tailwind",
    category: "React",
    description: "Master Tailwind CSS in React projects.",
  },
  {
    id: 4,
    title: "Advanced TypeScript",
    category: "TypeScript",
    description: "Deep dive into advanced TypeScript features.",
  },
  {
    id: 5,
    title: "Understanding Zustand",
    category: "State Management",
    description: "Manage state efficiently with Zustand.",
  },
  {
    id: 6,
    title: "Async Programming in JavaScript",
    category: "JavaScript",
    description: "Learn about promises, async/await, and more.",
  },
  {
    id: 7,
    title: "React Performance Optimization",
    category: "React",
    description: "Tips for improving React app performance.",
  },
  {
    id: 8,
    title: "Using Context API in React",
    category: "React",
    description: "Handle state globally with Context API.",
  },
  {
    id: 9,
    title: "TypeScript for Beginners",
    category: "TypeScript",
    description: "A beginner's guide to TypeScript.",
  },
  {
    id: 10,
    title: "Mastering Redux Toolkit",
    category: "State Management",
    description: "Simplify state management with Redux Toolkit.",
  },
];

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [...new Set(dummyData.map((item) => item.category))];

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));

  const filteredData = dummyData.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (selectedOptions: any) => {
    setSelectedCategories(
      selectedOptions ? selectedOptions.map((opt: any) => opt.value) : []
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-semibold text-center mb-6 font-serif italic text-blue-600 underline">
          Discover Blogs
        </h1>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
          {/* Search Box */}
          <input
            type="text"
            placeholder="Search blogs..."
            className="flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 md:mb-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Multi-Select Filter */}
          <div className="w-full md:w-1/3">
            <Select
              options={categoryOptions}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Filter by categories..."
              onChange={handleCategoryChange}
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-blue-50 border border-blue-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-blue-700 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 font-semibold text-sm mb-3">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 text-left">
                  <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-200 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No results found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
