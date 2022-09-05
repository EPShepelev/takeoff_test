import { useAppDispatch } from "../hooks/redux";
import { removeUserContact } from "../store/reducers/ActionCreators";
import { IUser } from "../types/IUser";
import { Button } from "./Button";

type Props = {
  setIsEditMode: (isEditMode: boolean) => void;
  isEditMode: boolean;
  user: IUser;
};

export const User = ({ isEditMode, setIsEditMode, user }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="user-card">
      <p>
        Name:<span> {user.name}</span>
      </p>
      <p>
        Email: <span>{user.email}</span>
      </p>
      <p>
        Phone: <span>{user.phone}</span>
      </p>
      <div className="user-card__controls">
        <Button clb={() => setIsEditMode(!isEditMode)} text="Edit" />
        <Button
          clb={() => dispatch(removeUserContact(user.id))}
          text="Delete"
        />
      </div>
    </div>
  );
};
