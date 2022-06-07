import React from 'react'
import { VerifiedIcon, WhiteCheckedIcon } from '../Shared/SvgIcons'
import {
  Container,
  ContentWrapper,
  InfoWrapper,
  InfoItem,
  DetailWrapper,
  VolumeWrapper,
  InfoCard,
  BodyRow,
  BtnsWrap,
  Space,
  StakeBtn,
  UnStakeBtn,
  ClaimBtn
} from './styles'

interface FarmCardProps {
  item?: any;
  card?: any;
  index?: any;
}

export const FarmCard = (props: FarmCardProps) => {
  const { item } = props;

  return (
    <Container>
      <ContentWrapper>
        <DetailWrapper>
          <img draggable={false} src='/assets/img/home/collection3.png' alt='' />
          <InfoWrapper>
            <InfoItem>
              <span>{item.name}</span>
              <VerifiedIcon />
            </InfoItem>
          </InfoWrapper>
        </DetailWrapper>
        <InfoWrapper>
          <VolumeWrapper>
            <span className='headertitle t-16'>Total Staked:</span>
            <span className='headertitle t-16'>{item.totalStaked}</span>
          </VolumeWrapper>
          <VolumeWrapper>
            <span className='headertitle t-16'>Your NFTs Staked:</span>
            <span className='headertitle t-16'>{item.userStaked}</span>
          </VolumeWrapper>
        </InfoWrapper>
        <BodyRow>
          <div>
            <InfoCard>
              <p className='title t-12'>NFT Type: Kryptonite</p>
              <img draggable={false} src={item.photo} alt='' />
            </InfoCard>
          </div>
          <div>
            <InfoCard>
              <p className='title align t-12'>Rewards Tokens</p>
              <p className='value align align t-18'>${item.rewardToken}</p>
            </InfoCard>
          </div>
        </BodyRow>
        <BodyRow>
          <div>
            <InfoCard>
              <p className='title t-12'>Rewards: Monthly</p>
              <p className='value t-18'>{item.rewardMonth} ${item.rewardToken}/NFT</p>
            </InfoCard>
          </div>
          <div>
            <InfoCard>
              <p className='title align t-12'>Automatic Airdrops &nbsp;
                {item.airdropStatus ?
                  <WhiteCheckedIcon />
                  :
                  <></>
                }
              </p>
              <p className='title align t-12'>Dashboard Access &nbsp;
                {item.accessStatus ?
                  <WhiteCheckedIcon />
                  :
                  <></>
                }
              </p>
            </InfoCard>
          </div>
        </BodyRow>
        <BodyRow>
          <div>
            <InfoCard>
              <p className='title t-12'>Total Supply</p>
              <p className='value t-18'>{item.totalSupply}</p>
            </InfoCard>
          </div>
          <div>
            <InfoCard>
              <p className='title align t-12'>Staking Cap</p>
              <p className='value align t-18'>{item.stakingCap}</p>
            </InfoCard>
          </div>
        </BodyRow>
        <BtnsWrap>
          <StakeBtn className='primary-btn'>
            Stake
          </StakeBtn>
          <Space />
          <UnStakeBtn className='primary-btn-naked'>
            Unstake
          </UnStakeBtn>
        </BtnsWrap>
        <ClaimBtn className='primary-btn'>
          Claim Rewards
        </ClaimBtn>
      </ContentWrapper>
    </Container>
  )
}