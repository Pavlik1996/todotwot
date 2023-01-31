import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type PropsType = {
    oldTitle: string,
    callBack: (title: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onDoubleClickHandler()
    }

    return edit
        ? <input value={newTitle} autoFocus onChange={onChangeHandler} onBlur={onDoubleClickHandler}
                 onKeyDown={onKeyDownHandler}/>
        : <span onDoubleClick={onDoubleClickHandler}>{newTitle}</span>
};

