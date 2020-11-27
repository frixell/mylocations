export const Cfg = {
    categoriesList: {
        header: `Categories`,
        buttons: [
            {
                text: `New Category`,
                className: `topbar__button`,
                action: `newCategory`
            }
        ]
    },
    categorySelected: {
        buttons: [
            {
                text: `edit`,
                className: `topbar__button`,
                action: `editCategory`,
                dataName: `<%= name %>`
            },
            {
                text: `view`,
                className: `topbar__button`,
                action: `viewCategory`,
                dataName: `<%= name %>`
            },
            {
                text: `delete`,
                className: `topbar__button`,
                action: `deleteCategory`,
                dataName: `<%= name %>`
            }
        ]
    },
    categoryView: {
        buttons: [
            {
                text: `New Location`,
                className: `topbar__button`,
                action: `newLocation`
            }
        ]
    },
    locationsList: {
        header: `Locations`,
        buttons: [
            {
                text: `sort`,
                className: `topbar__button`,
                action: `sortLocations`,
                dataName: `<%= name %>`
            },
            {
                text: `group`,
                className: `topbar__button`,
                action: `groupLocations`,
                dataName: `<%= name %>`
            },
            {
                text: `filter`,
                className: `topbar__button`,
                action: `filterLocations`,
                dataName: `<%= name %>`
            }
        ]
    },
    locationSelected: {
        buttons: [
            {
                text: `edit`,
                className: `topbar__button`,
                action: `editLocation`,
                dataName: `<%= name %>`
            },
            {
                text: `view`,
                className: `topbar__button`,
                action: `viewLocation`,
                dataName: `<%= name %>`
            },
            {
                text: `delete`,
                className: `topbar__button`,
                action: `deleteLocation`,
                dataName: `<%= name %>`
            }
        ]
    }
}