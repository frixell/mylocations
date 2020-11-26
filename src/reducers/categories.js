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
        
        default:
            return state;
    }
};