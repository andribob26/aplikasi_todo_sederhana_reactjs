import React, {useReducer, useState, useRef} from 'react'
import ListTodos from './ListTodos'

const initialTodos = []

const reducer = (state, {type, payload})=>{
    switch (type) {
        case "TAMBAH_TODOS":
            let lastId = 0
            if(state.length > 0) lastId = state[state.length - 1].id
            else lastId = 0 
            return [
                ...state, 
                {
                    id: lastId + 1,
                    title: payload,
                    isDone: false
                } 
            ]
        case "HAPUS_TODOS":
            const index = state.map((item)=>{
                return item.id
            }).indexOf(payload)
            
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ]
        case "IS_DONE_TODOS":
            return state.map((user)=>{
                if (user.id === payload.id) {
                    return {
                        ...user,
                        isDone: payload.isDone
                    }
                }else{
                    return user
                }
            })
        default:
            return state
    }
}



const Todos = () => {
    const [todos, dispatch] = useReducer(reducer, initialTodos)
    const [todo, setTodo] = useState('')
    const inputTodo_ = useRef(null) 
    // useEffect(() => {
    //     console.log(todos);
    // }, [todos])
    const doneHandle = (val) =>{
        dispatch({type: 'IS_DONE_TODOS', payload: {id: val.id, isDone: val.isDone,}})
    }
    const inputTodo = (val)=>{
        setTodo(val.target.value)
    }
    const tambahTodo = ()=>{
        if(todo.length > 0){
            dispatch({type: 'TAMBAH_TODOS', payload: todo})
            setTodo('')
            inputTodo_.current.value = ''
        }else{
            alert('Isi dulu form tambah data')
        }
    }
    const hapusTodo = (val) => {
        dispatch({type: 'HAPUS_TODOS', payload: val})
    }
    return (
        <div>
            <div className="mx-auto w-max">
                <div className="my-4">
                    <input ref={inputTodo_} onChange={inputTodo} className="border p-1 border-gray-500 rounded mr-2 shadow" type="text" />
                    <button onClick={tambahTodo} className="px-2 rounded text-white font-semibold py-1 shadow bg-green-500 hover:bg-green-800 transition-all duration-200">Tambah</button>
                </div>
                <div className='flex flex-col-reverse'>
                    {
                        todos.map((item)=>{
                            return (
                                <ListTodos 
                                key={item.id} 
                                id={item.id} 
                                title={item.title} 
                                isDone={item.isDone}
                                doneHandle={doneHandle}
                                hapusTodo={hapusTodo}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Todos
