import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./addItemForm";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {Container, Grid, Paper} from "@mui/material";


type TodoListType = {
    id: string, title: string, filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string, title: string, isDone: boolean
}

type StateTasksType = {
    [key: string]: TaskType[]
}

function App() {

    const todoID1 = v1()
    const todoID2 = v1()

    const [todoList, setTodoList] = useState<TodoListType[]>([
        {id: todoID1, title: 'What to learn', filter: 'all'},
        {id: todoID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<StateTasksType>({
        [todoID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'REDUX', isDone: false},
        ],
        [todoID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Butter', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
            {id: v1(), title: 'Tea', isDone: false},
        ]
    })


    console.log('tasks', tasks)

    const changeStatusTask = (todoID: string, taskID: string, newIsDone: boolean) => {
        setTasks({...tasks, [todoID]: [...tasks[todoID].map(el => el.id === taskID ? {...el, isDone: newIsDone} : el)]})
    }

    const deleteTask = (todoID: string, taskID: string) => {
        setTasks({...tasks, [todoID]: [...tasks[todoID].filter(el => el.id !== taskID)]})
    }
    const deleteTodoList = (todoID: string) => {
        setTodoList(todoList.filter(el => el.id !== todoID))
        delete tasks[todoID]
    }
    const addTask = (todoID: string, newTitle: string) => {
        const newTask: TaskType = {id: v1(), title: newTitle, isDone: false}
        console.log('addTask', newTask)
        setTasks({...tasks, [todoID]: [newTask, ...tasks[todoID]]})
    }

    const changeFilter = (todoID: string, newFilter: FilterValueType) => {
        setTodoList(todoList.map(el => el.id === todoID ? {...el, filter: newFilter} : el))
    }
    const addTodoList = (title: string) => {
        const newTodoID = v1();
        const newTodo: TodoListType = {id: newTodoID, title: title, filter: "all"}
        setTodoList([newTodo, ...todoList])
        setTasks({...tasks, [newTodoID]: []})
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
                        News
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
