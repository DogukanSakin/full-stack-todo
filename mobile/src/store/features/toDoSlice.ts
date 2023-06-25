import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Task from '../../models/Task'
import axios from 'axios';

export interface ToDoSlice {
  todos: Task[];
  
}

const initialState: ToDoSlice = {
  todos: []
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Task[]>) => {
      state.todos = action.payload
    },
    addTodo: (state, action: PayloadAction<Task>) => {
      console.log(action.payload + 'ile güncellendi');
      
      state.todos = [...state.todos, action.payload]
      
    }
  },
})

export const fetchTodos = () => async (dispatch: any) => {
  await axios.get('http://localhost:3000/api/task').then(res => dispatch(setTodos(res.data.data as Task[]))).catch(err => console.log(err));
}
export const addNewTodo = (task: Task) => async (dispatch: any) => {
  await axios.post('http://localhost:3000/api/task', task).then(()=>dispatch(addTodo(task))).catch(err => console.log(err));
  
}

export const { setTodos,addTodo } = todosSlice.actions

export default todosSlice.reducer