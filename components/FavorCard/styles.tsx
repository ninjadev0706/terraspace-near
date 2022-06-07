import styled from 'styled-components';

export const Container = styled.div`
  margin: 15px 0;
  font-family: Gojali-Medium;
  font-family: var(--bs-font-sans-serif);
  background-color: #3f3359;
  border-radius: 20px;
  border: 1px solid var(--primary-2);
  `

export const InnerContainer = styled.div`
  display: flex;
  background-position: center;
  background-size: cover;
  > img {
    border-radius: 20px;
    width: 350px;
    height: 350px;
    max-height: 350px;
    object-fit: cover;
    transform: scale(1.01);
  }
  @media (max-width: 768px) {
    display: block;
    > img {
      width: 100%;
      height: 200px;
    }
    > button {
      width: auto;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
`

export const FooterWrapper = styled.div`
  width: 100%;
  padding: 3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    opacity: 0.8;
    font-size: 14px !important;
  }
  .row{
    justify-content: space-between;
    >div {
      width: fit-content;
    }
  }
  @media (max-width: 768px) {
    padding: 5%;
    .row{
      >div {
        width: 50%;
      }
    }
  }
`

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  > h2 {
    font-size: 30px;
    font-weight: 600;
  }
  svg {
    width: 26px;
    height: 26px;
    > circle {
      fill: transparent;
    }
    path {
      fill: var(--white);
    }
  }
  @media (max-width: 768px) {
    justify-content: space-between;
    > h2 {
      font-size: 20px;
      margin-right: 10px;
    }
  }
`

export const Description = styled.p`
  color: var(--white);
  margin: 5px 0px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`

export const SocialList = styled.div`
  padding: 3% 0;
  display: flex;
  align-items: center;
  .centericon {
    padding: 0 5px;
  }
  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    > img, a {
      min-width: 23px;
      height: 23px;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
`

export const InfoCard = styled.div`
  margin-top: 5px;
  padding: 0px;
  p {
    color: var(--white);
    display: flex;
    &.align {
      text-align: right;
    }
  }
  @media (min-width: 768px) {
    margin-top: 15px;
  }
  @media (max-width: 768px) {
    margin: 10px 0;
    p {
      &.align {
        text-align: right;
      }
    }
  }
`

export const FavoriteBox = styled.div`
  background-color: #554578;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  color: #fff;
  padding: 8px 10px;
  font-size: 14px;
  transition: all 0.3s linear;

  > svg {
    margin-right: 5px;
    width: 23px;
    height: 23px;
  }
`

export const IcoWrap= styled.span`
  > svg {
    margin-bottom: 3px !important;
  }
`