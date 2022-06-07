import styled from 'styled-components';

export const Container = styled.div`
  color: white;
  margin-top: 35px;
  border-radius: 25px;
  background-color: #3f3359;
  border: none;
  padding: 30px 25px 20px;
  display: flex;
  align-items: center;
  font-family: var(--bs-font-sans-serif);

  > span {
    margin-right: 10px;
    font-weight: 500;
  }
  color: var(--white);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const ContentWrapper = styled.div`
  flex: 1;
  .title {
    line-height: 1.8;
    opacity: 0.8;
  }
`

export const InfoWrapper = styled.div`
  padding: 5px 0 20px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
  }
`

export const TitleWrap = styled.div`
  padding: 10px 0px;
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
`

export const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-width: 45px;
  div {
    margin-right: 25px;
    > img {
      width: 45px;
      height: 45px;
      min-width: 45px;
      border-radius: 50px;
      border: 1.5px solid white;
      margin-right: -17px;
    }
  }
`

export const VolumeWrapper = styled.div`
  background-color: #554578;
  border-radius: 5px;
  padding: 0px 15px;
  display: flex;
  @media (max-width: 768px) {
    margin: 5px 0;
    text-align: center;
    justify-content: space-between;
  }
`

export const InfoCard = styled.div`
  margin-top: 5px;
  padding: 5px 0px;
  > img {
    width: 25px;
    height: 25px;
    border-radius: 50px;
    border: 1px solid white;
    margin-right: 10px;
  }
  div {
    &.title {
      font-size: 14px !important;
      font-weight: 100;
      display: flex;
    }
    &.value {
      font-weight: 500;
      font-size: 17px !important;
    }
    &.align {
      text-align: right;
    }
    &.longtext {
      display: flex;
    }
  }
  @media (max-width: 576px) {
    margin-top: 15px;
    div {
      &.title {
        display: block;
      }
      &.longtext {
        display: block;
      }
  }
`

export const BodyRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StakeBtn = styled.button`
  margin-top: 30px;
  width: 100%;
  background: #7a48cf;
  color: white;
  border-radius: 12px;
  font-size: 18px;
  padding: 10px;
`