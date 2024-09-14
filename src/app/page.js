'use client';

import 'isomorphic-fetch';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  const toggleComplete = async (id) => {
    try {
      const taskToToggle = tasks.find(task => task._id === id);
      const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
      
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async (id, updatedTask) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      const editedTask = await res.json();
      setTasks(tasks.map(task => task._id === id ? editedTask : task));
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    <Layout>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggleComplete={toggleComplete}
        onDeleteTask={deleteTask}
        onEditTask={editTask}
      />
    </Layout>
  );
}
