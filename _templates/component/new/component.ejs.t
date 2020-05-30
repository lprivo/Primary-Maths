---
to: src/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.jsx
---
<% const pascalized = h.changeCase.pascal(name) -%>
import React from "react";

import styles from "./<%= pascalized %>.module.scss";


export const <%= pascalized %> = () => (
    <div className={styles.component}></div>
);

export default <%= pascalized %>;
