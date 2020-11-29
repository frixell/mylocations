import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import List from '../components/List';
import Form from '../components/Form';
import MapBox from '../components/MapBox';
import MultiSelect from '../components/MultiSelect';

import { startAddCategory, startRemoveCategory, startEditCategory } from '../actions/categories';
import { startAddLocation, startRemoveLocation, startEditLocation, getLocations } from '../actions/locations';
import { startSetCurrentLocations } from '../actions/currentLocations';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#b5a33f',
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
    rootGrouped: {
        backgroundColor: '#b5a33f',
        borderRadius: 0,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        textTransform: 'none',
        cursor: 'default',
        "&:hover": {
            backgroundColor: "#b5a33f"
        }
    },
    rootLocation: {
        backgroundColor: '#8cb53f',
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
    rootLocationGrouped: {
        backgroundColor: '#8cb53f',
        borderRadius: 0,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0',
        paddingLeft: '8px',
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

    const categories = useSelector(state => state.categories);

    // TODO - change localStorage  to real DB
    localStorage.setItem('categories', JSON.stringify(categories));

    const locations = useSelector(state => state.locations);

    // TODO - change localStorage  to real DB
    localStorage.setItem('locations', JSON.stringify(locations));
    
    // context options: categoriesList, locationsList, categorySelected, locationSelected, categoryView, locationView
    
    const [currentLocations, setCurrentLocations] = useState(locations);
    const [selectedCategory, setSelectedCategory] = useState(undefined);
    const [selectedLocation, setSelectedLocation] = useState(undefined);
    const [formData, setFormData] = useState(JSON.stringify({}));
    const [isForm, setIsForm] = useState(false);
    const [isView, setIsView] = useState(false);
    const [currentContext, setCurrentContext] = useState('categoriesList')
    const [formError, setFormError] = useState([]);
    
    const [locationsOrder, setLocationsOrder] = useState(undefined);
    const [filterCategories, setFilterCategories] = useState([]);
    
    const [allowAddLocation, setAllowAddLocation] = useState(false);

    const setCategory = (e) => {
        setIsView(false);
        const name = e.target.dataset.name;
        setCurrentContext('categorySelected');
        const filteredLocations = locations.filter(location => location.categories?.includes(name));
        setCurrentLocations(filteredLocations);
        setSelectedCategory({name: name});
    }
    
    const setLocation = (e) => {
        const name = e.target.dataset.name;
        const newSelectedLocation = locations.filter(location => location.name === name);
        setCurrentContext('locationSelected');
        setSelectedLocation(newSelectedLocation[0]);
    }
    
    useEffect(() => {
        if (selectedCategory && (currentContext === 'categorySelected' || currentContext === 'categoryView' || currentContext === 'locationSelected')) {
            const filteredLocations = locations.filter(location => location.categories.length > 0 && location.categories?.includes(selectedCategory?.name));
            setCurrentLocations(filteredLocations || []);
            dispatch(startSetCurrentLocations(filteredLocations || []));
        } else if (locationsOrder === 'sort') {
            const sortedLocations = JSON.parse(JSON.stringify(locations)).sort((a, b) => a.name.localeCompare(b.name));
            setCurrentLocations(sortedLocations);
            dispatch(startSetCurrentLocations(sortedLocations));
        } else if (locationsOrder === 'group') {
            const groupedLocations = [];
            categories.map((category) => {
                groupedLocations.push(category)
                locations.map((location) => {
                    if (location.categories.includes(category.name)) groupedLocations.push(location);
                    return null;
                });
                return null;
            });
            setCurrentLocations(groupedLocations);
            dispatch(startSetCurrentLocations(locations));
        } else if (locationsOrder === 'filter') {
            if (filterCategories.length === 0) {
                setCurrentLocations(locations);
                dispatch(startSetCurrentLocations(locations));
            } else {
                const filteredLocations = [];
                locations.map(location => {                    
                    if (location.categories.filter(category => filterCategories.includes(category)).length > 0) filteredLocations.push(location);
                    return null;
                });
                setCurrentLocations(filteredLocations);
                dispatch(startSetCurrentLocations(filteredLocations));
            }
        } else {
            setCurrentLocations(locations);
            dispatch(startSetCurrentLocations(locations));
        }
    }, [categories, locations, selectedCategory, currentContext, locationsOrder, filterCategories, dispatch]);
    
      
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentContext === 'categoriesList' || currentContext === 'categorySelected') {
            if (!selectedCategory) {
                const newName = JSON.parse(formData).name;
                const newCategory = {
                    name: newName
                };
                const nameExists = categories.filter(category => category.name === newCategory.name);
                if (nameExists.length) {
                    setFormError(['Category name exists.']);
                } else {
                    dispatch(startAddCategory(newCategory));
                    hideForm();
                }
            } else {
                const parsedFormData = JSON.parse(formData);
                let categoryIndex = -1;
                categories.map((category, index) => {
                    if (category?.name === selectedCategory?.name) categoryIndex = index;
                    return null;
                });
                let nameExists = false;
                categories.map((category, index) => {
                    if (index !== categoryIndex && category.name === parsedFormData.name) nameExists = true;
                    return null;
                });
                if (nameExists) {
                    setFormError(['Category name exists.']);
                    return null;
                }
                dispatch(startEditCategory(parsedFormData, selectedCategory));
                setSelectedCategory(parsedFormData);
                if (parsedFormData.name !== selectedCategory.name) {
                    const tempLocations = [];
                    locations.map(location => {
                        const tempCategories = [];
                        location.categories.map(category => {
                            if (category === selectedCategory.name) {
                                tempCategories.push(parsedFormData.name);
                            } else {
                                tempCategories.push(category);
                            }
                            return null;
                        });
                        location.categories = tempCategories;
                        tempLocations.push(location);
                        return null;
                    })
                    dispatch(getLocations(tempLocations));
                }
                hideForm();
            }
        } else if (currentContext === 'categoryView' || currentContext === 'locationSelected') {
            if (!selectedLocation) {
                const newLocation = {
                    name: JSON.parse(formData).name,
                    address: JSON.parse(formData).address,
                    location: {lon: JSON.parse(formData).longitude || 0, lat: JSON.parse(formData).latitude || 0},
                    categories: [selectedCategory.name]
                };
                const nameExists = locations.filter(location => location.name === newLocation.name);
                if (nameExists.length) {
                    setFormError(['Location name exists.']);
                } else {
                    dispatch(startAddLocation(newLocation));
                    hideForm();
                }
            } else {
                const parsedFormData = JSON.parse(formData);
                let locationIndex = -1;
                locations.map((location, index) => {
                    if (location?.name === selectedLocation?.name) locationIndex = index;
                    return null;
                });
                let nameExists = false;
                locations.map((location, index) => {
                    if (index !== locationIndex && location.name === parsedFormData.name) nameExists = true;
                    return null;
                });
                if (nameExists) {
                    setFormError(['Location name exists.']);
                    return null;
                }
                const updatedLocation = {
                    name: parsedFormData.name,
                    address: parsedFormData.address,
                    location: {lon: parsedFormData.longitude || 0, lat: parsedFormData.latitude || 0},
                    categories: selectedLocation.categories
                }
                dispatch(startEditLocation(updatedLocation, selectedLocation));
                setSelectedLocation(updatedLocation);
                hideForm();
            }
        }
        
    }
    
    const addLocationFromMap = (location) => {
        if (!selectedLocation) {
            const parsedFormData = JSON.parse(formData);
            const nameExists = locations.map((location, index) => {
                if (location.name === parsedFormData.name) return true;
                return false;
            })[0];
            if (nameExists) {
                setFormError(['Location name exists.']);
                setIsForm(true);
                return;
            }
            const updatedLocation = {
                name: parsedFormData.name,
                address: parsedFormData.address,
                location: {lon: location.location.lon, lat: location.location.lat},
                categories: [selectedCategory.name]
            }
            
            dispatch(startAddLocation(updatedLocation));
            setAllowAddLocation(false);
        } else {
            const parsedFormData = JSON.parse(formData);
            const updatedLocation = {
                name: parsedFormData.name,
                address: parsedFormData.address,
                location: {lon: location.location.lon, lat: location.location.lat},
                categories: selectedLocation.categories
            }
            dispatch(startEditLocation(updatedLocation, selectedLocation));
            setSelectedLocation(updatedLocation);
            const updatedLocations = currentLocations.map(location => {
                if (location.name === selectedLocation.name) return updatedLocation;
                return location;
            });
            setCurrentLocations(updatedLocations);
            dispatch(startSetCurrentLocations(updatedLocations));
            setAllowAddLocation(false);
        }
        setFormData(JSON.stringify({}));
    }
    
    const clickMapToUpdate = () => {
        const parsedFormData = JSON.parse(formData);
        let locationIndex = -1;
        locations.map((location, index) => {
            if (location?.name === selectedLocation?.name) locationIndex = index;
            return null;
        });
        let nameExists = false;
        locations.map((location, index) => {
            if (index !== locationIndex && location.name === parsedFormData.name) nameExists = true;
            return null;
        });
        if (nameExists) {
            setFormError(['Location name exists.']);
            return null;
        }
        setFormError([]);
        setIsForm(false);
        setAllowAddLocation(true);
    }
    
    const cancelClickMapToUpdate = () => {
        setFormError([]);
        setIsForm(true);
        setAllowAddLocation(false);
    }
    
    const onFormDataChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        const formDataIm = JSON.parse(formData);
        formDataIm[id] = value;
        setFormError([]);
        setFormData(JSON.stringify(formDataIm));
    }
    
    const connectLocation = (e) => {
        const updatedLocation = JSON.parse(JSON.stringify(selectedLocation));
        const categoryToAdds = e.target.dataset.category;
        const updateCategories = updatedLocation.categories;
        updateCategories.push(categoryToAdds);
        updatedLocation.categories = updateCategories;
        dispatch(startEditLocation(updatedLocation, selectedLocation));
        setSelectedLocation(updatedLocation);
    }
    
    const disconnectLocation = (e) => {
        const updatedLocation = JSON.parse(JSON.stringify(selectedLocation));
        const categoryToRemove = e.target.dataset.category;
        if (updatedLocation.categories.length > 1) {
            let updateCategories = updatedLocation.categories.filter(c => c !== categoryToRemove);
            updatedLocation.categories = updateCategories;
            dispatch(startEditLocation(updatedLocation, selectedLocation));
            setSelectedLocation(updatedLocation);
        }
    }
    
    const clearFormError = () => {
        setFormError([]);
    }
    
    const newCategory = () => {
        setIsForm(true);
    }
    
    const newLocation = () => {
        setFormData(JSON.stringify({}));
        setIsForm(true);
    }
    
    const editCategory = () => {
        const transformedCategory = {
            name: selectedCategory.name
        };
        
        setFormData(JSON.stringify(transformedCategory))
        setIsForm(true);
    }
    
    const editLocation = () => {
        const transformedLocation = {
            name: selectedLocation.name,
            address: selectedLocation.address,
            longitude: selectedLocation.location?.lon || 0,
            latitude: selectedLocation.location?.lat || 0
        };
        setFormData(JSON.stringify(transformedLocation))
        setIsForm(true);
    }
    
    const viewCategory = () => {
        setIsView(false);
        setCurrentContext('categoryView');
    }
    
    const viewLocation = () => {
        if (currentContext === 'locationSelected') {
            setIsView(!isView);
        } else {
            setCurrentContext('locationView');
        }
    }
    
    const deleteCategory = () => {
        dispatch(startRemoveCategory(selectedCategory));
    }
    
    const deleteLocation = () => {
        dispatch(startRemoveLocation(selectedLocation));
    }
    
    const hideForm = () => {
        setIsForm(false);
        setFormError([]);
        setFormData(JSON.stringify({}));
    }
    
    const setContext = (e) => {
        const newContext = e.target.dataset.context;
        setIsForm(false);
        setLocationsOrder(undefined);
        setSelectedCategory(undefined);
        setSelectedLocation(undefined);
        setCurrentContext(newContext);
    }
    
    const sortLocations = () => {
        setLocationsOrder(locationsOrder !== 'sort' ? 'sort' : '');
    }
    
    const groupLocations = () => {
        setLocationsOrder(locationsOrder !== 'group' ? 'group' : '');
    }
    
    const filterLocations = () => {
        setLocationsOrder(locationsOrder !== 'filter' ? 'filter' : '');
    }
    
    const setFilterCategoriesFunc = (filters) => {
        setFilterCategories(filters);
    }
    
    return (
        <div className='categories__container'>
            {
                locationsOrder === 'filter' &&
                <div className="multiselect__container">
                    <MultiSelect categories={categories} setFilterCategories={setFilterCategoriesFunc} />
                </div>
            }
            
            {
                allowAddLocation &&
                <div className="click__to__add" onClick={cancelClickMapToUpdate}>
                    <h3>click map to update location or click here to cancel.</h3>
                </div>
            }
            
            <TopBar
                currentContext={currentContext}
                newCategory={newCategory}
                editCategory={editCategory}
                viewCategory={viewCategory}
                deleteCategory={deleteCategory}
                newLocation={newLocation}
                editLocation={editLocation}
                viewLocation={viewLocation}
                deleteLocation={deleteLocation}
                sortLocations={sortLocations}
                groupLocations={groupLocations}
                filterLocations={filterLocations}
                selectedItem={selectedLocation || selectedCategory} 
            />
            
            
            <div className="list__map__container">
                { 
                    (currentContext === 'categoriesList' || currentContext === 'categorySelected') && 
                    <List
                        currentContext={currentContext}
                        emptyText="No categories found!"
                        setItem={setCategory} 
                        listItems={categories} 
                        selectedItem={selectedCategory} 
                        classes={classes} 
                    />
                }
                { 
                    (currentContext === 'locationsList' || currentContext === 'locationSelected' || currentContext === 'categoryView') && 
                    <List 
                        emptyText="No locations found!"
                        setItem={setLocation} 
                        listItems={currentLocations} 
                        selectedItem={selectedLocation} 
                        classes={classes}
                        currentContext={currentContext}
                        locationsOrder={locationsOrder}
                    />
                }
                <MapBox 
                    user={props.user}
                    locations={currentLocations}
                    follow={false}
                    currentX={0}
                    currentY={0}
                    currentAcc={0}
                    selectedProject={selectedLocation}
                    sidebarClickedItemId={undefined}
                    allowAddLocation={allowAddLocation}
                    lang={'en'}
                    isView={isView}
                    addLocationFromMap={addLocationFromMap}
                    handleExpandBolard={() => {}}
                />
            </div>
            { 
                isForm && 
                <Form
                    formData={JSON.parse(JSON.stringify(formData))}
                    currentContext={currentContext}
                    formError={formError}
                    clearFormError={clearFormError}
                    hideForm={hideForm}
                    onFormDataChange={onFormDataChange}
                    handleSubmit={handleSubmit} 
                    categories={selectedLocation && categories}
                    selectedLocation={selectedLocation}
                    connectLocation={connectLocation}
                    disconnectLocation={disconnectLocation}
                    clickMapToUpdate={clickMapToUpdate}
                /> 
            }
            <BottomBar
                currentContext={"selectPage"}
                setContext={setContext}
            />
        </div>
    );
};

export default CategoriesPage;