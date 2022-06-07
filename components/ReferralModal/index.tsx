import React from 'react'
import { useContext } from 'react';
import { WalletContext } from "../../contexts/wallet"
import { VerifiedIcon, CopyClipboard } from '../Shared/SvgIcons'
import { Stepper } from '../Stepper'
import {
  Container,
  ContentWrapper,
  InfoWrapper,
  InfoItem,
  DetailWrapper,
  VolumeWrapper,
  InfoCard,
  BodyRow,
  Space,
  StakeBtn,
  Header,
  Submit,
  WorkWay,
  NameInput,
  InputCol,
  InputWrap,
  CheckBoxWrap,
  StepperTitle,
  BodyWrap,
  VolumeContainer,
  CopyIcoWrap,
  ModalTitle,
  Note
} from './styles'

interface ReferralModalProps {
  onDismiss?: () => void;
  item?: any;
}

export const ReferralModal = (props: ReferralModalProps) => {

  const { onDismiss, item } = props;

  const { near, wallet, signIn, signOut } = useContext(WalletContext)

  const onWallet = async () => {
    if (wallet?.isSignedIn()) {
      signOut();
    } else {
      signIn();
    }
  }

  return (
    <Container>
      <div>
        <Header>
          <ModalTitle>
            <h1>Make New Referral</h1>
          </ModalTitle>
          {/* <button className='primary-btn' onClick={onWallet}> */}
          <button className='primary-btn'>
            {/* {
                      !wallet?.isSignedIn() ? */}
            <span>Wallet</span>
            {/* :
                        <span> {wallet.getAccountId()}</span>
                    } */}
            <img src="/assets/img/icons/Wallet1.svg" alt="wallet" />
          </button>
        </Header>
        <ContentWrapper>
          <WorkWay>
            <DetailWrapper>
              <div>
                {
                  item.photo.map((url: any, index: any) => (
                    <img draggable={false} key={index} src={url} alt='' />
                  ))
                }
              </div>
              {/* <img draggable={false} src='/assets/img/home/collection3.png' alt='' /> */}
              <InfoWrapper>
                <InfoItem>
                  <span>{item.name}</span>
                  <VerifiedIcon />
                </InfoItem>
              </InfoWrapper>
            </DetailWrapper>
            <StepperTitle>
              How It Works
            </StepperTitle>
            <Stepper />
          </WorkWay>
          <Submit>
            <VolumeContainer>
              <VolumeWrapper>
                <span className='title t-12'>Referral Comission:</span>
                <span className='title t-12'>&nbsp;{item.comission}%</span>
              </VolumeWrapper>
              <VolumeWrapper>
                <span className='title t-12'>Your NFTs Staked:</span>
                <span className='title t-12'>&nbsp;{item.staked}</span>
              </VolumeWrapper>
              <VolumeWrapper>
                <span className='title t-12'>Staking Multiplier:</span>
                <span className='title t-12'>&nbsp;{item.multiplier}</span>
              </VolumeWrapper>
            </VolumeContainer>
            <BodyWrap>
              <BodyRow>
                <div>
                  <InfoCard className='kindreferral'>
                    <p className='title t-12'>Submitted Referrals</p>
                    <p className='value t-18'>5</p>
                  </InfoCard>
                </div>
                <div>
                  <InfoCard className='kindreferral'>
                    <p className='title t-12'>Pending Referrals</p>
                    <p className='value t-18'>3</p>
                  </InfoCard>
                </div>
                <div>
                  <InfoCard className='kindreferral'>
                    <p className='title t-12'>Approved Referrals</p>
                    <p className='value t-18'>2</p>
                  </InfoCard>
                </div>
                <div>
                  <InfoCard className='kindreferral'>
                    <p className='title t-12'>Amount Earned</p>
                    <p className='value t-18'>$500</p>
                  </InfoCard>
                </div>
              </BodyRow>
              <InputWrap>
                <InputCol>
                  <InfoCard>
                    <h6 className='t-16'>Your Referral Wallet</h6>
                    <NameInput>
                      <input
                        placeholder="zerotime.near"
                        autoComplete='off'
                      />
                      <CopyIcoWrap>
                        <CopyClipboard />
                      </CopyIcoWrap>
                    </NameInput>
                  </InfoCard>
                </InputCol>
                <Space />
                <InputCol>
                  <InfoCard>
                    <h6>Your Referral Link</h6>
                    <NameInput>
                      <input
                        placeholder="zerotime.near"
                        autoComplete='off'
                      />
                      <CopyIcoWrap>
                        <CopyClipboard />
                      </CopyIcoWrap>
                    </NameInput>
                  </InfoCard>
                </InputCol>
              </InputWrap>
              <InputCol>
                <div>
                  <div><h6 className='t-16'>Collection Name*</h6></div>
                  <NameInput>
                    <input
                      placeholder="http://terrspace.io/apply"
                      autoComplete='off'
                    />
                  </NameInput>
                </div>
              </InputCol>
              <CheckBoxWrap>
                <input type="checkbox" className="form-check-input" value="" placeholder="Enter collection name" />
                <p className='title t-16'>
                  I have shared the application form and referral wallet to invited collection.
                </p>
              </CheckBoxWrap>
              <StakeBtn className='primary-btn'>
                Submit Referral
              </StakeBtn>
              <Note className='title t-12'>
                Note: You may only submit once every 24 hours.
              </Note>
            </BodyWrap>
          </Submit>
        </ContentWrapper>
      </div>
    </Container>
  )
}