import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { template } from 'lodash';
import { Cfg } from '../config/formCfg';
import CategoriesConnector from './CategoriesConnector';

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
    },
    mapButton: {
        color: '#fff',
        backgroundColor: '#3f51b5',
        margin: '0 0.5rem',
        textTransform: 'none',
        "&:hover": {
            backgroundColor: "#b5683f"
        }
    },
    mainButton: {
        color: '#fff',
        backgroundColor: '#8cb53f',
        margin: '0 0.5rem',
        textTransform: 'none',
        "&:hover": {
            backgroundColor: "#b5683f"
        }
    },
}));

export default function Form(props) {
    const classes = useStyles();
    const [formData, setFormData] = useState(undefined);
    
    useEffect(() => {
        setFormData(JSON.parse(props.formData));
    }, [props.formData]);

    const fields = JSON.parse(template(JSON.stringify(Cfg[props.currentContext]?.fields || []))({'name': formData?.name, 'address': formData?.address, 'longitude': formData?.longitude, 'latitude': formData?.latitude, 'formError': props.formError}));
  
    let mainDisabled = props.formData?.name === '';
    let mapDisabled = false;
    if (props.currentContext === 'locationSelected' || props.currentContext === 'categoryView') {
        mainDisabled = !(formData?.name !== '' && formData?.address !== '' && formData?.longitude !== '' && formData?.latitude !== '');
        mapDisabled = !(formData?.name !== '' && formData?.address !== '');
    }
    return (
        <form className={classes.root} autoComplete="off" onSubmit={props.handleSubmit}>
            <div className="form__header__container">
                <h1 className="form__header">{Cfg[props.currentContext]?.header || ""}</h1>
                <IconButton onClick={props.hideForm} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </div>
            {
                fields?.map((field, index) => {
                    return (
                        <TextField
                            key={index}
                            error={!!props.formError[index]}
                            required={field.required}
                            id={field.id}
                            label={field.label}
                            placeholder={field.placeholder}
                            helperText={props.formError[index]}
                            onChange={props[field.onChange]}
                            value={field.value}
                            variant="filled"
                        />
                    );
                })
            }
            
            <div className='form__buttons__container'>
                <Button
                    className={classes.mainButton}
                    disabled={props.formError.length > 0 || mainDisabled}
                    type="submit"
                >
                    {props.categories ? 'Update' : 'Submit'}
                </Button>
                {
                    (props.currentContext === 'locationSelected' || props.currentContext === 'categoryView') &&
                    <div className='form__buttons__container form__buttons__container--no-margin'>
                        <h3> or </h3>
                        <Button
                            className={classes.mapButton}
                            disabled={props.formError.length > 0 || mapDisabled}
                            type="button"
                            onClick={props.clickMapToUpdate}
                        >
                            Click map to update
                        </Button>
                    </div>
                }
                
            </div>
            {
                props.categories &&
                <CategoriesConnector
                    categories={props.categories}
                    selectedLocation={props.selectedLocation}
                    connectLocation={props.connectLocation}
                    disconnectLocation={props.disconnectLocation}
                />
            }
            
        </form>
    );
}
