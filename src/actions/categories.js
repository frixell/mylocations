// GET_CATEGORIES

export const getCategories = (categories) => ({
    type: "GET_CATEGORIES",
    categories
});

export const startGetCategories = () => {
    return (dispatch) => {
        // TODO - change localStorage to real DB
        const categories = JSON.parse(localStorage.getItem('categories'));
        dispatch(getCategories(categories || []));
        return Promise.resolve();
    };
};

// ADD_CATEGORY

export const addCategory = (category) => ({
    type: 'ADD_CATEGORY',
    category
});

export const startAddCategory = (categoryData = {}) => {
    return (dispatch) => {
        const {
            name = ''
        } = categoryData;
        const category = {name};
        dispatch(addCategory(category));
    };
};

// REMOVE_CATEGORY

export const removeCategory = (category) => ({
    type: 'REMOVE_CATEGORY',
    category
});

export const startRemoveCategory = (categoryData = {}) => {
    return (dispatch) => {
        const {
            name = ''
        } = categoryData;
        const category = {name};
        dispatch(removeCategory(category));
    };
};

// EDIT_CATEGORY

export const editCategory = (category, categoryOrg) => ({
    type: 'EDIT_CATEGORY',
    category,
    categoryOrg
});

export const startEditCategory = (category, categoryOrg) => {
    return (dispatch) => {
        dispatch(editCategory(category, categoryOrg));
    };
};