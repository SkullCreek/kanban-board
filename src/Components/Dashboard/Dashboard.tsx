import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
}

const Dashboard = () => {

  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const initialTasks: Task[] = [
  ];
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  useEffect(() => {
    const user = sessionStorage.getItem('_au_')
    if(user == null) navigate('/login')
    fetch(`http://localhost:3001/api/kanban/${user}`)
      .then(response => response.json())
      .then(data => {
        setUsername(data[0].username)
        setTasks((prevTasks) => [
          ...data.map((item: any) => ({
            title: item.title,
            description: item.description,
            category: item.category,
            id: item._id,
          })),
        ]);
      })
      .catch(error => {
        console.error(error)
        navigate('/login')
      });
  }, [setTasks, navigate]);

  
  const categoryColumns = ['Not Started', 'In Progress', 'Blocked', 'Done'];

  const moveTask = (taskId: any, newCategory: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id == taskId) {
        const data = {
          id: task.id,
          category: newCategory
        }
        fetch(`http://localhost:3001/api/kanban`,{
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => console.error(error));
        return { ...task, category: newCategory };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId: any) => {
    fetch(`http://localhost:3001/api/kanban/${taskId}`,{method: 'DELETE'})
      .then(response => response.json())
      .then(data => {
        // console.log(data)
      })
      .catch(error => console.error(error));
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const [showForm, setShowForm] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Not Started',
  });

  const [editTask, setEditTask] = useState<{ taskId: number | null; title: string; description: string }>({
    taskId: null,
    title: '',
    description: '',
  });

  const handleAddTask = () => {
    console.log(tasks)
    if (newTask.title.trim() === '' || newTask.description.trim() === '') {
      alert('Please enter all the fields.');
      return;
    }

    const data = {
      username: username,
      title: newTask.title,
      description: newTask.description,
      category: newTask.category
    }
    
    fetch(`http://localhost:3001/api/kanban`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        setTasks([...tasks, { ...newTask, id: data._id }]);
        setNewTask({ title: '', description: '', category: 'Not Started' });
        setShowForm(false);
      })
      .catch(error => console.error(error));
  };

  const handleEditClick = (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditTask({
      taskId,
      title: taskToEdit?.title || '',
      description: taskToEdit?.description || '',
    });
  };

  const handleSaveEdit = (taskId: any) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id == taskId) {
        console.log(task.id)
        const data = {
          id: task.id,
          title: editTask.title,
          description: editTask.description
        }
        fetch(`http://localhost:3001/api/kanban`,{
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          // console.log(data)
        })
        .catch(error => console.error(error));

        return { ...task, title: editTask.title, description: editTask.description };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditTask({ taskId: null, title: '', description: '' });
  };

  return (
    <>
    <div className="p-5">
      <div className='row'>
        <div className='col-11'>
          <h1 className="fw-bolder">Personal</h1>
          <p className="text-secondary mb-5">A board to keep track of personal tasks.</p>
        </div>
        <div className='col-1'>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Add Task
          </button>
        </div>
        
      </div>
      <div className="row bg-light p-4">
        {categoryColumns.map((category) => (
          <div className="col-3" key={category}>
            <div className='px-3 py-1 bg-success-subtle rounded-4 fw-semibold mb-3' style={{width: "fit-content"}}>{category}</div>
            <div className=" rounded" style={{ minHeight: '200px' }}>
              {tasks
                .filter((task) => task.category === category)
                .map((task) => (
                  <div key={task.id} style={{ marginBottom: '10px' }}>
                    <div className="mb-3 p-4 bg-white rounded border shadow" style={{ cursor: 'grab' }}>
                      {editTask.taskId === task.id ? (
                        <div>
                          <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              value={editTask.title}
                              onChange={(e) =>
                                setEditTask({ ...editTask, title: e.target.value })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              value={editTask.description}
                              onChange={(e) =>
                                setEditTask({ ...editTask, description: e.target.value })
                              }
                            />
                          </div>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleSaveEdit(task.id)}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="d-flex align-items-center justify-content-between">
                            <h5 style={{ width: '70%' }}>{task.title}</h5>
                            <div className="d-flex">
                              <button
                                className="btn"
                                onClick={() => handleEditClick(task.id)}
                              >
                                <span className="material-symbols-outlined">edit</span>
                              </button>
                              
                            </div>
                          </div>
                          <p className="pb-3" style={{ width: '80%' }}>
                            {task.description}
                          </p>
                          <div className='d-flex justify-content-between'>
                            <span
                              className="material-symbols-outlined"
                              style={{ cursor: 'pointer' }}
                              onClick={() => deleteTask(task.id)}
                            >
                              delete
                            </span>
                            <select
                                className="form-select form-select-sm ms-5"
                                value={task.category}
                                onChange={(e) => moveTask(task.id, e.target.value)}
                              >
                                {categoryColumns.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                          </div>
                          
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="position-absolute top-0 start-0 w-100 " style={{height: "100vh", display: "grid", placeItems: "center", background: "rgba(0, 0, 0, 0.25)"}}>
          <div className="form-modal bg-white p-5 rounded-3 shadow-sm">
            <div className="form-container" style={{width:"300px"}}>
              <h2 className="fw-semibold pb-3">Add</h2>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                >
                  {categoryColumns.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-primary me-3 mt-4" onClick={handleAddTask}>
                Add Task
              </button>
              <button className="btn mt-4" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
          </div>
        )}
      
        
      
    </div>
    </>
  );
};

export default Dashboard;