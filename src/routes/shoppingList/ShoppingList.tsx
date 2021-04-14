import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import NewProductDialog from "../../components/NewProductDialog";
import Product from "../../components/Product";
import { useStore } from "../../hooks/stores";
import { NewProductFormInputs } from "../../components/NewProductDialog/types";
import API from "../../utils/api";

const ShoppingList: React.FunctionComponent = (): React.ReactElement => {
  const history = useHistory();
  const {
    auth,
    products: { items: products, isLoading },
  } = useStore();
  const {
    userDetails: { nickname },
    signOut,
  } = auth;

  const [newProductDialogOpen, setNewProductDialogOpen] = React.useState(false);

  const addProduct = (data: NewProductFormInputs) => {
    const product = {
      ...data,
      uid: uuidv4(),
      addedBy: nickname as string,
      notes: data.notes ? data.notes : "",
    };
    API.addProduct(product);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box mx="auto" m={2}>
          <Typography variant="h2" id="App Header" align="center">
            Obozowa Shopping List
          </Typography>

          <Grid container justify="center">
            <Box m={2} display="flex">
              {isLoading ? (
                <CircularProgress color="secondary" />
              ) : (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography>Hello, {nickname}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      history.push("/signin");
                      signOut();
                    }}
                  >
                    Sign out
                  </Button>
                  <Box marginTop={4}>
                    <Typography variant="h5">To buy:</Typography>
                  </Box>
                  {products.length ? (
                    products.map((product) => (
                      <Box key={product.uid} display="flex" width="100%">
                        <Product product={product} />
                      </Box>
                    ))
                  ) : (
                    <Box m={2}>
                      <Typography>No products</Typography>
                    </Box>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => {
                      setNewProductDialogOpen(true);
                    }}
                    disabled={isLoading}
                  >
                    Add new item
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
          <NewProductDialog
            open={newProductDialogOpen}
            onClose={() => {
              setNewProductDialogOpen(false);
            }}
            onSubmit={(data) => {
              addProduct(data);
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default observer(ShoppingList);
