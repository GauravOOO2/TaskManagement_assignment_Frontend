import { useState } from 'react';

export default function EditTaskModal({ task, onClose, onEditTask }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split('T')[0] : '');
  const [category, setCategory] = useState(task.category);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onEditTask(task._id, { title, description, dueDate, category });
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="w-full p-2 border rounded mb-2"
            rows="3"
          />
          <p className="text-sm text-gray-500 mb-2">Both title and description are required.</p>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={today} // Set minimum date to today
            className="w-full p-2 border rounded mb-2"
          />
          <p className="text-sm text-gray-500 mb-2">Due date must be today or in the future.</p>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter task category"
            className="w-full p-2 border rounded mb-2"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}