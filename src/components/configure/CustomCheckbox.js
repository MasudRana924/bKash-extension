import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsNotificationEnabled,
  selectIsNotificationEnabled,
} from "../../features/reducers/notification/notificationSlice";
import './CustomCheckBox.css'
import { useEffect } from "react";
const CustomNotificationCheckbox = () => {
  const dispatch = useDispatch();
  const isNotificationEnabled = useSelector(selectIsNotificationEnabled);
  useEffect(() => {
    const storedIsNotificationEnabled = localStorage.getItem("isNotificationEnabled");
    if (storedIsNotificationEnabled !== null) {
      dispatch(setIsNotificationEnabled(JSON.parse(storedIsNotificationEnabled)));
    }
  }, [dispatch]);

  const toggleNotificationEnabled = () => {
    const newIsNotificationEnabled = !isNotificationEnabled;
    dispatch(setIsNotificationEnabled(newIsNotificationEnabled));
    localStorage.setItem("isNotificationEnabled", JSON.stringify(newIsNotificationEnabled));
  };
  return (
    <>
      <label className="switch">
        <input type="checkbox" checked={isNotificationEnabled}  onChange={toggleNotificationEnabled} />
        <span className="slider"></span>
      </label>
    </>
  );
};
export default CustomNotificationCheckbox;




