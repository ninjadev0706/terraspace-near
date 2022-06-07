import React from 'react';
import { LinkIcon, EmptyHeart, NearIco } from '../Shared/SvgIcons';
import {
  Container,
  InnerContainer,
  FooterWrapper,
  TitleWrapper,
  Description,
  SocialList,
  BodyWrapper,
  InfoCard,
  FavoriteBox,
  IcoWrap
} from './styles';

interface SingleExplorecardProps {
  card?: any;
}

export const FavorCard = (props: SingleExplorecardProps) => {
  const { card } = props;

  return (
    <Container>
      <InnerContainer>
        <img draggable={false} src={card?.photo} alt='' />
        <FooterWrapper>
          <BodyWrapper>
            <TitleWrapper>
              <h2>{card?.name}</h2>
              &nbsp;&nbsp;
              <FavoriteBox className='favorite-box'>
                <EmptyHeart />
                <span>70</span>
              </FavoriteBox>
            </TitleWrapper>
            <SocialList>
              <a href='https://discord.com' target='_blank' rel="noreferrer">
                <img draggable={false} src='/assets/img/icons/discord.png' alt='' />
              </a>
              <a className='centericon' href='https://twitter.com' target='_blank' rel="noreferrer">
                <img draggable={false} src='/assets/img/icons/twitter.png' alt='' />
              </a>
              <a href='https://twitter.com' target='_blank' rel="noreferrer">
                <LinkIcon />
              </a>
            </SocialList>
            <Description className='title t-16'>{card?.description}</Description>
          </BodyWrapper>
          <div className='row'>
            <div className="">
              <InfoCard>
                <p className='title t-12'>Mint Price</p>
                <p className='value t-18'><span>7&nbsp;</span> <IcoWrap><NearIco /></IcoWrap></p>
              </InfoCard>
            </div>
            <div className="">
              <InfoCard>
                <p className='title align t-12'>Mint Date</p>
                <p className='value align t-18'>20 May 2022</p>
              </InfoCard>
            </div>
            <div className="">
              <InfoCard>
                <p className='title t-12'>Supply</p>
                <p className='value t-18'>700 NFTs</p>
              </InfoCard>
            </div>
            <div className="">
              <InfoCard>
                <p className='title align t-12'>Mint Time</p>
                <p className='value align t-18'>16:00</p>
              </InfoCard>
            </div>
          </div>
        </FooterWrapper>
      </InnerContainer>
    </Container>
  )
}
