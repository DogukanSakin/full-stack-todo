
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Task from '../../models/Task'
import axios from 'axios';
import { showErrorNotification } from './notificationSlice';

interface ToDoSlice {
  todos: Task[];
  completedPercentage: number;
  selectedTodo?: Task;
  
}

const initialState: ToDoSlice = {
  todos: [],
  completedPercentage: 0,
  selectedTodo: undefined
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Task[]>) => {
      state.todos = action.payload
    },

    addTodo: (state, action: PayloadAction<Task>) => {
      state.todos = [...state.todos, action.payload]  
    },

    updateTodos: (state, action: PayloadAction<Task>) => {
      state.todos = state.todos.map(todo => todo._id === action.payload._id ? action.payload : todo)
    },

    
    calculateCompletedPercentage: (state) => {
      state.completedPercentage = state.todos.filter(todo => todo.completed===true).length / state.todos.length;
    },

    deleteTodo: (state, action: PayloadAction<Task>) => {
      state.todos = state.todos.filter(todo => todo._id !== action.payload._id)
    },

    setSelectedTodo: (state, action: PayloadAction<Task>) => {
      state.selectedTodo = action.payload
    },

    clearSelectedTodo: (state) => {
      state.selectedTodo = undefined
    }





    

  },
})

export const fetchTodos = () => async (dispatch: any) => {
  const fetchedData = await axios.get('http://localhost:3000/api/task').then(res =>{
    dispatch(setTodos(res.data.data as Task[]));
    dispatch(calculateCompletedPercentage());
    return res.data.data;
  }).catch(()=>dispatch(showErrorNotification("Error fetching data")));
  return fetchedData;
}
export const addNewTodo = (task: Task) => async (dispatch: any) => {
  await axios.post('http://localhost:3000/api/task', task).then((res)=>{    
    dispatch(addTodo({...task,...res.data}));
    dispatch(calculateCompletedPercentage());
  }).catch(()=>dispatch(showErrorNotification("Error adding new task")));
}
export const updateTodo = (task:Task) => async (dispatch: any) => {
  console.log(task);
  
  await axios.put(`http://localhost:3000/api/task/${task._id}`,task).then(()=>{
    dispatch(updateTodos(task));
    dispatch(calculateCompletedPercentage());
  }).catch(()=>dispatch(showErrorNotification("Error updating task")));
}

export const deleteTodoById = (task:Task) => async (dispatch: any) => {
  await axios.delete(`http://localhost:3000/api/task/${task._id}`).then(()=>{
    dispatch(deleteTodo(task));
    dispatch(calculateCompletedPercentage());
  }
  ).catch(()=>dispatch(showErrorNotification("Error deleting task")));
}


export const { setTodos,addTodo,updateTodos,calculateCompletedPercentage,deleteTodo ,setSelectedTodo,clearSelectedTodo} = todosSlice.actions

export default todosSlice.reducer