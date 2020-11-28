// GET_LOCATIONS

export const getLocations = (locations) => ({
    type: "GET_LOCATIONS",
    locations
});

export const startGetLocations = () => {
    return (dispatch) => {
        // TODO - change localStorage to real DB
        const locations = JSON.parse(localStorage.getItem('locations'));
        dispatch(getLocations(locations || []));
        return Promise.resolve();
    };
};

// ADD_LOCATION

export const addLocation = (location) => ({
    type: 'ADD_LOCATION',
    location
});

export const startAddLocation = (locationData = {}) => {
    return (dispatch) => {
        const {
            name = '',
            address = '',
            location = [],
            categories = []
        } = locationData;
        const newLocation = {name, address, location, categories};
        dispatch(addLocation(newLocation));
    };
};

// REMOVE_LOCATION

export const removeLocation = (location) => ({
    type: 'REMOVE_LOCATION',
    location
});

export const startRemoveLocation = (locationData = {}) => {
    return (dispatch) => {
        const {
            name = ''
        } = locationData;
        const location = {name};
        dispatch(removeLocation(location));
    };
};

// EDIT_LOCATION

export const editLocation = (location, locationOrg) => ({
    type: 'EDIT_LOCATION',
    location,
    locationOrg
});

export const startEditLocation = (location, locationOrg) => {
    return (dispatch) => {
        dispatch(editLocation(location, locationOrg));
    };
};

// CONNECT_TO_CATEGORY

export const connectToCategory = (location, category) => ({
    type: 'CONNECT_TO_CATEGORY',
    location,
    category
});

export const startConnectToCategory = (location, category) => {
    return (dispatch) => {
        dispatch(connectToCategory(location, category));
    };
};

// DISCONNECT_FROM_CATEGORY

export const disconnectFromCategory = (location, category) => ({
    type: 'DISCONNECT_FROM_CATEGORY',
    location,
    category
});

export const startDisconnectFromCategory = (location, category) => {
    return (dispatch) => {
        dispatch(disconnectFromCategory(location, category));
    };
};