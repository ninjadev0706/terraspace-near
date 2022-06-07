import React, { useState } from 'react'
import ReactModal from 'react-modal';
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReferralModal } from '../ReferralModal'
import { VerifiedIcon } from '../Shared/SvgIcons'
import {
  Container,
  ContentWrapper,
  InfoWrapper,
  InfoItem,
  DetailWrapper,
  VolumeWrapper,
  InfoCard,
  BodyRow,
  StakeBtn,
  TitleWrap
} from './styles'

interface ReferralCardProps {
  item?: any;
}

export const ReferralCard = (props: ReferralCardProps) => {
  (ReactModal as any).defaultStyles.overlay.background = 'linear-gradient(45deg, #0c0b0cad, #28253075)';
  (ReactModal as any).defaultStyles.overlay.zIndex = '10000';
  (ReactModal as any).defaultStyles.overlay.backdropFilter = 'blur(10px)';

  const { item } = props;
  const [isShow, setModal] = useState(false)

  const customStyles = {
    body: {
      overflow: 'hidden',
    },
    content: {
      maxWidth: '1100px',
      maxHeight: 'calc(100% - 230px)',
      padding: '0',
      background: 'linear-gradient(45deg, #3f3359, #3b294ed9)',
      borderRadius: '30px',
      border: ' 3px solid var(--primary-2)',
      display: 'flex',
      margin: 'auto',
    },
  };

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false)
  }

  return (
    <Container>
      <ContentWrapper>
        <DetailWrapper className='mb-1'>
          <div>
            {
              item.photo.map((url: any, index: any) => (
                <img draggable={false} key={index} src={url} alt='' />
              ))
            }
          </div>
          <TitleWrap>
            <InfoItem>
              <span>{item.name}</span>
              <VerifiedIcon />
            </InfoItem>
          </TitleWrap>
        </DetailWrapper>
        <InfoWrapper>
          <VolumeWrapper>
            <div className='title t-16'>Referral Comission:</div>
            <div className='title t-16'>&nbsp;{item.comission}%</div>
          </VolumeWrapper>
          <VolumeWrapper>
            <div className='title t-16'>Your NFTs Staked:</div>
            <div className='title t-16'>&nbsp;{item.staked}</div>
          </VolumeWrapper>
          <VolumeWrapper>
            <div className='title t-16'>Staking Multiplier:</div>
            <div className='title t-16'>&nbsp;{item.multiplier}</div>
          </VolumeWrapper>
        </InfoWrapper>
        <BodyRow>
          <div>
            <InfoCard>
              <div className='title longtext t-12'><div>New Staking Partner Fee:</div> <div>$2000 x 5%</div></div>
              <div className='value t-18'>${item.newPartner}</div>
            </InfoCard>
          </div>
          <div>
            <InfoCard>
              <div className='title longtext align t-12'><div>Your NFTs Staked:</div> <div>10 x 0.5</div></div>
              <div className='value align t-18'>{item.userStaked}</div>
            </InfoCard>
          </div>
        </BodyRow>
        <BodyRow>
          <div>
            <InfoCard>
              <div className='title longtext t-12'><div>Referral Payout:</div> <div className='formular'>$100 x 5</div></div>
              <div className='value t-18'>${item.payout}</div>
            </InfoCard>
          </div>
          <div>
            <InfoCard>
              <div className='title align t-12'>Staking Multiplier Cap</div>
              <div className='value align t-18'>{item.multiplierCap} NFTs</div>
            </InfoCard>
          </div>
        </BodyRow>
        <StakeBtn className='primary-btn' onClick={openModal}>
          Make a Referral
        </StakeBtn>
        <ReactModal isOpen={isShow} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
          <ReferralModal
            item={item}
            onDismiss={() => closeModal()}
          />
        </ReactModal>
      </ContentWrapper>
    </Container>
  )
}