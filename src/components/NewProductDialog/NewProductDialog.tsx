import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { observer } from "mobx-react";
import React from "react";
import { useForm } from "react-hook-form";
import { NewProductDialogProps, NewProductFormInputs } from "./types";

const NewProductDialog: React.FunctionComponent<NewProductDialogProps> = ({
  open,
  onClose,
  onSubmit,
}): React.ReactElement => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<NewProductFormInputs>();

  const onAddNewProduct = (data: NewProductFormInputs) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>New Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onAddNewProduct)}>
          <Box m={2}>
            <TextField
              label="Product Name"
              fullWidth
              autoFocus
              error={!!formErrors.name}
              helperText={formErrors.name ? "Field required" : undefined}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("name", { required: true })}
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Notes (optional)"
              fullWidth
              multiline
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("notes")}
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Quantity"
              fullWidth
              type="number"
              error={!!formErrors.quantity}
              helperText={formErrors.quantity ? "Field required" : undefined}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("quantity", { required: true })}
            />
          </Box>
          <Box m={2}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Add product to list
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default observer(NewProductDialog);
