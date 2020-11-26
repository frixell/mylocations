import React from 'react';
import Button from '@material-ui/core/Button';

export default function List(props) {
  return (
    <div className="list__container">
        {
            props.listItems.map((item, index) => {
                const buttonClassName = `list__item__button${props.selectedItem === item.name ? ' list__item__button--selected' : ''}`;
                return (
                    <Button
                        key={index}
                        classes={{root: props.classes.root, label: props.classes.label}}
                        variant="contained"
                        onClick={props.setCategory}>
                            <div
                                className={buttonClassName}
                                data-name={item.name}>
                                    {item.name}
                            </div>
                    </Button>
                );
            })
        }
    </div>
  );
}
