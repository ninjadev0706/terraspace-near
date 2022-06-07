import exp from 'constants';
import styled from 'styled-components';

export const Container = styled.div`
  font-family: Gojali-Medium;
  border-radius: 30px;
  padding: 60px 60px 70px 60px;
  align-items: center;
  flex-direction: column;
  transition: all ease 200ms;
  font-family: var(--bs-font-sans-serif);
  color: var(--white);
  > span {
    margin-right: 10px;
    font-weight: 500;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (max-width: 768px) {
    width: 100%%;
    height: 96%;
    padding: 30px;
    overflow: hidden;
    overflow-y: scroll;
  }
`

export const Header = styled.div`
  justify-content: space-between;
  display: flex;
  padding-bottom: 35px;
  h1 {
    font-size: 30px;
    font-weight: bold;
  }
  span {
    margin-right: 5px;
  }
  @media (max-width: 768px) {
    padding-bottom: 30px;
    h1 {
      font-size: 25px;
    }
    span {
      margin-right: 0px;
    }
  }
`

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
  }
`

export const InfoWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`

export const VolumeContainer = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
  }
`


export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 20px;
    color: var(--white);
    font-weight: 500;
  }
  svg {
    width: 20px;
    min-width: 20px;
    height: 20px;
  }
  @media (max-width: 576px) {
    span {
      margin-left: 0;
    }
  }
`

export const DetailWrapper = styled.div`
  align-items: center;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  div {
    width: fit-content;
    min-width: 45px;
    margin-right: 20px;
    > img {
      width: 45px;
      height: 45px;
      min-width: 30px;
      border-radius: 50px;
      border: 2px solid white;
      margin-right: -17px;
    }
  }
`

export const VolumeWrapper = styled.div`
  background-color: #554578;
  border-radius: 5px;
  padding: 3px 10px;
  @media (max-width: 576px) {
    text-align: center;
    margin: 5px 0;
  }
`

export const InfoCard = styled.div`
  margin-top: 5px;
  padding: 0px;
  > img {
    width: 25px;
    height: 25px;
    border-radius: 50px;
    border: 1px solid white;
    margin-right: 10px;
  }
  p:first-child {
    font-size: 14px;
  }
  p {
    &.align {
      text-align: right;
    }
  }
`

export const BodyRow = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
    .kindreferral {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
    }
  }
`

export const Space = styled.div`
  width: 24px;
  display: flex;
  text-align: left;
  @media (max-width: 576px) {
    width: 0;
  }
`;

export const StakeBtn = styled.button`
  margin-top: 20px;
  width: 100%;
  background: #7a48cf;
  color: white;
  border-radius: 12px;
  font-size: 18px;
  padding: 10px;
`

export const BodyWrap = styled.div`
  flex-direction: column;
  display: flex;
  height: 90%;
  justify-content: space-around;
`

export const WorkWay = styled.div`
  width: 35%;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Submit = styled.div`
  width: 62%;
  span {
    color: white;
  }
  .title {
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const StepperTitle = styled.div`
    color: white;
    font-size: 23px;
    font-weight: 600;
    padding: 15px 0;
`

export const InputCol = styled.div`
  width: 100%;
  h6 {
    margin: 10px 0;
  }
`

export const Note = styled.div`
  font-size: 14px !important;
`

export const InputWrap = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0px;
  padding: 20px 0;
  @media (max-width: 768px) {
    display: block;
  }
`

export const CheckBoxWrap = styled.div`
  margin: 10px 0;
  display: flex;
  color: white;
  input[type="checkbox"]:before {
    background: white;    
  }
  input[type="checkbox"]:checked {
    border: none; 
  }
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin: 2px 5px 0 0;
    background: var(--primary-2);    
  }
  @media (max-width: 768px) {
    input[type="checkbox"] {
      width: 35px;
    }
  }
`


export const NameInput = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  > input {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #FFF;
    background: #c194eb40;
    border: none;
    border-right: none;
    border-radius: 12px;
    padding: 8px;
    outline: none;
    text-indent: 8px;
    width: 100%;
    min-width: 50px;
    height: 50px;
  }
  input::placeholder {
    color: white;
    opacity:0.5;
  }
`

export const CopyIcoWrap = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  opacity: 0.5;
`

export const ModalTitle = styled.div`
 > h1 {
   font-size: 35px;
   font-weight: 600;
 }
 @media (max-width: 768px) {
  > h1 {
    font-size: 30px;
    font-weight: 600;
    }
  }
`