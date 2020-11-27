import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { template } from 'lodash';
import { Cfg } from '../config/formCfg';

const useStyles = makeStyles(() => ({
    root: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: '15010',
        background: '#fff',
        marginTop: '64px',
        width: '100vw',
        height: 'calc(100vh - 64px - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '& .MuiTextField-root': {
            width: '40vw',
        }
    }
}));

export default function Form(props) {
    const classes = useStyles();
    const [formData, setFormData] = useState(undefined);

    useEffect(() => {
        setFormData(JSON.parse(props.formData));
    }, [props.formData]);

    const reset = () => {
        props.clearFormError();
    };
  
    const fields = JSON.parse(template(JSON.stringify(Cfg[props.currentContext].fields))({'name': formData?.name, 'address': formData?.address, 'longitude': formData?.longitude, 'latitude': formData?.latitude, 'formError': props.formError}));
  
    return (
        <form className={classes.root} autoComplete="off" onSubmit={props.handleSubmit}>
            <div className="form__header__container">
                <h1 className="form__header">{Cfg[props.currentContext].header}</h1>
                <IconButton onClick={props.hideForm} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </div>
            {
                fields?.map((field, index) => {
                    return (
                        <TextField
                            key={index}
                            error={!!props.formError}
                            required={field.required}
                            id={field.id}
                            label={field.label}
                            placeholder={field.placeholder}
                            helperText={props.formError}
                            onChange={props[field.onChange]}
                            value={field.value}
                            variant="filled"
                        />
                    );
                })
            }
            
            <div>
                <Button disabled={!!props.formError || props.formData.name === ''} type="submit">
                    Submit
                </Button>
                <Button disabled={props.formData.name === ''} type="button" onClick={reset}>
                    Clear
                </Button>
            </div>
        </form>
    );
}
