---
to: src/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.test.jsx
---
<% const pascalized = h.changeCase.pascal(name) -%>
<% const camelized = h.changeCase.camel(name) -%>
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { <%= camelized %> } from "./<%= camelized %>.story";

afterEach(cleanup);

describe("<%= camelized %>", () => {
    it("renders correctly", () => {
        const { container } = render(<%= camelized %>());
        expect(container.firstChild).toMatchSnapshot();
    });
});
