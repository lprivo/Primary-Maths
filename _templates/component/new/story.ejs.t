---
to: src/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.story.jsx
---
<% const pascalized = h.changeCase.pascal(name) -%>
<% const camelized = h.changeCase.camel(name) -%>

import React from "react";
import { <%= pascalized %> } from "./";

export default {
    title: "<%= pascalized %>"
};

export const <%= camelized %> = () => (
    <<%= pascalized %>  />
);
