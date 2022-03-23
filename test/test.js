describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    const Market = await ethers.getContractFactory("NFTMarket")
    const market = await Market.deploy()
    await market.deployed()

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy()
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')
    const mintPrice = ethers.utils.parseUnits('0.5', 'ether')

    await nft.mintNFT("https://www.mytokenlocation.com", mintPrice)
    await nft.mintNFT("https://www.mytokenlocation2.com", mintPrice)

    await market.itemOnMarket(nftContractAddress, 1, auctionPrice, "forSale", { value: listingPrice })
    await market.itemOnMarket(nftContractAddress, 2, auctionPrice, "forAuction", { value: listingPrice })
    await market.itemOnMarket(nftContractAddress, 2, auctionPrice, "forAuction", { value: listingPrice })

    const [_, buyerAddress] = await ethers.getSigners()

    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice })

    items = await market.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)
  })
})
