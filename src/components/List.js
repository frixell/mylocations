import React from 'react';
import Button from '@material-ui/core/Button';

export default function List(props) {
    return (
        <div className="list__container">
            {
                props.listItems.length > 0 ?
                    props.listItems.map((item, index) => {
                        const buttonClassName = `list__item__button${props.selectedItem?.name === item.name && (item.address || props.locationsOrder !== 'group') ? ' list__item__button--selected' : ''}`;
                        const buttonRootClassName = item.address ? props.locationsOrder === 'group' ? props.classes.rootLocationGrouped : props.classes.rootLocation : props.locationsOrder === 'group' ? props.classes.rootGrouped : props.classes.root;
                        const buttonOnClick = !item.address && props.locationsOrder === 'group' ? null : props.setItem;
                        const disableRipple = !item.address && props.locationsOrder === 'group' ? true : false;
                        return (
                            <Button
                                disableRipple={disableRipple}
                                key={index}
                                classes={{root: buttonRootClassName, label: props.classes.label}}
                                variant="contained"
                                onClick={buttonOnClick}>
                                    <div
                                        className={buttonClassName}
                                        data-name={item.name}>
                                            {item.name}
                                    </div>
                            </Button>
                        );
                    })
                :
                    <p className="list__empty">{props.emptyText}</p>
            }
        </div>
    );
}
