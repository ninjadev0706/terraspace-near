import React from 'react'
import {
  Wrapper,
  TimeWrapper,
  StepItem,
} from './styles'

export const Stepper = () => {


  return (
    <Wrapper>
      <TimeWrapper>
        <StepItem className='first'>
          <div className='t-18'>Share Form Link</div>
          <div className='title t-12'>Invite new collections as partners by sharing the application form.</div>
        </StepItem>
        <StepItem className='second'>
          <div className='t-18'>Share Referral Wallet</div>
          <div className='title t-12'>Share this connected wallet as your referral link with new collection.</div>
        </StepItem>
        <StepItem className='third'>
          <div className='t-18'>Submit Referral</div>
          <div className='title t-12'>Submit new referral once application form and wallet is shared.</div>
        </StepItem>
        <StepItem className='last'>
          <div className='t-18'>Earn $USN Rewards</div>
          <div className='title t-12'>Get $USN rewards after approved collection has applied and onboarded.</div>
        </StepItem>
      </TimeWrapper>
    </Wrapper>
  )
}