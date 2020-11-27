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
import { startAddLocation, startRemoveLocation, startEditLocation } from '../actions/locations';

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
    rootGrouped: {
        background: '#b5a33f',
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
        background: '#8cb53f',
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
        background: '#8cb53f',
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
    const [currentContext, setCurrentContext] = useState('categoriesList')
    const [formError, setFormError] = useState('');
    
    const [locationsOrder, setLocationsOrder] = useState(undefined);
    const [filterCategories, setFilterCategories] = useState([]);

    const setCategory = (e) => {
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
        if (currentContext === 'categorySelected' || currentContext === 'categoryView' || currentContext === 'locationSelected') {
            const filteredLocations = locations.filter(location => location.categories?.includes(selectedCategory?.name));
            setCurrentLocations(filteredLocations);
        } else if (locationsOrder === 'sort') {
            const sortedLocations = JSON.parse(JSON.stringify(locations)).sort((a, b) => a.name.localeCompare(b.name));
            setCurrentLocations(sortedLocations);
        } else if (locationsOrder === 'group') {
            const groupedLocations = [];
            categories.map((category) => {
                groupedLocations.push(category)
                locations.map((location) => {
                    if (location.categories.includes(category.name)) groupedLocations.push(location);
                });
            });
            setCurrentLocations(groupedLocations);
        } else if (locationsOrder === 'filter') {
            if (filterCategories.length === 0) {
                setCurrentLocations(locations);
            } else {
                const filteredLocations = [];
                locations.map(location => {                    
                    if (location.categories.filter(category => filterCategories.includes(category)).length > 0) filteredLocations.push(location);
                });
                setCurrentLocations(filteredLocations);
            }
        } else {
            setCurrentLocations(locations);
        }
        
    }, [categories, locations, selectedCategory, currentContext, locationsOrder, filterCategories]);
    
      
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
                    setFormError('Category name exists.');
                } else {
                    dispatch(startAddCategory(newCategory));
                    // localStorage.removeItem('categories');
                    hideForm();
                }
            } else {
                dispatch(startEditCategory(JSON.parse(formData), selectedCategory));
                setSelectedCategory(JSON.parse(formData));
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
                    setFormError('Location name exists.');
                } else {
                    dispatch(startAddLocation(newLocation));
                    // localStorage.removeItem('categories');
                    hideForm();
                }
            } else {
                const parsedFormData = JSON.parse(formData);
                const updatedLocation = {
                    name: parsedFormData.name,
                    address: parsedFormData.address,
                    location: {lon: parsedFormData.longitude || 0, lat: parsedFormData.latitude || 0},
                    // TODO - add multi-categories option
                    categories: selectedLocation.categories
                }
                dispatch(startEditLocation(updatedLocation, selectedLocation));
                setSelectedLocation(updatedLocation);
                hideForm();
            }
        }
        setFormData(JSON.stringify({}));
    }
    
    const clearFormError = () => {
        setFormError('');
    }
    
    const newCategory = () => {
        setIsForm(true);
    }
    
    const newLocation = () => {
        setIsForm(true);
    }
    
    const onFormDataChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        const formDataIm = JSON.parse(formData);
        formDataIm[id] = value;
        setFormData(JSON.stringify(formDataIm));
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
        setCurrentContext('categoryView');
    }
    
    const viewLocation = () => {
        setCurrentContext('locationView');
    }
    
    const deleteCategory = () => {
        dispatch(startRemoveCategory(selectedCategory));
    }
    
    const deleteLocation = () => {
        dispatch(startRemoveLocation(selectedLocation));
    }
    
    const hideForm = () => {
        setIsForm(false);
    }
    
    const setContext = (e) => {
        const newContext = e.target.dataset.context;
        setLocationsOrder(undefined);
        setSelectedCategory(undefined);
        setSelectedLocation(undefined);
        setCurrentContext(newContext);
    }
    
    const sortLocations = () => {
        setLocationsOrder('sort');
    }
    
    const groupLocations = () => {
        setLocationsOrder('group');
    }
    
    const filterLocations = () => {
        setLocationsOrder('filter');
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
                    divings={currentLocations}
                    follow={false}
                    currentX={0}
                    currentY={0}
                    currentAcc={0}
                    selectedProject={selectedLocation}
                    sidebarClickedItemId={undefined}
                    allowAddBolard={false}
                    allowAddDiving={false}
                    lang={'en'}
                    addBolard={() => {}}
                    addDiving={() => {}}
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