import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body: {
    position: relative;
    width: 100%;
    background: '#FFF';
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
    min-height: calc(100vh - 75px);
    margin: 75px 0 0 0;
    background-color: #CDDCDC;
    background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
    overflow: auto; 
    font-family: 'Roboto', sans-serif;
  }

  ::-webkit-scrollbar {
    width: .6rem;
  }

  ::-webkit-scrollbar-thumb {
    background: #df4960;
    border-radius: .3rem;
  }
`;
