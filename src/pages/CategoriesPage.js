import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../components/TopBar';
import List from '../components/List';
import Form from '../components/Form';
import { startAddCategory } from '../actions/categories';

const useStyles = makeStyles({
    root: {
        background: '#b5a33f',
        borderRadius: 0,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        textTransform: 'none',
        "&:hover": {
            backgroundColor: "#b5683f"
        }
    },
    label: {
        padding: '0',
        width: '100%',
        height: '100%'
    },
});

const CategoriesPage = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const categories = useSelector(state => state.categories)
    // TODO - change localStorage  to real DB
    localStorage.setItem('categories', JSON.stringify(categories));
    const [selectedCategory, setSelectedCategory] = useState(undefined);
    const [currentScreen, setCurrentScreen] = useState('categoriesList');
    const [currentContext, setCurrentContext] = useState('categoriesList')
    const [formError, setFormError] = useState('');

    const setCategory = (e) => {
        const name = e.target.dataset.name;
        setCurrentContext('categorySelected');
        setSelectedCategory(name);
    }
    
    const handleSubmit = (name) => {
        const newCategory = {
            name: name
        };
        const nameExists = categories.filter(category => category.name === newCategory.name);
        if (nameExists.length) {
            setFormError('Category name exists.');
        } else {
            dispatch(startAddCategory(newCategory));
            localStorage.removeItem('categories');
            hideForm();
        }
    }
    
    const clearFormError = () => {
        setFormError('');
    }
    
    const newCategory = () => {
        setSelectedCategory(undefined);
        setCurrentScreen('addNewCategory');
    }
    
    const editCategory = () => {
        console.log('edit');
    }
    
    const viewCategory = () => {
        console.log('view');
    }
    
    const deleteCategory = () => {
        console.log('delete');
    }
    
    const hideForm = () => {
        setCurrentContext('categoriesList');
        setCurrentScreen('categoriesList');
    }

    return (
        <div className='categories__container'>
            <TopBar
                currentContext={currentContext}
                newCategory={newCategory}
                editCategory={editCategory}
                viewCategory={viewCategory}
                deleteCategory={deleteCategory}
                selectedCategory={selectedCategory} 
            />
            
            { 
                currentScreen === 'categoriesList' && 
                <List 
                    emptyText="No categories found!"
                    setCategory={setCategory} 
                    listItems={categories} 
                    selectedItem={selectedCategory} 
                    classes={classes} 
                /> 
            }
            { 
                currentScreen === 'addNewCategory' && 
                <Form 
                    formError={formError}
                    clearFormError={clearFormError}
                    hideForm={hideForm} 
                    handleSubmit={handleSubmit} 
                /> 
            }
        </div>
    );
};

export default CategoriesPage;