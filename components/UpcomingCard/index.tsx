import React from 'react';
import { VerifiedIcon, LinkIcon } from '../Shared/SvgIcons';
import {
  Container,
  InnerContainer,
  FooterWrapper,
  TitleWrapper,
  SocialList,
  BodyWrapper,
  InfoCard,
  Content,
  Wrap
} from './styles';

interface SingleExplorecardProps {
  card?: any;
}

export const UpcomingCard = (props: SingleExplorecardProps) => {
  const { card } = props;

  return (
    <Container>
      <InnerContainer>
        <img draggable={false} src={card?.photo} alt='' />
        <FooterWrapper>
          <BodyWrapper>
            <TitleWrapper>
              <h2>{card?.name}</h2>
              <VerifiedIcon />
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
          </BodyWrapper>
          <Content className='row'>
            <Wrap className="col-md-6">
              <InfoCard>
                <p className='title'>Mint Price</p>
                <p className='value'>7 N</p>
              </InfoCard>
            </Wrap>
            <Wrap className="col-md-6">
              <InfoCard>
                <p className='title align'>Mint Date</p>
                <p className='value align'>20 May 2022</p>
              </InfoCard>
            </Wrap>
            <Wrap className="col-md-6">
              <InfoCard>
                <p className='title'>Supply</p>
                <p className='value'>700 NFTs</p>
              </InfoCard>
            </Wrap>
            <Wrap className="col-md-6">
              <InfoCard>
                <p className='title align'>Mint Time</p>
                <p className='value align'>16:00</p>
              </InfoCard>
            </Wrap>
            <Wrap className="col-md-6">
              <InfoCard>
                <p className='title'><VerifiedIcon />Supply</p>
              </InfoCard>
            </Wrap>
            <Wrap className="col-md-6">
              <InfoCard>
                <p className='title align'><VerifiedIcon />Mint Time</p>
              </InfoCard>
            </Wrap>
          </Content>
        </FooterWrapper>
      </InnerContainer>
    </Container>
  )
}
