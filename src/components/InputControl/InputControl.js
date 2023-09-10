import React from "react";

import styles from "./InputControl.module.css";

function InputControl({label, ...props}) {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {label && <label> {label}</label>}</div>
        <input type="text" {...props}/> 
    </div>
  )
}

export default InputControl;
