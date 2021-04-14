export type NewProductFormInputs = {
  name: string;
  notes: string;
  quantity: number;
};

export interface NewProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewProductFormInputs) => void;
}
