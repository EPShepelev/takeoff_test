import { Form } from "./Form";

type Props = {
  disabled: boolean;
};

export const Add = ({ disabled }: Props) => {
  return <Form title="Add contact" btnText="Add" disabled={disabled} />;
};
