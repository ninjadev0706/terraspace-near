import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import {
  Container,
} from './styles';
import { ReferralCard } from '../ReferralCard';


const referralList = [
  { id: 1, name: 'Terraspaces', photo: ['/assets/img/home/collection3.png'], comission: 5, staked: 10000, multiplier: 0.5, newPartner: 100, userStaked: 5, payout: 500, multiplierCap: 40 },
  {
    id: 2, name: 'Staking Partners',
    photo: [ '/assets/partners/boomonsters.png',
    '/assets/partners/asac.jpg',
    '/assets/partners/haven.gif',
    '/assets/partners/mara.png',
    '/assets/partners/mrbrown.jpeg',
    '/assets/partners/nearnaut.png',
    '/assets/partners/thedons.jpg'],
    comission: 2.5, staked: 10000, multiplier: 0.5, newPartner: 100, userStaked: 5, payout: 500, multiplierCap: 40
  }
]

export const Referrals = () => {

  return (
    <Container>
      <div className='row'>
        {referralList.map(referralItem => (
          <div className="col-lg-6 col-md-12" key={referralItem.id}>
            <ReferralCard item={referralItem} />
          </div>
        ))}
      </div>
    </Container>
  )
}
