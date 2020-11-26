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
