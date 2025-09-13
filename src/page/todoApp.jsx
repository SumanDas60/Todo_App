import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Check, X, Filter, Search, Moon, Sun } from 'lucide-react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toLocaleString()
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Start editing
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edit
  const saveEdit = () => {
    if (editingText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    // First apply the completion filter
    let matchesFilter = true;
    if (filter === 'active') matchesFilter = !todo.completed;
    if (filter === 'completed') matchesFilter = todo.completed;
    
    // Then apply the search filter
    const matchesSearch = searchTerm === '' || 
      todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Handle Enter key press
  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className={`min-h-screen py-8 px-4 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My ToDo App
            </h1>
            <button
              onClick={toggleDarkMode}
              className={`absolute top-5 right-5 p-3 rounded-full transition-all duration-300 ${
                darkMode
                  ? 'bg-yellow-500 text-yellow-900 hover:bg-yellow-400 shadow-yellow-500/25'
                  : 'bg-gray-800 text-gray-100 hover:bg-gray-700 shadow-gray-800/25'
              } shadow-lg hover:shadow-xl`}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
          <p className={`transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Stay organized and get things done
          </p>
        </div>

        {/* Add Todo Section */}
        <div className={`rounded-2xl shadow-lg p-6 mb-6 border transition-colors duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, addTodo)}
              placeholder="Add a new task..."
              className={`flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              onClick={addTodo}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className={`rounded-2xl shadow-lg p-6 mb-6 border transition-colors duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-400'
              }`} size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-gray-300' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <span className={`px-3 py-1 rounded-full font-medium transition-colors duration-300 ${
                darkMode 
                  ? 'bg-blue-900/50 text-blue-300' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                Total: {todos.length}
              </span>
              <span className={`px-3 py-1 rounded-full font-medium transition-colors duration-300 ${
                darkMode 
                  ? 'bg-green-900/50 text-green-300' 
                  : 'bg-green-100 text-green-800'
              }`}>
                Completed: {completedCount}
              </span>
              <span className={`px-3 py-1 rounded-full font-medium transition-colors duration-300 ${
                darkMode 
                  ? 'bg-orange-900/50 text-orange-300' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                Active: {activeCount}
              </span>
              {searchTerm && (
                <span className={`px-3 py-1 rounded-full font-medium transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-purple-900/50 text-purple-300' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  Found: {filteredTodos.length}
                </span>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {['all', 'active', 'completed'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === filterType
                      ? 'bg-blue-500 text-white shadow-md'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className={`rounded-2xl shadow-lg border overflow-hidden transition-colors duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          {filteredTodos.length === 0 ? (
            <div className={`p-12 text-center transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <Filter size={24} />
              </div>
              <p className="text-lg font-medium mb-2">
                {todos.length === 0 
                  ? 'No tasks yet' 
                  : searchTerm 
                    ? `No tasks match "${searchTerm}"` 
                    : 'No tasks match your filter'}
              </p>
              <p className="text-sm">
                {todos.length === 0 
                  ? 'Add a task to get started!' 
                  : searchTerm 
                    ? 'Try a different search term or add a new task.'
                    : 'Try a different filter or add a new task.'}
              </p>
            </div>
          ) : (
            <div className={`divide-y transition-colors duration-300 ${
              darkMode ? 'divide-gray-700' : 'divide-gray-100'
            }`}>
              {filteredTodos.map((todo, index) => (
                <div
                  key={todo.id}
                  className={`p-6 transition-all duration-200 ${
                    darkMode
                      ? todo.completed 
                        ? 'bg-gray-900/50 hover:bg-gray-900/75' 
                        : 'hover:bg-gray-700/50'
                      : todo.completed
                        ? 'bg-gray-50 hover:bg-gray-100'
                        : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        todo.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {todo.completed && <Check size={14} />}
                    </button>

                    {/* Todo Content */}
                    <div className="flex-1">
                      {editingId === todo.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                            className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                              darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-200 text-gray-900'
                            }`}
                            autoFocus
                          />
                          <button
                            onClick={saveEdit}
                            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p
                            className={`text-lg transition-colors duration-300 ${
                              todo.completed
                                ? darkMode 
                                  ? 'text-gray-500 line-through' 
                                  : 'text-gray-500 line-through'
                                : darkMode
                                  ? 'text-gray-100'
                                  : 'text-gray-800'
                            }`}
                          >
                            {todo.text}
                          </p>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            darkMode ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            Created: {todo.createdAt}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {editingId !== todo.id && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(todo.id, todo.text)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            darkMode
                              ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-900/30'
                              : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                          }`}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            darkMode
                              ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/30'
                              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                          }`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setTodos(todos.filter(todo => !todo.completed))}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
            >
              Clear Completed ({completedCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}