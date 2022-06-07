import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-top: 70px;
  @media (max-width: 768px) {
    margin-top: 30px;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    font-size: 30px;
    display: block;
  }
`

export const IcoWrap = styled.div`
  font-size: small;
`

export const TitleTabWrapper = styled.div`
  display: flex;
  align-items: center;
  > h1 {
    font-size: 32px;
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 20px;
  }
`

export const SliderWrapper = styled.div`
  margin-top: 20px;

  > div {
    margin-left: -10px;
    width: calc(100% + 20px);
  }
`

export const CarouselButtonGroup = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`

export const ListBtn = styled.div`
  margin-top: 10px;
  padding: 10px 15px;
  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`

export const TabWrapper = styled.div`
    width: fit-content;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--primary-2);
  margin-top: 10px;
`

interface TabProps {
  readonly active?: boolean;
}

export const Tab = styled.div<TabProps>`
  font-size: 16px;
  border-radius: 6px;
  padding: 7px 12px;
  cursor: pointer;
  color: var(--white);
  transition: all 0.2s ease;
  display: flex;

  ${(props: any) => props.active && css`
    background-color: var(--primary-2);
  `}
`
