type Props = {
  clb: (e: React.MouseEvent<HTMLElement>) => void;
  text: string;
  disabled?: boolean;
};

export const Button = ({ clb, text, disabled }: Props) => {
  return (
    <button className="button" onClick={(e) => clb(e)} disabled={disabled}>
      {text}
    </button>
  );
};
