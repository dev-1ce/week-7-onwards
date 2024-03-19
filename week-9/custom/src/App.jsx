import { useState,useEffect } from 'react'
import axios from "axios"
import './App.css'

function useTodo(time){
  const [todos,setTodos] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const value = setInterval(()=>{
      const fetchData = async () => {
        try {
          const res = await axios.get('https://sum-server.100xdevs.com/todos');
          setTodos(res.data.todos);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData()
    },time*1000)

    const fetchData = async () => {
      try {
        const res = await axios.get('https://sum-server.100xdevs.com/todos');
        setTodos(res.data.todos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
    return ()=>{
      clearInterval(value)
    }

  },[time]);

  return {
    todos,
    loading
  }
}


function App() {
  
  const {todos,loading} = useTodo(5);

  if(loading){
    return(
      <div>loading..</div>
    )
  }

  return (
    <>
      {todos.map(todo => <Track todo={todo} />)}
    </>
  )
}

function Track({todo}){

  return (
    <div><h1>{todo.title}</h1>
    <h2>{todo.description}</h2> 
    </div>
  )
}

export default App
