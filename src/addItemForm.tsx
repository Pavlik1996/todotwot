import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
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
        maxHeight: '39px',
        minHeight: '39px',
        maxWidth: '39px',
        minWidth: '39px',
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.code === "Enter") addTask()
    }

    return (
        <div>
            <TextField
                onKeyUp={onKeyUpHandler}
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

