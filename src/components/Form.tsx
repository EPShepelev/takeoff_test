import { useEffect, useState } from "react";
import { generateRandomId } from "../helpers/generateRandomId";
import { useAppDispatch } from "../hooks/redux";
import {
  addUserContact,
  editUserContact,
} from "../store/reducers/ActionCreators";
import { IUser } from "../types/IUser";
import { Button } from "./Button";

type Props = {
  title: string;
  btnText: string;
  user?: IUser;
  isEditMode?: boolean;
  disabled?: boolean;
  setIsEditMode?: (isEditMode: boolean) => void;
};

export const Form = ({
  title,
  btnText,
  user,
  isEditMode,
  setIsEditMode,
  disabled,
}: Props) => {
  const dispatch = useAppDispatch();

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPhoneTouched, setIsPhoneTouched] = useState(false);
  const [nameError, setNameError] = useState("can't be empty");
  const [emailError, setEmailError] = useState("can't be empty");
  const [phoneError, setPhoneError] = useState("can't be empty");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (nameError || emailError || phoneError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, phoneError]);

  const addUserHandle = (e: React.MouseEvent<HTMLElement>) => {
    if (!isEditMode) {
      e.preventDefault();
      const uid = generateRandomId(1, 100);
      dispatch(addUserContact(uid, editName, editEmail, editPhone));
      setEditName("");
      setEditEmail("");
      setEditPhone("");
    }
  };

  const editUserHandle = (e: React.MouseEvent<HTMLElement>) => {
    if (user && isEditMode && setIsEditMode) {
      e.preventDefault();
      dispatch(editUserContact(user.id, editName, editEmail, editPhone));
      setIsEditMode(!isEditMode);
      setEditName("");
      setEditEmail("");
      setEditPhone("");
    }
  };

  const blurHandle = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "name":
        setIsNameTouched(true);
        break;
      case "email":
        setIsEmailTouched(true);
        break;
      case "phone":
        setIsPhoneTouched(true);
        break;
    }
  };

  const nameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
    if (!e.target.value) {
      setNameError("Invalid name");
      setFormValid(false);
    } else {
      setNameError("");
    }
  };

  const emailHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditEmail(e.target.value);
    if (!e.target.value) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };

  const phoneHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPhone(e.target.value);
    if (!e.target.value) {
      setPhoneError("Invalid phone");
    } else {
      setPhoneError("");
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="subtitle">{title}</h2>
      <form className="form">
        <div className="form-field">
          <input
            name="name"
            className="input"
            placeholder={user?.name || "name"}
            value={editName}
            onBlur={(e) => blurHandle(e)}
            onChange={(e) => nameHandle(e)}
          ></input>
          {isNameTouched && nameError && (
            <span className="error">{nameError}</span>
          )}
        </div>
        <div className="form-field">
          <input
            name="email"
            className="input"
            placeholder={user?.email || "email"}
            value={editEmail}
            onBlur={(e) => blurHandle(e)}
            onChange={(e) => emailHandle(e)}
          ></input>
          {isEmailTouched && emailError && (
            <span className="error">{emailError}</span>
          )}
        </div>
        <div className="form-field">
          <input
            name="phone"
            className="input"
            placeholder={user?.phone || "phone"}
            value={editPhone}
            onBlur={(e) => blurHandle(e)}
            onChange={(e) => phoneHandle(e)}
          ></input>
          {isPhoneTouched && phoneError && (
            <span className="error">{phoneError}</span>
          )}
        </div>
        <Button
          clb={isEditMode ? editUserHandle : addUserHandle}
          text={btnText}
          disabled={!formValid}
        />
      </form>
    </div>
  );
};
