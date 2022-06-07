import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import {
  Container
} from './styles';
import { FarmCard } from '../FarmCard';

const farmList = [
  { id: 1, name: 'Terraspaces', totalStaked: 10, userStaked: 2 ,photo: ['/assets/img/home/collection3.png'], rewardToken: 'USN', rewardMonth: 7, totalSupply: 777, stakingCap: 777, airdropStatus: 1, accessStatus: 1 },
  { id: 1, name: 'Terraspaces', totalStaked: 10, userStaked: 2 ,photo: ['/assets/img/home/collection3.png'], rewardToken: 'USN', rewardMonth: 7, totalSupply: 777, stakingCap: 777, airdropStatus: 1, accessStatus: 1 },
  { id: 1, name: 'Terraspaces', totalStaked: 10, userStaked: 2 ,photo: ['/assets/img/home/collection3.png'], rewardToken: 'USN', rewardMonth: 7, totalSupply: 777, stakingCap: 777, airdropStatus: 1, accessStatus: 1 },
  { id: 1, name: 'Terraspaces', totalStaked: 10, userStaked: 2 ,photo: ['/assets/img/home/collection3.png'], rewardToken: 'USN', rewardMonth: 7, totalSupply: 777, stakingCap: 777, airdropStatus: 1, accessStatus: 1 },
]

export const Farms = () => {

  return (
    <Container>
      <div className='row'>
        {farmList.map((farmItem, i) => (
          <div key={i} className="col-md-4">
            <FarmCard item={farmItem} />
          </div>
        ))}
      </div>
    </Container>
  )
}
