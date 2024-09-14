import { useState } from 'react';
import EditTaskModal from './EditTaskModal';

export default function TaskList({ tasks, onToggleComplete, onDeleteTask, onEditTask }) {
    const [editingTask, setEditingTask] = useState(null);

    return (
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-bold ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </h3>
                <p className="text-gray-600">{task.description}</p>
                {task.dueDate && (
                  <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                )}
                {task.category && (
                  <p className="text-sm text-blue-500">Category: {task.category}</p>
                )}
              </div>
              <div>
                <button
                  onClick={() => onToggleComplete(task._id)}
                  className="mr-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => setEditingTask(task)}
                  className="mr-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTask(task._id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
        {editingTask && (
          <EditTaskModal
            task={editingTask}
            onClose={() => setEditingTask(null)}
            onEditTask={onEditTask}
          />
        )}
      </ul>
    );
  }