import React, {useEffect, useLayoutEffect, useRef} from 'react'

const ListTodos = (props) => {
    const box = useRef(null)
    const item = useRef(null)

    const beforeBox = ()=>{
        box.current.classList.add('-translate-y-5', 'opacity-0')
        box.current.classList.remove( 'h-16',)
        box.current.classList.add('h-0',)
    }
    const activeBox = ()=>{
        box.current.classList.remove( 'h-0',)
        box.current.classList.add('h-16',)
        setTimeout(() => {
            box.current.classList.remove('-translate-y-5', 'opacity-0')
        }, 150);
    }
    const leaveBox = ()=>{
        box.current.classList.add('-translate-y-5', 'opacity-0')
        setTimeout(() => {
            box.current.classList.remove( 'h-16',)
            box.current.classList.add('h-0',)
        }, 150);
    }

    useLayoutEffect(() => {
        beforeBox()
    }, [])
    useEffect(()=>{
        activeBox()
    },[])
    
    const hapusTodo_ = (val) => {
        leaveBox()
        setTimeout(() => {
            props.hapusTodo(val)
        }, 1000);
    }
    const doneHandle_ = (val) => {
        props.doneHandle(
            {
                id: val,
                isDone: true
            }
        )
    }
    return (
        <div ref={box} className='transform h-16 flex items-center transition-all duration-500 w-full overflow-hidden'>
            <div ref={item} className="border border-gray-500 shadow-lg flex items-center w-full justify-between rounded p-2">
                {
                    props.isDone ?
                    <del className='font-semibold'>{props.title}</del>:
                    <p className='font-semibold'>{props.title}</p>
                }
                <div className="text-white">
                    {
                        !props.isDone ?
                        <button onClick={()=>{doneHandle_(props.id)}} className="bg-blue-500 font-semibold mr-2 px-2 py-1 rounded shadow hover:bg-blue-800 transition-all duration-200">Done</button>:
                        <button className='bg-blue-500 mr-2 font-semibold opacity-50 cursor-not-allowed px-2 py-1 rounded'>Done</button>
                    }
                    <button onClick={()=>{hapusTodo_(props.id)}} className="bg-red-500 hover:bg-red-800 font-semibold rounded shadow py-1 px-2 transition-all duration-200">Hapus</button>
                </div>
            </div>
        </div>
    )
}

export default ListTodos
