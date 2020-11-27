import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Cfg } from '../config/bottomBarCfg';

const useStyles = makeStyles(theme => ({
    appBar: {
      top: 'auto',
      bottom: 0,
      '& .MuiToolbar-root': {
            justifyContent: 'center'
      },
      '& .MuiButton-text': {
            marginLeft: '1rem',
            marginRight: '1rem'
  }
    }
  }));

export default function BottomBar(props) {
    const buttons = Cfg[props.currentContext].buttons;
    const classes = useStyles();
    return (
        <div className="bottombar__container">
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {
                      buttons.map((button,index) => {
                        return (
                            <Button
                              key={index}
                              onClick={props[button.action]}
                            >
                                <div data-context={button.context} className={button.className}>{button.text}</div>
                            </Button>
                        )
                      })
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
