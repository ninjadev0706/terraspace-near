import styled from 'styled-components';

export const Container = styled.div`
  font-family: Gojali-Medium;
  margin-top: 35px;
  border-radius: 25px;
  background-color: #3f3359;
  border: none;
  padding: 30px 25px 15px;
  display: flex;
  align-items: center;
  color: var(--white);
  font-family: var(--bs-font-sans-serif);

  > span {
    margin-right: 10px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
  @media (max-width: 768px) {
  }
`

export const ContentWrapper = styled.div`
  flex: 1;
  .headertitle {
    opacity: 0.9;
    font-weight: 100;
  }
  .title {
    font-size: 14px !important;
    font-weight: 100;
    opacity: 0.9;
    line-height: 1.8;
  }
`

export const InfoWrapper = styled.div`
padding: 10px 0;
  display: flex;
  justify-content: space-between;
`

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 20px;
    margin-right: 5px;
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
  > img {
    width: 40px;
    height: 40px;
    min-width: 30px;
    border-radius: 50px;
    border: 1px solid white;
    margin-right: 10px;
  }
  @media (max-width: 768px) {
    
  }
`

export const VolumeWrapper = styled.div`
  background-color: #554578;
  border-radius: 5px;
  padding: 3px 13px;
  font-weight: 10 !important;
  > span {
    line-height: 1.2;
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
  p {
    line-height: 1.5;
    &.align {
      text-align: right;
    }
  }
  @media (min-width: 576px) {
    margin-top: 15px;
  }
`

export const BodyRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Space = styled.div`
  width: 24px;
  display: flex;
  text-align: left;
`;

export const BtnsWrap = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0px;
  padding: 42px 0 10px;
`

export const StakeBtn = styled.button`
  width: 100%;
  background: #7a48cf;
  border-radius: 12px;
  font-size: 18px;
  padding: 10px;
`

export const UnStakeBtn = styled.button`
  width: 100%;
  background: #00000000;
  border: 2px solid #7a48cf;
  border-radius: 12px;
  font-size: 18px;
  padding: 10px;
`

export const ClaimBtn = styled.button`
  width: 100%;
  background: #7a48cf;
  border-radius: 12px;
  font-size: 18px;
  padding: 10px;
  margin-bottom: 5px;
`
