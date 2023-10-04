import React from "react";
import ReactDOM from "react-dom";
import { MantineProvider, createTheme } from "@mantine/core";

import { PeepsGenerator } from "./components/App";
import { Provider } from "./utils/contextProvider";
import * as serviceWorker from "./serviceWorker";

import "rc-slider/assets/index.css";
import "./styles/index.css";
import "@mantine/core/styles.css";

const theme = createTheme({
    fontFamily: "Itim, sans-serif"
});

ReactDOM.hydrate(
    <MantineProvider theme={theme}>
        <Provider>
            <PeepsGenerator />
        </Provider>
    </MantineProvider>,
    document.getElementById("main")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
