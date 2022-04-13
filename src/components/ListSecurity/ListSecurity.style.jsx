import styled from 'styled-components'

export const ListSecurityContainer = styled.div`
  
  width: 100%;
  height: 40vh;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  h1 {
    margin: 15px;

  }

  button.btn-plus {
    background: none;
    border: 1px solid #0A639E;
    color: #0A639E;
    margin: 15px;
    font-size: 1rem;
    width: 150px;
    height: 40px;
    border-radius: 10px;
  }

`;


export const ListEmpty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: #DDDDDD;
  padding: 5%;
  border-radius: 10px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 50%;

    h1 {
      font-size: 2rem;
    }
    
    p {
      font-size: 1rem;
      text-align: center;
    }
  }

  button {
    width: 50%;
    min-width: 200px;
    height: 20%;
    font-size: 1rem;
    color: #FFF;
    background: #0A639E;
    border-radius: 10px;
    border: none;
  }
`;

export const ListNotEmpty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  /* background-color: #DDDDDD; */
  /* padding: 5%; */
  border-radius: 10px;
  overflow: auto;
  


  `;

export const ItemList = styled.div`
  width: 100%;
  /* height: 00px; */
  /* border: 1px solid red; */
  margin: 0px 0px 15px 0px; 
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* background-color: #DDDDDD; */
  
  img {
    border-radius: 10px;
  
    width: 30%;
    height: 100px;
    background-color: #FFF;
  }
  
  div.begin {
    background-color: #FFF;
    width: 50%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    h6 {
      font-size: 1.2rem;
    }

    div.score {
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        font-size: 1.1rem;
        margin: 0 5px;
      }
    }
  }
  
  div.end {
    background-color: #FFF;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;
    height: 100px;
    width: 20%;

  }

`;