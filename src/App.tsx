import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./addItemForm";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type TodoListType = {
    id: string, title: string, filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string, title: string, isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const dispatch = useDispatch()

    const todoList = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const changeStatusTask = (todoID: string, taskID: string, newIsDone: boolean) => {
        dispatch(changeTaskStatusAC(taskID, newIsDone, todoID))
    }

    const deleteTask = (todoID: string, taskID: string) => {
        dispatch(removeTaskAC(taskID, todoID))
    }

    const deleteTodoList = (todoID: string) => {
        const action = removeTodoListAC(todoID)
        dispatch(action)
    }

    const addTask = (todoID: string, newTitle: string) => {
        dispatch(addTaskAC(newTitle, todoID))
    }

    const changeFilter = (todoID: string, newFilter: FilterValueType) => {
        dispatch(changeFilterAC(newFilter, todoID))
    }

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }

    const updateTodo = (todoID: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(newTitle, todoID))
    }

    const updateTask = (todoID: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todoID))
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        My ToDo
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoList.map(el => {
                            const filterTask = () => {
                                switch (el.filter) {
                                    case "completed":
                                        return tasks[el.id].filter(el => el.isDone)
                                    case "active": {
                                        return tasks[el.id].filter(el => !el.isDone)
                                    }
                                    default:
                                        return tasks[el.id]
                                }
                            }

                            const filteredTask = filterTask()

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={el.id}
                                        task={filteredTask}
                                        id={el.id}
                                        title={el.title}
                                        filter={el.filter}
                                        changeStatusTask={changeStatusTask}
                                        deleteTask={deleteTask}
                                        deleteTodoList={deleteTodoList}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        updateTodo={updateTodo}
                                        updateTask={updateTask}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
