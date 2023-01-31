import {v1} from "uuid";
import {useState} from "react";
import {FilterValueType, TodoListType} from "../App";
import {
    addTodoListAC,
    changeFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistReducer
} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    const todoID1 = v1()
    const todoID2 = v1()


    const startState: TodoListType[] = ([
        {id: todoID1, title: 'What to learn', filter: 'all'},
        {id: todoID2, title: 'What to buy', filter: 'all'},
    ])


    const endState = todolistReducer(startState, removeTodoListAC(todoID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoID2)
})

test('correct todolist should be added', () => {
    const todoID1 = v1()
    const todoID2 = v1()

    let newTodoListTitle = 'NEW TodoList'


    const startState: TodoListType[] = ([
        {id: todoID1, title: 'What to learn', filter: 'all'},
        {id: todoID2, title: 'What to buy', filter: 'all'},
    ])


    const endState = todolistReducer(startState, addTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})

test('correct todolist should change its name', () => {
    const todoID1 = v1()
    const todoID2 = v1()

    let newTodoListTitle = 'NEW TodoList'

    const startState: TodoListType[] = ([
        {id: todoID1, title: 'What to learn', filter: 'all'},
        {id: todoID2, title: 'What to buy', filter: 'all'},
    ])

    const endState = todolistReducer(startState, changeTodoListTitleAC(newTodoListTitle, todoID2))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)
})


test('correct todolist should change filter', () => {
    const todoID1 = v1()
    const todoID2 = v1()

    let newFilter: FilterValueType = 'completed'

    const startState: TodoListType[] = ([
        {id: todoID1, title: 'What to learn', filter: 'all'},
        {id: todoID2, title: 'What to buy', filter: 'all'},
    ])

    const endState = todolistReducer(startState, changeFilterAC(newFilter, todoID2))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})


