import { useEffect, useState } from 'react'
import './App.css'
import TaskCard from './components/Card'
import { Status, statuses, Task } from './utils/data-tasks'
import GeminiPrompt from './components/Gemini'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status)
    return {
      status,
      tasks: tasksInColumn
    }
  })

  useEffect(() => {
    fetch('').then((res) => res.json()).then((data) => {
      setTasks(data)
    })
  }, [])

  const updateTask = (task: Task) => {
    fetch(``, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? task : t
    })
    setTasks(updatedTasks)
  }

  const fetchTasksFromAPI = async (prompt: string, apiKey: string) => {
    const response = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'prompt':prompt, 'api':apiKey })
    });

    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    } else {
      console.error('Error fetching tasks:', response.statusText);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
    e.preventDefault()
    setCurrentlyHoveringOver(null)
    const id = e.dataTransfer.getData("id")
    const task = tasks.find((task) => task.id === id)
    if(task) {
      updateTask({...task, status})
    }
  }



  const [currentlyHoveringOver, setCurrentlyHoveringOver] = useState<Status | null>(null)
  const handleDragEnter = (status: Status) => {
    setCurrentlyHoveringOver(status)
  }

  return (
    <div>
      <div >
        
        <GeminiPrompt fetchTasksFromAPI={fetchTasksFromAPI}/>

      </div>
      <div className="flex divide-x">
        
        {columns.map((column) => (
          <div
            onDrop={(e) => handleDrop(e, column.status)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter(column.status)}
          >
            <div className="flex justify-between text-3xl p-2 font-bold text-gray-500">
              <h2 className="capitalize">{column.status}</h2>
              {column.tasks.reduce((total, task) => total + (task?.points || 0), 0)}
            </div>
            <div className={`h-full ${currentlyHoveringOver === column.status ? 'bg-gray-200' : ''}`}>
            {column.tasks.map((task) => (
              <TaskCard
                task={task}
                updateTask={updateTask}
              />
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App