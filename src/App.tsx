import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import MainRouter from "./routes/MainRouter";
import rootStore from "./stores";
import "react-toastify/dist/ReactToastify.css";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3700B3",
    },
    secondary: {
      main: "#03DAC6",
    },
  },
});

function App(): React.ReactElement {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Provider {...rootStore.stores}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <MainRouter />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
