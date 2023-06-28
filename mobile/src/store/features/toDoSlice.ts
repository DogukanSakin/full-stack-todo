
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Task from '../../models/Task'
import axios from 'axios';



export interface ToDoSlice {
  todos: Task[];
  completedPercentage: number;
  
}

const initialState: ToDoSlice = {
  todos: [],
  completedPercentage: 0,
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
    }
  },
})

export const fetchTodos = () => async (dispatch: any) => {

  await axios.get('http://localhost:3000/api/task').then(res =>{
    dispatch(setTodos(res.data.data as Task[]));
    dispatch(calculateCompletedPercentage());
  }).catch(err => console.log(err));
}
export const addNewTodo = (task: Task) => async (dispatch: any) => {

  await axios.post('http://localhost:3000/api/task', task).then(()=>{
    dispatch(addTodo(task));
    dispatch(calculateCompletedPercentage());
  }).catch(err => console.log(err));
}
export const updateTodo = (task:Task) => async (dispatch: any) => {
 
  await axios.put(`http://localhost:3000/api/task/${task._id}`,task).then(()=>{
    dispatch(updateTodos(task));
    dispatch(calculateCompletedPercentage());
  }).catch(err => console.log(err));
}

export const { setTodos,addTodo,updateTodos,calculateCompletedPercentage } = todosSlice.actions

export default todosSlice.reducer