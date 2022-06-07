import React, { useState } from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";
import 'react-multi-carousel/lib/styles.css';
import { FullStar } from '../Shared/SvgIcons';
import {
  Container,
  Header,
  TitleTabWrapper,
  SliderWrapper,
  CarouselButtonGroup,
  ListBtn,
  Tab,
  TabWrapper,
  IcoWrap
} from './styles';
import { FavorCard } from '../FavorCard';

const exploreList = [
  { name: 'Antisocial Ape Club', photo: '/assets/partners/asac.jpg', description: 'A collection of 3333 pixel art ape NFTs stored an the NEAR blockchain' },
  { name: 'Boo Monsters', photo: '/assets/partners/boomonsters.png', description: 'A limited collection of Boo Monsters roaming the blockchain' },
  { name: 'Mara Gen1', photo: '/assets/partners/mara.png', description: '1000 unique Mara holding one of these gives access to loads of benefits from MARADAO.' },
  { name: 'Nearnauts', photo: '/assets/partners/nearnaut.png', description: 'NEARNauts is a generative NFT project on the NEAR network consisting of 7777 randomly generated Nauts of varying rarity.' },
  { name: 'Mr. Brown', photo: '/assets/partners/mrbrown.jpeg', description: 'Mr. Brown is a middle-aged insurance clerk with 4,200 imagined identities living inside his head. He gets lost in them every day, sometimes even forgetting which one is real. Even though the mental borders between identities are thin, no two identities are alike. Each Mr. Brown is unique and stored on the NEAR blockchain.' },
  { name: 'The Dons', photo: '/assets/partners/thedons.jpg', description: 'A collection of 3,500 Mafia Bosses coming to take over NEAR Protocol. Blood makes you related. Loyalty makes you family.' },
  { name: 'Monarchs By Haven', photo: '/assets/partners/haven.gif', description: 'Monarchs is a collection of 333 NFTs rewriting history on the NEAR Protocol.' }
]

const tabList = [
  { key: 1, name: 'Upcoming' },
  { key: 2, name: 'Favorites' }
]


export const UpcomingDrop = () => {

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [daySelected, setDaySelected] = useState<number | string>(1);

  return (
    <Container>
      {
        !isMobile ?
          <Header className='container'>
            <TitleTabWrapper>
              <TitleTabWrapper>
                <h1>Upcoming Drops</h1>
              </TitleTabWrapper>
              <TabWrapper>
                {tabList.map((day, index) => (
                  <Tab
                    active={daySelected === day.key}
                    key={index}
                    onClick={() => setDaySelected(day.key)}
                  >
                    {day.key === 2 && <IcoWrap><FullStar /></IcoWrap>}
                    <div
                    >{day.name}</div>
                  </Tab>
                ))}
              </TabWrapper>
            </TitleTabWrapper>
            <CarouselButtonGroup>
              <ListBtn className='primary-btn'>
                <span>Get Listed</span>
              </ListBtn>
            </CarouselButtonGroup>
          </Header>
          :
          <Header className='container'>
            <TitleTabWrapper>
              <h1>Upcoming Drops</h1>
            </TitleTabWrapper>
            <CarouselButtonGroup>
              <TabWrapper>
                {tabList.map((day, index) => (
                  <Tab
                    active={daySelected === day.key}
                    key={index}
                    onClick={() => setDaySelected(day.key)}
                  >
                    {day.key === 2 && <IcoWrap><FullStar /></IcoWrap>}
                    <div
                    >{day.name}</div>
                  </Tab>
                ))}
              </TabWrapper>
              <ListBtn className='primary-btn'>
                <span>Get Listed</span>
              </ListBtn>
            </CarouselButtonGroup>
          </Header>
      }

      <SliderWrapper className='container'>
        {
          daySelected === 1 ?
            <div className='row'>
              {exploreList.map((item, i) => (
                <div key={i}>
                  <FavorCard card={item} />
                </div>
              ))}
            </div>
            :
            <div className='row'>
              {exploreList.map((item, i) => (
                <div key={i}>
                  <FavorCard card={item} />
                </div>
              ))}
            </div>
        }
      </SliderWrapper>
    </Container>
  )
}
