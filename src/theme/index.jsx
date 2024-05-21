import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #007bff; // Define your primary color
    --secondary-color: #6c757d; // Define your secondary color
    --border-radius: 8px; // Define your border radius
  }

  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
    color: var(--primary-color);
  }

  /* Add more global styles as needed */
`;

export default GlobalStyles;
