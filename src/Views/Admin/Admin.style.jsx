import styled from 'styled-components'

export const ListSecurityContainer = styled.div`
  
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  h1 {
    margin: 15px 5px;
    font-size: 1.5rem;
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
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  /* background-color: #DDDDDD; */
  /* padding: 5%; */
  border-radius: 10px;
  
  `;

export const ItemList = styled.div`
  width: 95%;
  /* height: 00px; */
  /* border: 1px solid red; */
  margin: 10px 0px 10px 0px; 
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  /* background-color: #DDDDDD; */
  /* overflow: hidden; */
  border-radius: 10px;
  
  img {
    border-radius: 10px 0px 0px 10px;
  
    width: 30%;
    height: 100px;
    background-color: #FFF;
  }
  
  div.begin {
    padding: 3%;
    background-color: #FFF;
    width: 50%;
    height: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    /* border-radius: 10px; */
    h6 {
      font-size: 1.2rem;
      margin: 2%;
    }
    div.score {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
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
    border-radius: 0px 10px 10px 0px;
  }
`;