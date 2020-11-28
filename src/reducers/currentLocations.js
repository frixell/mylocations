// Current Locations Reducer

const currentLocationsReducerDefaultState = [];

export default function currentLocationsReducer(state = currentLocationsReducerDefaultState, action) {
    let currentLocations = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'SET_CURRENT_LOCATIONS':
            currentLocations = action.locations;
            return currentLocations;
            
        default:
            return state;
    }
};