import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleAddTask = () => {
    if (inputText.trim() !== '') {
      const newTaskObject = {
        id: Date.now(),
        taskName: inputText,
        isCompleted: false
      };
      setTasks([...tasks, newTaskObject]);
      setInputText('');
    }
  };

  const handleStatusChange = (taskId) => {
    const updatedTaskList = tasks.map(function(item) {
      if (item.id === taskId) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTasks(updatedTaskList);
  };

  const handleDeleteTask = (taskId) => {
    const remainingTasks = tasks.filter(function(item) {
      return item.id !== taskId;
    });
    setTasks(remainingTasks);
  };

  return (
    <div className="min-h-screen bg-slate-200 p-5 font-sans text-black flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">DCIT 26: Laboratory 2 - To-Do List</h1>
      
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl items-start">
        
        {/* Main Interface Section */}
        <div className="bg-white p-6 rounded shadow w-full md:w-2/3 border border-gray-300">
          <h2 className="text-xl font-bold mb-4">Task Manager</h2>
          
          <div className="flex gap-2 mb-5">
            <input 
              type="text" 
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              placeholder="Type a new task here..." 
              className="flex-1 border-2 border-gray-300 p-2 rounded"
            />
            <button 
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center mt-4">The task list is currently empty.</p>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className={`flex items-center justify-between p-4 rounded border-2 ${task.isCompleted ? 'bg-green-100 border-green-300' : 'bg-gray-50 border-gray-300'}`}>
                  
                  <div className="flex flex-col">
                    <span className={`text-lg font-semibold ${task.isCompleted ? 'line-through text-gray-500' : 'text-black'}`}>
                      {task.taskName}
                    </span>
                    <span className={`text-sm font-bold ${task.isCompleted ? 'text-green-700' : 'text-red-600'}`}>
                      Status: {task.isCompleted ? 'Done' : 'Not Done'}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStatusChange(task.id)}
                      className={`px-3 py-2 text-sm rounded font-bold text-white ${task.isCompleted ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                      {task.isCompleted ? 'Mark Not Done' : 'Mark Done'}
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="px-3 py-2 text-sm rounded font-bold bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* User Guide Section */}
        <div className="bg-white p-6 rounded shadow w-full md:w-1/3 border border-gray-300">
          <h2 className="text-lg font-bold mb-3 border-b-2 border-gray-200 pb-2">Instructions</h2>
          <ul className="text-sm space-y-4">
            <li><strong>How to add a task:</strong> Enter your desired task into the text input field and press the blue "Add Task" button[span_4](start_span)[span_4](end_span). The task will populate in the list below.</li>
            <li><strong>How to mark a task as Done or Not Done:</strong> Click the green "Mark Done" button to indicate task completion[span_5](start_span)[span_5](end_span). The status will change to "Done". To revert this, click the yellow "Mark Not Done" button[span_6](start_span)[span_6](end_span).</li>
            <li><strong>How to delete a task:</strong> Click the red "Delete" button located next to a specific task to remove it from the database entirely[span_7](start_span)[span_7](end_span).</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;
