import styled from 'styled-components';

export const Wrapper = styled.ul`
    font-size: 14px;
    color: white;
`

export const TimeWrapper = styled.ul`
    position: relative;
    padding-left: 37px;
    list-style: none;
    .title {
      opacity: 0.8;
    }

    &:before {
        display: inline-block;
        content: '';
        position: absolute;
        top: 0;
        left: 10px;
        width: 11px;
        height: 260px;
    }
    .first {
      &:after {
        text-align: center;
        content: url('https://api.iconify.design/quill/inbox-newsletter.svg?color=white&width=20&height=20');
      }
    }
    .second {
      &:after {
        text-align: center;
        content: url('https://api.iconify.design/akar-icons/link-chain.svg?color=white&width=20&height=20');
      }
    }
    .third {
      &:after {
        text-align: center;
        content: url('/assets/img/icons/account.svg');
      }
    }
    .last {
      &:before {
        border: none;
      }
      &:after {
        text-align: center;
        content: url('https://api.iconify.design/iconoir/coin.svg?color=white&width=20&height=20');
      }
    }
`

export const StepItem = styled.li`
    position: relative;
    counter-increment: list;
    padding: 0px 10px 10px 16px;
    .title {
      padding: 10px 0px;
    }
    .value {
      padding: 5px 10px;
    }
    
    &:before {
        margin-top: 25px;
        display: inline-block;
        content: '';
        position: absolute;
        left: -26px;
        height: 100%;
        width: 10px;
        border-right: 2px solid var(--primary-2);
    }
    &:after {
      margin-top: 20px;
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        left: -37px;
        width: 40px;
        height: 40px;
        color: #23242F;
        border-radius: 50%;
        background-color: var(--primary-2);
        font-size: 26px;
    }
`