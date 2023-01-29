import React, {ChangeEvent, useState} from 'react';
import {FilterValueType} from "./App";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


type PropsType = {
    addItem: (newTitle: string) => void
}

export const AddItemForm = (props: PropsType) => {

    const [newTitle, setNewTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(null)
    }

    const addTask = () => {
        if (newTitle.trim()) {
            props.addItem(newTitle);
        } else setError('Please enter title')
        setNewTitle("");
    }

    const styleButton = {
        maxHeight: '38px',
        minHeight: '38px',
        maxWidth: '38px',
        minWidth: '38px',
    }

    return (
        <div>
            <TextField
                error={!!error}
                size={'small'}
                id="standard-basic"
                label={error ? error : "Type title" }
                variant="outlined"
                onChange={onChangeHandler}
                value={newTitle}
            />
            <Button style={styleButton} size={'small'} variant="contained" onClick={addTask}>+</Button>
        </div>
    );
};

