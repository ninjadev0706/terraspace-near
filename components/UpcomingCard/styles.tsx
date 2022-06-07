import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
`

export const Content = styled.div`
  padding: 10px;
`

export const Wrap = styled.div`
  width: 50%;
`

export const InnerContainer = styled.div`
  background-color: #3f3359;
  background-position: center;
  border-radius: 20px;
  background-size: cover;
  overflow: hidden;
  border: 1px solid var(--primary-2);
  > img {
    border-radius: 20px;
    width: 100%;
    height: 200px;
    max-height: 350px;
    object-fit: cover;
  }
  @media (max-width: 768px) {
    > img {
      width: 100%;
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
  padding: 4%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    font-size: 20px;
    margin-right: 10px;
  }
  svg {
    width: 24px;
    height: 24px;
    > circle {
      fill: transparent;
    }
    path {
      fill: var(--white);
    }
  }
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
      min-width: 20px;
      height: 20px;
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
    &.title {
      opacity: 0.9;
      font-size: 14px !important;
    }
    &.value {
      font-weight: 500;
    }
    &.align {
      text-align: right;
    }
  }
  @media (min-width: 576px) {
    margin-top: 15px;
    padding: 5px;
  }
`