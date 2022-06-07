import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { WalletContext, STAKE_CONTRACT_ID, NFT_CONTRACT_ID, MAX_GAS, NftData, NftContractMetadata, DEPOSIT, X_PARAS_COLLECTIONS } from '../contexts/wallet'
import { useCallback, useContext, useEffect, useState } from 'react'
import { parseNearAmount } from 'near-api-js/lib/utils/format'
import { stake } from 'near-api-js/lib/transaction'
import { resourceLimits } from 'worker_threads'
// import fetch from 'node-fetch'

const Mint: NextPage = () => {
  const { wallet, getNftMetadata, getMainCollectionList, getCollectionMetadata } = useContext(WalletContext)
  const [nftContractList, setNftContractList] = useState<string[]>([]);
  const [trendingData, setTrendingData] = useState<any>({})
  const [nftList, setNftList] = useState<Map<string, NftData[]>>(new Map());
  const [nftMetadata, setNftMetadata] = useState<Map<string, NftContractMetadata>>(new Map());
  const [stakeList, setStakeList] = useState<Map<string, string[]>>(new Map());
  const [totalNftCountList, setTotalNftCountList] = useState<Map<string, number>>(new Map());
  const [stakedNftCountList, setStakedNftCountList] = useState<Map<string, number>>(new Map());
  const [totalStaked, setTotalStaked] = useState<number>(0);

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
            <div className="stking-hero-area mb-60">
              <div className="container">
                <div className="row justify-content-center align-items-center text-center">
                  <div className="col-xl-8 col-lg-11 col-md-12">
                    <div className="top-staking">
                      <div className="stking-icon pb-20">
                        <img src="assets/img/staking/stakin-l.png" alt="powerded" loading="lazy" />
                      </div>
                      <div className="hero-description text-center">
                        <div className="hero-subs-t d-flex align-items-center justify-content-center">
                          <h3 className="t-18-b white-c mr-8">
                            <span>Terraspaces</span>
                          </h3>
                          <img src="assets/img/icons/verified.svg" width="20" height="20" alt="verified" />
                        </div>
                        <div className="pt-1 hero-subs-s-title d-flex align-items-center justify-content-center">
                          <p className="t-14 neutral-c mr-4">
                            Terraspaces.Near
                          </p>
                          <img src="assets/img/icons/chain.svg" width="20" height="20" alt="verified" />
                        </div>
                        <div className="hero-d-p">
                          <p className="t-16 neutral-c">
                            Generative dystopian NFTs meet utility via proof-of-staking to access analytics dashboard. <br />Genesis collection of 777 abstract #NFTs. Powered by #NEARProtocol
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="count-parent">
                      <div className="count-s">
                        <div className="single-text text-center">
                          <p className="t-14 linr-h-150 neutral-c">
                            Floor Price
                          </p>
                          <h3 className="t-20 white-c pt-1">
                            <span className="counter">{trendingData[NFT_CONTRACT_ID]?.floor_price}</span>
                            <span>N</span>
                          </h3>
                        </div>
                      </div>
                      <div className="count-s">
                        <div className="single-text text-center">
                          <p className="t-14 linr-h-150 neutral-c">
                            Listed
                          </p>
                          <h3 className="t-20 white-c pt-1">
                            <span className="counter">{trendingData[NFT_CONTRACT_ID]?.total_listed}</span>
                          </h3>
                        </div>
                      </div>
                      <div className="count-s">
                        <div className="single-text sm-berore text-center">
                          <p className="t-14 linr-h-150 neutral-c">
                            Total Staked
                          </p>
                          <h3 className="t-20 white-c pt-1">
                            <span className="counter">{totalStaked}</span>
                          </h3>
                        </div>
                      </div>
                      <div className="count-s">
                        <div className="single-text text-center">
                          <p className="t-14 linr-h-150 neutral-c">
                            Owned BY
                          </p>
                          <h3 className="t-20 white-c pt-1">
                            <span className="counter">{trendingData[NFT_CONTRACT_ID]?.total_owners}</span>
                          </h3>
                        </div>
                      </div>
                      <div className="count-s">
                        <div className="single-text text-center">
                          <p className="t-14 linr-h-150 neutral-c">
                            Total Volume
                          </p>
                          <h3 className="t-20 white-c pt-1">
                            <span className="counter">{trendingData[NFT_CONTRACT_ID]?.total_volume}</span>
                            <span>N</span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="stake-area">
              <div className="container">
                <div className="stake-wrapper">
                  <div className="navs-area">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button className="t-20 nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Owned</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link t-20" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Stake</button>
                      </li>
                    </ul>
                  </div>

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
                                                <div className="stking-icon mr-12">
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
                                              <button className="cmn-btn-1 h-48 f-18 redius-12" onClick={() => { onStake(contract_id, nftData.token_id) }}>
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
                                            <div className="stake-s-v mt-30">
                                              <div className="d-flex align-items-center mb-12">
                                                <div className="stking-icon mr-12">
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
                                              <button className="cmn-btn-1 h-48 f-18 redius-12" onClick={() => { onUnstake(contract_id, nftData.token_id) }}>
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

export default Mint
