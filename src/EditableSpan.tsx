import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldTitle: string
}

export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)

    const onDoubleClickHandler = () => {
        setEdit(!edit)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }


    return edit
        ? <input value={newTitle} autoFocus onChange={onChangeHandler} onBlur={onDoubleClickHandler}/>
        : <span onDoubleClick={onDoubleClickHandler}>{newTitle}</span>
};

