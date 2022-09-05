import { useState } from "react";
import { IUser } from "../types/IUser";
import { Form } from "./Form";
import { User } from "./User";

type Props = {
  user: IUser;
};

export const Card = ({ user }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="contact-wrapper">
      {isEditMode ? (
        <Form
          title="edit user info"
          btnText="Submit"
          user={user}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      ) : (
        <User
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          user={user}
        />
      )}
    </div>
  );
};
