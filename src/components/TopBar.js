import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Cfg } from '../config/topBarCfg';

export default function TopBar(props) {
    const buttons = Cfg[props.currentContext]?.buttons || [];
    return (
        <div className="topbar__container">
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className="topbar__title">
                        { !props.selectedItem ? Cfg[props.currentContext]?.header : props.selectedItem?.name }
                    </Typography>
                    {
                      buttons.map((button,index) => {
                        return (
                            <Button
                              key={index}
                              onClick={props[button.action]}
                            >
                                <div className={button.className}>{button.text}</div>
                            </Button>
                        )
                      })
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
