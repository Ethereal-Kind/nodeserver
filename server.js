const { ethers } = require("ethers");
const { StreamrClient, StreamPermission } = require('streamr-client')
const express = require("express");
var bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
const port = 8080;
app.use(bodyParser.json())
app.use(cors());

const collectionAbi = require('./abi/collection.json')

const PRIVATEKEY = '5056265d115db3541cc59265cf6ecb2eeb27dddca470c8c73ea1e199befbbd59'
const PROJECT_ID = '8f9718edf04841699139f7e0fab41d66'

const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${PROJECT_ID}`)
console.log({provider})

const collectionAddress = "0xcC34C41FF8bCAAaA5B8964528243ba4798785ada" 
const stakingAddress = "0xdBC168264b4e00d08fc0DE1198Bd44b8C85d390f"

const wallet = new ethers.Wallet(PRIVATEKEY, provider)
const signer = wallet.provider.getSigner(wallet.address)

console.log({wallet})



// mint social token
async function aquireNFT() {
  const owner = wallet.connect();
  console.log({owner})
  const nftContract = new ethers.Contract(
    collectionAddress,
    collectionAbi,
  signer 
  );
  const mint = await nftContract.mint(
    owner.address,
    1
  );
  console.log("mint", mint);
}



app.get("/packet", (req, res) => {
 
  updateBlockchain(randomShite);

  res.send("Hello World!");
});

app.post("/packet", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
console.log('wallet', req.body[0])
  const provider = req.body.provider

  
const streamr = new StreamrClient({
    auth: {
         privateKey: req.body[0]
    },
})

  // console.log(req)
  // console.log(req.body)
    // update blockchain

 await publishToStreamr(streamr, req.body[1])

  res.send("Published");
});


app.post("/wallet", async (req, res) => {


console.log('working')
const stream = await streamr.getStream('0x5b5269004dfd679dc7c85b0b8f153871f4f0986b/packet')

const permission = await stream.hasPermission({
    permission: StreamPermission.SUBSCRIBE,
    user: '0xa87F3C98BF6003d167A4Aac48B355C467163B07B',
    allowPublic: true
})
console.log({permission})
  if (permission.permission = true ) {
    console.log('trigger')
  }

const permissions = await stream.getPermissions()
console.log(permissions)

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const publishToStreamr = async (streamr, packet) => {
  await streamr.publish('0x5b5269004dfd679dc7c85b0b8f153871f4f0986b/packet', packet)
}


