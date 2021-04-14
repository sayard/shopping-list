import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useStore } from "../../hooks/stores";
import { SigninFormInputs } from "./types";

const SignIn: React.FunctionComponent = (): React.ReactElement => {
  const history = useHistory();
  const { auth } = useStore();
  const {
    isLoading,
    error,
    userDetails: { userUID },
    signIn,
  } = auth;

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SigninFormInputs>();

  React.useEffect(() => {
    if (!isLoading && userUID) {
      history.push("/app");
    }
  }, [isLoading, userUID, history]);

  React.useEffect(() => {
    if (error) {
      toast(error.message);
    }
  }, [error]);

  React.useEffect(() => {
    if (formErrors) {
      Object.values(formErrors).forEach((formError) => {
        toast(formError);
      });
    }
  }, [formErrors]);

  const onLoginSubmit = (data: SigninFormInputs) => {
    signIn(data.email, data.password);
  };

  return (
    <Box mx="auto" m={2}>
      <Typography variant="h2" id="App Header" align="center">
        Welcome to Shopping List
      </Typography>

      <Grid container justify="center">
        <Box m={2}>
          <Box display="flex" flexDirection="column" alignItems="center" m={2}>
            <form onSubmit={handleSubmit(onLoginSubmit)}>
              <Box m={2}>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register("email", { required: true })}
                />
              </Box>
              <Box m={2}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register("password", { required: true })}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                m={2}
              >
                {isLoading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Sign in
                  </Button>
                )}
              </Box>
            </form>
          </Box>
        </Box>
      </Grid>
      <ToastContainer />
    </Box>
  );
};

export default observer(SignIn);
