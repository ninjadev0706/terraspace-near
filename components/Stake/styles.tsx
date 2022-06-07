import styled from 'styled-components'

export const NavWrap = styled.div`
  @media (max-width: 576px) {
    ul {
      width: 100% !important;
      justify-content: space-between !important;
    }
  }  
`

export const HomeHeroWrapper = styled.div`
  margin-top: 10px;
  > div {
    padding-bottom: 30px;
  }
  .custom-dot-list-style {
    .react-multi-carousel-dot {
      button {
        background-color: #404872;
        border: none;
        width: 20px;
        height: 5px;
        border-radius: 30px;
      }
    }
    .react-multi-carousel-dot--active {
      button {
        background-color: white;
      }
    }
  }
`

export const TabBtn = styled.button`
  @media (max-width: 576px) {
    padding: 16px 13px !important;
  }
`
