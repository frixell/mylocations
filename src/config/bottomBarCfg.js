export const Cfg = {
    selectPage: {
        buttons: [
            {
                text: `Categories`,
                className: `topbar__button`,
                action: `setContext`,
                context: `categoriesList`
            },
            {
                text: `Locations`,
                className: `topbar__button`,
                action: `setContext`,
                context: `locationsList`
            }
        ]
    }
}