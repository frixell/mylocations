// Locations Reducer

const locationsReducerDefaultState = [];

export default function locationsReducer(state = locationsReducerDefaultState, action) {
    let locations = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        
        case 'GET_LOCATIONS':
                locations = action.locations;
            return locations;
    
        case 'ADD_LOCATION':
            return [
                ...locations,
                action.location
            ];
            
        case 'EDIT_LOCATION':
            const newLocations = locations.map((location) => {
                if (location.name === action.locationOrg.name) location = action.location;
                return location;
            });
            return newLocations;
            
        case 'REMOVE_LOCATION':
            const remainingLocations = locations.filter(location => location.name !== action.location.name);
            return remainingLocations;
        
        default:
            return state;
    }
};