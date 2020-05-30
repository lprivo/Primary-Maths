---
to: src/<%= h.changeCase.pascal(name) %>/index.js
---
<% const pascalized = h.changeCase.pascal(name) -%>
export { default, <%= pascalized %> } from "./<%= pascalized %>";
