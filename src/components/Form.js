import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiTextField-root': {
            width: '40vw',
        },
    }
}));

export default function Form(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(name);
  };
  const updateName = (e) => {
        if(props.formError) props.clearFormError();
        setName(e.target.value);
  };
  const reset = () => {
        props.clearFormError();
        setName("");
  };
  
  return (
    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <div className="form__header__container">
            <h1 className="form__header">Add a new category:</h1>
            <IconButton onClick={props.hideForm} aria-label="close">
                <CloseIcon />
            </IconButton>
        </div>
        
        <TextField
            error={!!props.formError}
            required
            id="filled-required"
            label="Category Name - Required"
            placeholder="Enter Category Name"
            helperText={props.formError}
            onChange={updateName}
            value={name}
            variant="filled"
        />
        <div>
            <Button disabled={!!props.formError || name === ''} type="submit">
                Submit
            </Button>
            <Button disabled={name === ''} type="button" onClick={reset}>
                Clear
            </Button>
        </div>
    </form>
  );
}
