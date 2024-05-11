import { useState } from 'react'
import { Task } from '../utils/data-tasks'

const Card = ({task, updateTask}: {
  task: Task
  updateTask: (task: Task) => void
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const points = task.points || 0
  const updatePoints = (direction: 'up' | 'down') => {
    const newPoints = direction === 'up' ? points + 1 : points - 1
    if(newPoints) {
      updateTask({...task, points: newPoints})
    }
  }
  return <div
    draggable
    onDragStart={(e) => {
      e.dataTransfer.setData("id", task.id)
    }}
    className="border rounded-lg px-2 m-2 bg-gray-50 w-56"
  >
    <div className="text-base font-base py-2">
      {isEditingTitle ? (
        <input
          autoFocus
          className="w-full"
          onBlur={() => setIsEditingTitle(false)}
          value={task.title}
          onChange={(e) => updateTask({...task, title: e.target.value})}
        />
      ): (
        <div onClick={() => setIsEditingTitle(true)}>
          {task.title}
        </div>
      )}
    </div>
    <div className="flex gap-4 justify-between py-2 text-gray-500 text-sm">
      <div className="flex gap-2">
        <div>Prioridade:</div>
        {task.priority === 'high' && <div className='bg-red-500 px-1 text-white'>Alta</div>}
        {task.priority === 'medium' && <div className='bg-yellow-500 px-1 text-white'>Media</div>}
        {task.priority === 'low' && <div className='bg-blue-500 px-1 text-white'>Baixa</div>}
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={() => updatePoints('down')}>-</button>
        <div className="font-bold">{points}</div>
        <button onClick={() => updatePoints('up')}>+</button>
      </div>
    </div>
  </div>
}

export default Card