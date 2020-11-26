export const Cfg = {
    categoriesList: {
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
            },
            {
                text: `New Category`,
                className: `topbar__button`,
                action: `newCategory`
            }
        ]
    }
}