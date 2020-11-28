import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        width: '60vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    bottonsContainer: {
        margin: 0,
        padding: 0,
        flexWrap: 'wrap',
        flexDirection: 'row',
        maxHeight: '120px',
        overflowY: 'auto'
    },
    header: {
        padding: 0,
        marginTop: '0.5rem',
        marginBottom: '0.5rem'
    },
    connectedButton: {
        color: '#fff',
        backgroundColor: '#3f51b5',
        margin: '0 0.5rem',
        cursor: 'default',
        textTransform: 'none',
        "&:hover": {
            backgroundColor: "#3f51b5"
        }
    },
    connectButton: {
        color: '#fff',
        backgroundColor: '#8cb53f',
        margin: '0 0.5rem',
        textTransform: 'none',
        "&:hover": {
            backgroundColor: "#b5683f"
        }
    },
    disconnectButton: {
        color: '#fff',
        backgroundColor: "#b53f51",
        margin: '0 0.5rem',
        textTransform: 'none',
        "&:hover": {
            backgroundColor: "#b5683f"
        }
    }
}));

export default function CategoriesConnector(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            
            {
                props.categories && (props.selectedLocation.categories.length < props.categories.length) &&
                <div className={classes.bottonsContainer}>
                    <h4>Connect to category:</h4>
                    {
                        props.categories.map((category, index) => {
                            if (!props.selectedLocation.categories.includes(category.name)) {
                                return (
                                    <Button key={index} className={classes.connectButton} type="button" onClick={props.connectLocation}>
                                        <div data-category={category.name}>{category.name}</div>
                                    </Button>
                                )
                            }
                            return null;
                        })
                    }
                </div>
            }
            
            {
                props.categories && props.selectedLocation.categories.length > 1 &&
                <div className={classes.bottonsContainer}>
                    <h4>Disconnect from category:</h4>
                    {
                        props.categories.map((category, index) => {
                            if (props.selectedLocation.categories.includes(category.name)) {
                                return (
                                    <Button key={index} className={classes.disconnectButton} type="button" onClick={props.disconnectLocation}>
                                        <div data-category={category.name}>{category.name}</div>
                                    </Button>
                                )
                            }
                            return null;
                        })
                    }
                </div>
            }
            
            {
                props.categories && props.selectedLocation.categories.length === 1 &&
                <div className={classes.bottonsContainer}>
                    <h4>Connected to: (at least 1 category in mandatory)</h4>
                    <Button className={classes.connectedButton} type="button">
                        <div data-category={props.selectedLocation.categories[0]}>{props.selectedLocation.categories[0]}</div>
                    </Button>
                </div>
            }
        </div>
    );
}
