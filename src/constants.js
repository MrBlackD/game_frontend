import {createTheme} from "@nextui-org/react";

export const darkTheme = createTheme({
    type: "dark",
    theme: {
        colors: {}
    }
});

export const getPlayer = () => {
    if (document.cookie !== '') {
        return document.cookie.split("=")[1];
    }
    return null;
}