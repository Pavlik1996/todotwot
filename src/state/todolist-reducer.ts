import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";


const initialState: TodoListType[] = []

export const todolistReducer = (state = initialState, action: TodoListActionsType):TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodo: TodoListType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
            return [...state, newTodo]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}


type TodoListActionsType = removeTodoListACType | addTodoListACType | changeTodoListTitleACType | changeFilterACType

type removeTodoListACType = ReturnType<typeof removeTodoListAC>

export const removeTodoListAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}


type addTodoListACType = ReturnType<typeof addTodoListAC>

export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title, todolistId: v1()
        }
    } as const
}

type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>

export const changeTodoListTitleAC = (title: string, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            title, id
        }
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (filter: FilterValueType, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            filter, id
        }
    } as const
}

