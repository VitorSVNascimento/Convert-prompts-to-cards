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
      {tasks.length == 0 && <div className='text-center'>
        <h1 className="mb-4 text-4xl leading-none tracking-tight dark:text-black-100 md:text-5xl lg:text-6xl dark:text-black-100">Estruture suas ideias
</h1>
        <p className="mb-6 text-lg font-normal text-black-50 lg:text-xl sm:px-16 xl:px-48 dark:text-black-50">Digite seu projeto no prompt acima e ele vai ser convertido em um quadro kanban como este</p>
        <div className='flex justify-center'>
            <div><img src="https://i.ibb.co/SmSNbYH/imagem-prompt.png" alt="Imagem de um exemplo de prompt"  /></div>
            <div><img src="https://i.ibb.co/TYgnXJp/imagem-kanban.png" alt="Imagem do quadro kanban gerado por esse prompt"  /></div>

        </div>
      </div>
      
      }
      { tasks.length !=0 && <div className="flex divide-x divide-transparent justify-center ">
        
        {columns.map((column) => (
          <div
            onDrop={(e) => handleDrop(e, column.status)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter(column.status)}
            
          >
            <div className="flex bg-red-100 justify-between text-3xl p-2 font-bold text-gray-500 ml-1">
              <h2 className="capitalize">{column.status} {column.tasks.reduce((total, task) => total + (task?.points || 0), 0)}</h2>
              
            </div>
            <div className= {`h-full bg-red-200 rounded ml-1 mt-1 p-1 ${currentlyHoveringOver === column.status ? 'bg-red-500' : ''}`}>
            {column.tasks.map((task) => (
              <TaskCard
                task={task}
                updateTask={updateTask}
              />
            ))}
            </div>
          </div>
        ))}
      </div>}

    </div>
  )
}

export default App