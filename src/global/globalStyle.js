import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
html, body {height: 100%}
  #root{
    height:100%;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;    
  }

  @media (max-width: 414px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 320px) {
    html {
      font-size: 85.55%;
    }
  }

  @media (max-width: 280px) {
    html {
      font-size: 77%;
    }
  }

  body: {
    position: relative;
    width: 100%;
    background: '#E5E5E5';
    color: '#000000';
  }

  body {
    background: #FFF;
  }

  body, input, button, h1, h2, h3, p, textarea {
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
    color: unset;
  }

  button {
    cursor: pointer,
  }

  #root {
    position: relative;
    min-height:100%;
    margin: 50px 0 0 0;
    background-color: #CDDCDC;
    background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
    overflow: auto; 
    font-family: 'Roboto', sans-serif;
  }

  ::-webkit-scrollbar {
    width: .6rem;
  }

  ::-webkit-scrollbar-thumb {
    background: #09629E;
    border-radius: .3rem;
  }
`;
