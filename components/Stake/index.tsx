import { useEffect, useState, useContext } from 'react'
import Carousel from 'react-multi-carousel';
import { WalletContext, STAKE_CONTRACT_ID, NFT_CONTRACT_ID, MAX_GAS, NftData, NftContractMetadata, DEPOSIT, X_PARAS_COLLECTIONS } from '../../contexts/wallet';
import { HomeHero } from '../HomeHero';
import { Farms } from '../Farms';
import { Referrals } from '../Referrals';
import {
  NavWrap,
  HomeHeroWrapper,
  TabBtn
} from './styles';

const heroData = [
  {
    id: 1,
    title: 'Check For Terraspaces Or Partnered NFTs To Stake.',
    description: 'Stake NFTs to access analytics and referral commission',
    list: [
      'Stake Terraspaces or Partnered NFTs to access the analytical dashboard.',
      'Stake Terraspaces or Partnered NFTs to earn referral-based commission.',
      'Earn up to $2000 with successful referrals via NFT staking.',
      'Access farms to earn passive tokens from specific Staking Partners.'
    ],
    button1: { title: 'Live on PARAS' },
    button2: { title: 'Read Gitbook' }
  },
  {
    id: 2,
    title: 'Stake To Access Dashboard And Referral Commission',
    description: 'Refer-to-Earn, Farm-to-Earn and Analytics via NFT Staking',
    list: [
      'User-friendly analytical dashboard for listings, floor price and volume.',
      'Earn referral-based commission with Terraspaces or Partnered NFTs.',
      'Terraspaces can earn maximum $2000 with 40 NFTs staked per referral.',
      'Staking Partners can earn maximum $1000 with 40 NFTs staked per referral.'
    ],
    button1: { title: 'Make a Referral' },
    button2: { title: 'Goto Dashboard' }
  },
  {
    id: 3,
    title: 'Introducing $USN Stablecoin Rewards Via Terraspaces',
    description: 'Rerraspace integrates $USN rewards',
    list: [
      'Earn 2 $USN monthly per Terraspaces NFT being staked into the farm.',
      'Access the analytical dashboard for NFT statistics while staked into the farm.',
      'Access Refer-to-Earn benefits while staked into the farm.',
      'Expect increase in monthly $USN rewards as Terraspaces grows.'
    ],
    button1: { title: 'Live on PARAS' },
    button2: { title: 'Read Gitbook' }
  },
  {
    id: 3,
    title: 'Introducing $USN Stablecoin Rewards Via Terraspaces',
    description: 'Rerraspace integrates $USN rewards',
    list: [
      'Earn 2 $USN monthly per Terraspaces NFT being staked into the farm.',
      'Access the analytical dashboard for NFT statistics while staked into the farm.',
      'Access Refer-to-Earn benefits while staked into the farm.',
      'Expect increase in monthly $USN rewards as Terraspaces grows.'
    ],
    button1: { title: 'Live on PARAS' },
    button2: { title: 'Read Gitbook' }
  },
  {
    id: 4,
    title: 'Refer-To-Earn Commission Via New Staking Parners.',
    description: 'Stake multiple NFTs to boost your commission',
    list: [
      'Stake Terraspaces NFTs to earn 5% commission from successful referrals.',
      'Stake Partnered NFTs to earn 2.5% commission from successful referrals.',
      'Each NFT staked enables multipler of 0.5x to boost commission.',
      'The maximum multiplier is capped at 40 NFTs staked per referral.'
    ],
    button1: { title: 'Live on PARAS' },
    button2: { title: 'Read Gitbook' }
  },
]

const farmData = [{
  id: 3,
  title: 'Introducing $USN Stablecoin Rewards Via Terraspaces',
  description: 'Rerraspace integrates $USN rewards',
  list: [
    'Earn 2 $USN monthly per Terraspaces NFT being staked into the farm.',
    'Access the analytical dashboard for NFT statistics while staked into the farm.',
    'Access Refer-to-Earn benefits while staked into the farm.',
    'Expect increase in monthly $USN rewards as Terraspaces grows.'
  ],
  button1: { title: 'Live on PARAS' },
  button2: { title: 'Read Gitbook' }
},
{
  id: 3,
  title: 'Introducing $USN Stablecoin Rewards Via Terraspaces',
  description: 'Rerraspace integrates $USN rewards',
  list: [
    'Earn 2 $USN monthly per Terraspaces NFT being staked into the farm.',
    'Access the analytical dashboard for NFT statistics while staked into the farm.',
    'Access Refer-to-Earn benefits while staked into the farm.',
    'Expect increase in monthly $USN rewards as Terraspaces grows.'
  ],
  button1: { title: 'Live on PARAS' },
  button2: { title: 'Read Gitbook' }
},];

export const Stake = () => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const { wallet, getNftMetadata, getMainCollectionList, getCollectionMetadata } = useContext(WalletContext)
  const [nftContractList, setNftContractList] = useState<string[]>([]);
  const [trendingData, setTrendingData] = useState<any>({})
  const [nftList, setNftList] = useState<Map<string, NftData[]>>(new Map());
  const [nftMetadata, setNftMetadata] = useState<Map<string, NftContractMetadata>>(new Map());
  const [stakeList, setStakeList] = useState<Map<string, string[]>>(new Map());
  const [totalNftCountList, setTotalNftCountList] = useState<Map<string, number>>(new Map());
  const [stakedNftCountList, setStakedNftCountList] = useState<Map<string, number>>(new Map());
  const [totalStaked, setTotalStaked] = useState<number>(0);
  const [tapNum, setTapNum] = useState<number>(1);

  const getTrendingCollectionData = async () => {
    const api = process.env.NEXT_PUBLIC_API;
    // const api = "http://35.75.88.169:3001";
    // const api = 'https://api.terraspaces.io';
    const getAPI = async () => {
      const trendingCollectionDataEndpoint = `${api}/trending_collection_data`;
      const result = await fetch(trendingCollectionDataEndpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
      });
      return (await result.json())
    };
    const result = await getAPI();
    setTrendingData(result);
  }

  const onStake = async (account_id: string, token_id: string) => {
    await wallet?.account().functionCall(
      X_PARAS_COLLECTIONS.includes(account_id) ? "x.paras.near" : account_id,
      "nft_approve",
      {
        token_id,
        account_id: STAKE_CONTRACT_ID,
        msg: JSON.stringify({
          staking_status: "Staking to platform"
        }),
      },
      MAX_GAS,
      DEPOSIT,
    )
  }

  const onUnstake = async (account_id: string, token_id: string) => {
    await wallet?.account().functionCall(
      STAKE_CONTRACT_ID,
      "unstake",
      {
        token_id,
        nft_contract_id: X_PARAS_COLLECTIONS.includes(account_id) ? "x.paras.near" : account_id,
      },
      MAX_GAS,
      "1",
    )
  }

  const fetchCollectionList = async () => {
    const nftContractList = await getMainCollectionList();
    let list = new Map<string, NftContractMetadata>();
    for (let i = 0; i < nftContractList.length; i++) {
      const data = await getCollectionMetadata(nftContractList[i]);
      list.set(nftContractList[i], data);
    }
    getTrendingCollectionData();
    setNftMetadata(list);
    setNftContractList(nftContractList);
  }

  const fetchData = async () => {
    const totalCount = await wallet?.account().viewFunction(STAKE_CONTRACT_ID,
      "get_supply_by_contract_id",
      {
        account_id: NFT_CONTRACT_ID,
      });
    setTotalStaked(totalCount);

    const NFTData = new Map<string, NftData[]>();
    for (let i = 0; i < nftContractList.length; i++) {
      if (X_PARAS_COLLECTIONS.includes(nftContractList[i])) {
        const result = await fetch("https://api-v2-mainnet.paras.id/token?owner_id=" + wallet?.getAccountId() + "&collection_id=" + nftContractList[i] + "&contract_id=x.paras.near&__limit=30");
        const nftList = (await result.json())["data"]["results"];
        NFTData.set(nftContractList[i], nftList);
      } else {
        const nftList = await wallet?.account().viewFunction(nftContractList[i],
          "nft_tokens_for_owner",
          {
            account_id: wallet.getAccountId(),
            from_index: "0",
            limit: 100,
          });
        NFTData.set(nftContractList[i], nftList);
      }
    }
    let stakeData = await wallet?.account().viewFunction(STAKE_CONTRACT_ID,
      "get_staking_informations_by_owner_id",
      {
        account_id: wallet.getAccountId(),
        from_index: "0",
        limit: 100,
      });
    if (stakeData == undefined)
      stakeData = [];
    const newData = new Map<string, string[]>();
    for (let i = 0; i < stakeData.length; i++) {
      const nft_info = await wallet?.account().viewFunction(stakeData[i].nft_contract_id,
        "nft_token",
        {
          token_id: stakeData[i].token_id,
        });

      if ((JSON.stringify(nft_info.approved_account_ids).match(STAKE_CONTRACT_ID) || []).length
        == (JSON.stringify(nft_info.approved_account_ids).match('":') || []).length) {
        let nft_contract_id = stakeData[i].nft_contract_id;
        if (nft_contract_id == "x.paras.near") {
          const result = await fetch("https://api-v2-mainnet.paras.id/token?token_id=" + stakeData[i].token_id);
          nft_contract_id = (await result.json())["data"]["results"][0].metadata.collection_id;
        }
        let list: string[] = [];
        if (newData.has(nft_contract_id)) {
          const data = newData.get(nft_contract_id);
          list = data == undefined ? [] : data;
        }
        list.push(stakeData[i].token_id);
        newData.set(nft_contract_id, list);
      }
    }
    const totalCountData = new Map<string, number>();
    const stakedCountData = new Map<string, number>();
    for (let i = 0; i < nftContractList.length; i++) {
      let total_count = NFTData.get(nftContractList[i]) != undefined ? NFTData.get(nftContractList[i])?.length : 0
      if (total_count == undefined)
        total_count = 0;
      let stake_count = newData.get(nftContractList[i]) != undefined ? newData.get(nftContractList[i])?.length : 0
      if (stake_count == undefined)
        stake_count = 0;
      totalCountData.set(nftContractList[i], total_count - stake_count)
      stakedCountData.set(nftContractList[i], stake_count);
    }
    setNftList(NFTData);
    setStakeList(newData);
    setTotalNftCountList(totalCountData);
    setStakedNftCountList(stakedCountData);
    console.log(NFTData, newData, totalCountData, stakedCountData);
  }

  useEffect(() => {
    if (wallet && wallet.isSignedIn()) {
      fetchData()
    }
  }, [nftContractList]);

  useEffect(() => {
    if (wallet && wallet.isSignedIn()) {
      fetchCollectionList();
    }
  }, [wallet]);

  return (
    <main className="stking-page pt-160 fix">
      <div className="home-vect-abs v-top">
        <img src="assets/img/vector/stakin-v.png" alt="stakin" loading="lazy" />
      </div>
      {
        wallet?.isSignedIn() ?
          <>
            <HomeHeroWrapper className='container'>
              {
                tapNum === 1 || tapNum === 2 || tapNum === 4 ?
                  <>
                    {heroData.map((item, i) => (
                      item.id === tapNum && <HomeHero key={i} data={item} />
                    ))}
                  </>
                  :
                  <Carousel
                    swipeable={true}
                    draggable={true}
                    responsive={responsive}
                    infinite={true}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile", 'desktop']}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    className="partner-container"
                    showDots={true}
                    ssr={true}
                    autoPlay={true}
                  >
                    {farmData.map((item, i) => (
                      item.id === 3 && <HomeHero key={i} data={item} />
                    ))}
                  </Carousel>
              }

            </HomeHeroWrapper>
            <div className="stake-area">
              <div className="container">
                <div className="stake-wrapper">
                  <NavWrap className="navs-area">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <TabBtn className="t-20 nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => setTapNum(1)}>Owned</TabBtn>
                      </li>
                      <li className="nav-item" role="presentation">
                        <TabBtn className="nav-link t-20" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => setTapNum(2)}>Stake</TabBtn>
                      </li>
                      <li className="nav-item" role="presentation">
                        <TabBtn className="nav-link t-20" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-farms" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => setTapNum(3)}>Farms</TabBtn>
                      </li>
                      <li className="nav-item" role="presentation">
                        <TabBtn className="nav-link t-20" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-referrals" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => setTapNum(4)}>Referrals</TabBtn>
                      </li>
                    </ul>
                  </NavWrap>

                  <div className="tab-content" id="pills-tabContent">

                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                      {
                        nftContractList.map((contract_id, contract_index) => (
                          <div className="owned-r" key={contract_index}>
                            {/* <div className="stake-btn stake-btn-abs d-inline-block ">
                            <button className="cmn-btn-1 f-18 redius-12">
                              <span> Stake All </span>
                            </button>
                          </div> */}

                            <div className="navs-title ">
                              <div className="d-flex align-items-center mb-12">
                                <div className="stking-icon mr-12">
                                  {/* {nftMetadata.get(contract_id)?.icon != undefined ?
                                  <img className="mr-8" src={nftMetadata.get(contract_id)?.icon} alt="Icon" width={32} height={32} loading="lazy" /> :
                                  <img className="mr-8" src="assets/img/icons/Near.png" alt="Near" width={32} height={32} loading="lazy" />
                                } */}
                                  <img className="mr-8" src={"assets/icons/" + contract_id + ".png"} alt="Near" width={32} height={32} loading="lazy" />
                                </div>
                                <div className="hero-subs-t d-flex align-items-center">
                                  <h3 className="t-20 white-c mr-8">
                                    <span>{nftMetadata.get(contract_id) != undefined ? nftMetadata.get(contract_id)?.name : contract_id}</span>
                                  </h3>
                                  <img src="assets/img/icons/verified.svg" width="20" height="20" alt="verified" />
                                </div>
                              </div>
                              <div className="floor-c d-flex">
                                <button type="button" className="floor-btn mr-16">Floor : {trendingData[contract_id]?.floor_price}N</button>
                                <button type="button" className="floor-btn">
                                  Total Floor Value :
                                  {trendingData[contract_id]?.floor_price * (totalNftCountList.get(contract_id) ?? 0)}N</button>
                              </div>
                            </div>
                            <div className="my-22 hr-line">
                            </div>

                            <div className="t-card-wrapper">
                              <div className="row">
                                {
                                  nftList.get(contract_id)?.map((nftData, key) => {
                                    if (!stakeList.get(contract_id)?.includes(nftData.token_id))
                                      return (
                                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 mb-60" key={contract_id + key}>
                                          <div className="t-card">
                                            <div className="t-card-img  mb-12">
                                              <img className="stake-img" src={X_PARAS_COLLECTIONS.includes(contract_id) ? ("https://ipfs.fleek.co/ipfs/" + nftData.metadata.media) : (nftData.metadata.media?.startsWith('http') ? nftData.metadata.media : (nftMetadata.get(contract_id)?.base_uri + '/' + nftData.metadata.media))} alt="staking" loading="lazy" />
                                            </div>
                                            <div className="t-card-title">
                                              <h5 className="t-18-b white-c">{nftData.metadata.title}</h5>
                                            </div>
                                            <div className="stake-s-v mt-30">
                                              <div className="d-flex align-items-center mb-12">
                                                <div className="staking-icon mr-12">
                                                  {/* {nftMetadata.get(contract_id)?.icon != undefined ?
                                                  <img className="mr-8" src={nftMetadata.get(contract_id)?.icon} alt="Icon" width={32} height={32} loading="lazy" /> :
                                                  <img className="mr-8" src="assets/img/icons/Near.png" alt="Near" width={32} height={32} loading="lazy" />
                                                } */}
                                                  <img className="mr-8" src={"assets/icons/" + contract_id + ".png"} alt="Near" width={32} height={32} loading="lazy" />
                                                </div>
                                                <div className="hero-subs-t d-flex align-items-center">
                                                  <h3 className="t-14 neutral-c  mr-8">
                                                    <span>{nftMetadata.get(contract_id)?.name}</span>
                                                  </h3>
                                                  <img src="assets/img/icons/verified.svg" alt="verified" />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="stake-btn mt-20">
                                              <button className="cmn-btn-1 h-48 f-18 redius-12 w-100" onClick={() => { onStake(contract_id, nftData.token_id) }}>
                                                <span> Stake</span>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                  })
                                }
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                      {
                        nftContractList.map((contract_id, contract_index) => (
                          <div className="owned-r" key={contract_index}>
                            {/* <div className="stake-btn stake-btn-abs d-inline-block ">
                            <button className="cmn-btn-1 f-18 redius-12">
                              <span> Unstake All </span>
                            </button>
                          </div> */}

                            <div className="navs-title ">
                              <div className="d-flex align-items-center mb-12">
                                <div className="stking-icon mr-12">
                                  {/* {nftMetadata.get(contract_id)?.icon != undefined ?
                                  <img className="mr-8" src={nftMetadata.get(contract_id)?.icon} alt="Icon" width={32} height={32} loading="lazy" /> :
                                  <img className="mr-8" src="assets/img/icons/Near.png" alt="Near" width={32} height={32} loading="lazy" />
                                } */}
                                  <img className="mr-8" src={"assets/icons/" + contract_id + ".png"} alt="Near" width={32} height={32} loading="lazy" />
                                </div>
                                <div className="hero-subs-t d-flex align-items-center">
                                  <h3 className="t-20 white-c mr-8">
                                    <span>{nftMetadata.get(contract_id) != undefined ? nftMetadata.get(contract_id)?.name : contract_id}</span>
                                  </h3>
                                  <img src="assets/img/icons/verified.svg" width="20" height="20" alt="verified" />
                                </div>
                              </div>
                              <div className="floor-c d-flex">
                                <button type="button" className="floor-btn mr-16">Floor : {trendingData[contract_id]?.floor_price}N</button>
                                <button type="button" className="floor-btn">Total Floor Value : {trendingData[contract_id]?.floor_price * (stakedNftCountList.get(contract_id) ?? 0)}N</button>
                              </div>
                            </div>
                            <div className="my-22 hr-line"> </div>
                            <div className="t-card-wrapper">
                              <div className="row">
                                {
                                  nftList.get(contract_id)?.map((nftData, key) => {
                                    if (stakeList.get(contract_id)?.includes(nftData.token_id))
                                      return (
                                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 mb-60" key={key}>
                                          <div className="t-card">
                                            <div className="t-card-img  mb-12">
                                              <img className="stake-img" src={X_PARAS_COLLECTIONS.includes(contract_id) ? ("https://ipfs.fleek.co/ipfs/" + nftData.metadata.media) : (nftData.metadata.media?.startsWith('http') ? nftData.metadata.media : (nftMetadata.get(contract_id)?.base_uri + '/' + nftData.metadata.media))} alt="staking" loading="lazy" />
                                            </div>
                                            <div className="t-card-title">
                                              <h5 className="t-18-b white-c">{nftData.metadata.title}</h5>
                                            </div>
                                            <div className="stake-s-v mt-10">
                                              <div className="d-flex align-items-center mb-12">
                                                <div className="staking-icon mr-12">
                                                  <img className="mr-8" src={"assets/icons/" + contract_id + ".png"} alt="Near" width={32} height={32} loading="lazy" />
                                                </div>
                                                <div className="hero-subs-t d-flex align-items-center">
                                                  <h3 className="t-14 neutral-c  mr-8">
                                                    <span>{nftMetadata.get(contract_id)?.name}</span>
                                                  </h3>
                                                  <img src="assets/img/icons/verified.svg" alt="verified" />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="stake-btn mt-20">
                                              <button className="cmn-btn-1 h-48 f-18 redius-12 w-100" onClick={() => { onUnstake(contract_id, nftData.token_id) }}>
                                                <span> Unstake</span>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                  })
                                }
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="tab-pane fade" id="pills-farms" role="tabpanel" aria-labelledby="pills-home-tab">
                      <Farms />
                    </div>
                    <div className="tab-pane fade" id="pills-referrals" role="tabpanel" aria-labelledby="pills-home-tab">
                      <Referrals />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
          :
          <div className="dashboard-wrapper">
            <div className="" style={{ marginLeft: 60, marginRight: 60 }}>
              <h3>Please connect wallet to stake NFTs.</h3>
            </div>
          </div>
      }
    </main >
  )
}

export const AddIcon = () => {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
    </svg>
  )
}

export const LeftArrowIcon = () => {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
    </svg>
  )
}

export const CloseIcon = (props: any) => {
  const { onClick } = props
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="css-1vsvyrr" onClick={onClick}>
      <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
}
