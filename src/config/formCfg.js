export const Cfg = {
    categoriesList: {
        header: `Add a new category:`,
        className: `update__fender__form`,
        fields: [
            {
                id: `name`,
                label: `Category Name - Required`,
                required: true,
                placeholder: `Enter Category Name`,
                helperText: `<%= formError %>`,
                onChange: `onFormDataChange`,
                value: `<%= name %>`
            }
        ]
    },
    categorySelected: {
        header: `Edit category:`,
        className: `update__fender__form`,
        fields: [
            {
                id: `name`,
                label: `Name - Required`,
                required: true,
                placeholder: `Enter Category Name`,
                helperText: `<%= formError %>`,
                onChange: `onFormDataChange`,
                value: `<%= name %>`
            }
        ]
    },
    categoryView: {
        header: `Add a new location:`,
        className: `update__fender__form`,
        fields: [
            {
                id: `name`,
                label: `Name - required`,
                required: true,
                placeholder: `Enter Location Name`,
                helperText: `<%= formError %>`,
                onChange: `onFormDataChange`,
                value: `<%= name %>`
            },
            {
                id: `address`,
                label: `Address - required`,
                required: true,
                placeholder: `Enter Location Address`,
                helperText: `<%= formError %>`,
                onChange: `onFormDataChange`,
                value: `<%= address %>`
            },
            {
                id: `longitude`,
                label: `Longitude`,
                required: false,
                placeholder: `Enter Location Longitude`,
                helperText: `<%= formError %>`,
                onChange: `onFormDataChange`,
                value: `<%= longitude %>`
            },
            {
                id: `latitude`,
                label: `Latitude`,
                required: false,
                placeholder: `Enter Location Latitude`,
                helperText: `<%= formError %>`,
                onChange: `onFormDataChange`,
                value: `<%= latitude %>`
            }
        ]
    },
    locationSelected: {
        header: `Edit location:`,
        className: `update__fender__form`,
        fields: [
            {
                id: `name`,
                label: `Name - required`,
                required: true,
                placeholder: `Enter Location Name`,
                helperText: `<%= formError %>`,
                onChange: `onFormDataChange`,
                value: `<%= name %>`
            },
            {
                id: `address`,
                label: `Address - required`,
                required: true,
                placeholder: `Enter Location Address`,
                helperText: `<%= formError %>`,
                onChange: `onFormDataChange`,
                value: `<%= address %>`
            },
            {
                id: `longitude`,
                label: `Longitude`,
                required: false,
                placeholder: `Enter Location Longitude`,
                helperText: `<%= formError %>`,
                onChange: `onFormDataChange`,
                value: `<%= longitude %>`
            },
            {
                id: `latitude`,
                label: `Latitude`,
                required: false,
                placeholder: `Enter Location Latitude`,
                helperText: `<%= formError %>`,
                onChange: `onFormDataChange`,
                value: `<%= latitude %>`
            }
        ]
    }
}