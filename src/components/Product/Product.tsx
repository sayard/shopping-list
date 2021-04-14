import { Box, Checkbox, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import React from "react";
import { useStore } from "../../hooks/stores";
import { ProductProps } from "./types";

const Product: React.FunctionComponent<ProductProps> = ({
  product,
}): React.ReactElement => {
  const [isSelected, setIsSelected] = React.useState(false);

  const {
    products: { isLoading, removeProduct, error },
  } = useStore();

  React.useEffect(() => {
    if (error) {
      setIsSelected(false);
    }
  }, [error]);

  return (
    <Box display="flex" flexDirection="row">
      <Checkbox
        checked={isSelected}
        onChange={(event) => {
          setIsSelected(event.target.checked);
          if (!isSelected && !isLoading) {
            removeProduct(product.uid);
          }
        }}
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      <Box m={2}>
        <Typography variant="h5">
          {product.name}
          {((product.quantity as unknown) as number) > 1
            ? ` x${product.quantity}`
            : null}
        </Typography>
        {product.notes.length ? (
          <Typography variant="h6">{product.notes}</Typography>
        ) : null}
        <Typography>Added by: {product.addedBy}</Typography>
      </Box>
    </Box>
  );
};

export default observer(Product);
