import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./App";
import './App.css';
import {AddItemForm} from "./addItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';


type PropsType = {
    task: TaskType[]
    id: string
    title: string
    filter: FilterValueType
    changeStatusTask: (todoID: string, taskID: string, newIsDone: boolean) => void
    deleteTask: (todoID: string, taskID: string) => void
    deleteTodoList: (todoID: string) => void
    addTask: (todoID: string, newTitle: string) => void
    changeFilter: (todoID: string, newFilter: FilterValueType) => void
}

export const TodoList = (props: PropsType) => {

        const onClickHandler = () => {
            props.deleteTodoList(props.id)
        }
        const onClickGetFilter = (filter: FilterValueType) => {
            props.changeFilter(props.id, filter)
        }
        const addTaskHandler = (newTitle: string) => {
            props.addTask(props.id, newTitle)
        }
        return (
            <div>
                <h3>
                    <EditableSpan oldTitle={props.title}/>
                    <IconButton aria-label="delete" onClick={onClickHandler}>
                        <DeleteIcon/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskHandler}/>
                <ul>
                    {props.task.length ?
                        props.task.map(el => {
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatusTask(props.id, el.id, e.currentTarget.checked)
                            }
                            const onClickHandler = () => {
                                props.deleteTask(props.id, el.id)
                            }
                            return (
                                <li key={el.id}>
                                    <Checkbox checked={el.isDone}
                                              onChange={onChangeHandler}/>
                                    <EditableSpan oldTitle={el.title}/>
                                    <IconButton aria-label="delete" onClick={onClickHandler}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </li>
                            )
                        }) : <span>task list is empty</span>}
                    <div>
                        <Button variant={props.filter === 'all' ? 'outlined' : 'contained'} color={'success'}
                                onClick={() => onClickGetFilter("all")}>all</Button>
                        <Button variant={props.filter === 'active' ? 'outlined' : 'contained'} color={'secondary'}
                                onClick={() => onClickGetFilter("active")}>active</Button>
                        <Button variant={props.filter === 'completed' ? 'outlined' : 'contained'} color={'error'}
                                onClick={() => onClickGetFilter("completed")}>completed</Button>
                    </div>
                </ul>
            </div>
        );
    }
;
