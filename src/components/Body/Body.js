import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ArrowDown } from "react-feather";
import {CiPickerEmpty, CiPickerHalf} from "react-icons/ci";

import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

import styles from "./Body.module.css";
import ColorPickerApp from "./ColorPicker";

function Body() {
  let colors = ["#536878","#2f007a", "#00407c", "#007BA7"];
  const [showPicker, setShowPicker] = useState(false);
  const [activeColor, setActiveColor] = useState(colors[0]);
  const handleColorChange = (newColor) => {
    setActiveColor(newColor);
    colors.push(newColor);
  };
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const sections = {
    basicInfo: "Basic Information",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    achievement: "Achievements",
    summary: "Summary",
    other: "Other",
  };
  const resumeRef = useRef();

  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",
    },
  });

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Resume Builder</p>
      <div className={styles.toolbar}>
        <div className={styles.colors}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${styles.color} ${
                activeColor === item ? styles.active : ""
              }`}
              onClick={() => setActiveColor(item)}
            />
          ))}
          
        </div>
        <ReactToPrint
          trigger={() => {
            return (
              <button>
                Download <ArrowDown />
              </button>
            );
          }}
          content={() => resumeRef.current}
        />
      </div>
      <div className={styles.main}>
        <Editor
          sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
        />
          <div className={styles.picker} onClick={togglePicker}>
            <span className={styles.heading}> Choose the color for your resume </span>
            {showPicker ? <CiPickerHalf style={{fontSize:"20px"}}/> : <CiPickerEmpty style={{fontSize:"22px", outlineColor: {activeColor}}}/>}
            {showPicker && (
            <ColorPickerApp
              selectedColor={activeColor}
              onColorChange={handleColorChange}
            />
          )}
          </div>
          
        <Resume
          ref={resumeRef}
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
        />
      </div>
    </div>
  );
}

export default Body;
