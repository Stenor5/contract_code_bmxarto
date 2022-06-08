const hre = require('hardhat')
const address = require("../config");

console.log(address)
async function main() {
  await hre.run("verify:verify", {
    address: address.nftaddress,
    constructorArguments: []
  })
  await hre.run("verify:verify", {
    address: address.nftmarketaddress,
    constructorArguments: []
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })