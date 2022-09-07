const express = require("express");
const app = express();
const port = 8080;
const { StreamrClient, StreamPermission } = require('streamr-client')
var bodyParser = require('body-parser')

app.use(bodyParser.json())

const streamr = new StreamrClient({
    auth: {
        privateKey: '5056265d115db3541cc59265cf6ecb2eeb27dddca470c8c73ea1e199befbbd59',
    },
})


app.get("/packet", (req, res) => {
 
  updateBlockchain(randomShite);

  res.send("Hello World!");
});

app.post("/packet", async (req, res) => {

  console.log(req)
  console.log(req.body)
    // update blockchain

 await publishToStreamr(req.body)

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

const publishToStreamr = async (packet) => {
  await streamr.publish('0x5b5269004dfd679dc7c85b0b8f153871f4f0986b/packet', packet)
}


