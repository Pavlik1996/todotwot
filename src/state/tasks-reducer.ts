import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC} from "./todolist-reducer";

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID].filter(el => el.id !== action.payload.taskID)
            }
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {
                ...state,
                [action.payload.todoID]: [newTask, ...state[action.payload.todoID]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID].map(el => el.id === action.payload.taskID ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        }
        case "CHANGE-TITLE-STATUS": {
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID].map(el => el.id === action.payload.taskID ? {
                    ...el,
                    title: action.payload.title
                } : el)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            // const copy = {...state}
            // delete copy[action.payload.id]
            // return copy
            let {[action.payload.id]: [], ...rest} = {...state}
            return rest
        }
        default:
            return state
    }
}

type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>


export const removeTaskAC = (taskID: string, todoID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {taskID, todoID}
    } as const
}


export const addTaskAC = (newTitle: string, todoID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {newTitle, todoID}
    } as const
}


export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {taskID, isDone, todoID}
    } as const
}

export const changeTaskTitleAC = (taskID: string, title: string, todoID: string) => {
    return {
        type: 'CHANGE-TITLE-STATUS',
        payload: {taskID, todoID, title}
    } as const
}

