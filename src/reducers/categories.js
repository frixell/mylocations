// Points Reducer

const categoriesReducerDefaultState = [];

export default function categoriesrReducer(state = categoriesReducerDefaultState, action) {
    let categories = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        
        case 'GET_CATEGORIES':
                categories = action.categories;
            return categories;
    
        case 'ADD_CATEGORY':
            return [
                ...categories,
                action.category
            ];
            
        case 'EDIT_CATEGORY':
            const newCategories = categories.map((category) => {
                if (category.name === action.categoryOrg.name) category = action.category;
                return category;
            });
            return newCategories;
            
        case 'REMOVE_CATEGORY':
            const remainingCategories = categories.filter(category => category.name !== action.category.name);
            return remainingCategories;
        
        default:
            return state;
    }
};