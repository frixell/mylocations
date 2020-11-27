import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        width: 300
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(category, filterCategories, theme) {
    return {
        color: '#fff',
        fontWeight:
            filterCategories.indexOf(category) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
        background:
            filterCategories.indexOf(category) === -1
            ? '#b5a33f'
            : '#3f51b5'
    };
  }

export default function MultiSelect(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [filterCategories, setFilterCategories] = React.useState([]);

    const handleChange = event => {
        setFilterCategories(event.target.value);
        props.setFilterCategories(event.target.value);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">Filter by categories</InputLabel>
                <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    value={filterCategories}
                    onChange={handleChange}
                    input={<Input />}
                    MenuProps={MenuProps}
                >
                    {props.categories?.map((category, index) => (
                        <MenuItem key={index} value={category.name} style={getStyles(category.name, filterCategories, theme)}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}