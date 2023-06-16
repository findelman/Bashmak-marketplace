import { createGlobalStyle } from "styled-components"


export const GlogalStyle = createGlobalStyle`

/* @import url("https://use.typekit.net/jkv6gzk.css"); */



* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  /* font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; */
  outline: none;
  border: unset;
}

a {
  color: white;
}
button {
  background: unset;
  cursor: pointer;
}

:root {
  --default-border-radius: 16px;
  --default-transition: 300ms;
  --fast-transition: 200ms linear;
  --default-red: #d74c42;
}
`
