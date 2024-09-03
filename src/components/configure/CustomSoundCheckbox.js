import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsSpeakEnabled,
  selectIsSpeakEnabled,
} from "../../features/reducers/notification/notificationSlice";
import './CustomCheckBox.css'
import { useEffect } from "react";

const CustomSoundCheckbox = () => {
    const dispatch = useDispatch();
    const isSpeakEnabled = useSelector(selectIsSpeakEnabled);
    useEffect(() => {
      const storedIsSpeakEnabled = localStorage.getItem("isSpeakEnabled");
      if (storedIsSpeakEnabled !== null) {
        dispatch(setIsSpeakEnabled(JSON.parse(storedIsSpeakEnabled)));
      }
    }, [dispatch]);
    const toggleSpeakNotification = () => {
      const newIsSpeakEnabled = !isSpeakEnabled;
      dispatch(setIsSpeakEnabled(newIsSpeakEnabled));
      localStorage.setItem("isSpeakEnabled", JSON.stringify(newIsSpeakEnabled));
    };
    return (
      <>
        <label className="switch">
          <input type="checkbox" checked={isSpeakEnabled}  onChange={toggleSpeakNotification} />
          <span className="slider"></span>
        </label>
      </>
    );
  };

export default CustomSoundCheckbox;