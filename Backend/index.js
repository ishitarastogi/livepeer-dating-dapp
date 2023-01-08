const express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var cors = require("cors");
const app = express();
const router = express.Router();
const config = require("./config");
const bodyParser = require("body-parser");
let cron = require("node-cron");
const memoriesSchema = require("./src/models/memories");
const moment = require("moment");
const { request, gql } = require("graphql-request");
const ethers = require('ethers');
const PushAPI = require("@pushprotocol/restapi");

let port = config.port;
let uriMongo = config.db_info;

const worldRoute = require("./src/routes/worldcoin");
const userRoute = require("./src/routes/user");

mongoose.connect(
  uriMongo,
  {
    //reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
    //useCreateIndex: true,
    //autoReconnect: true,
    useUnifiedTopology: true,
  },
  function (err, db) {
    if (err) {
      console.log("DB Connection errored");
      return;
    } else {
      console.log("DB Connected successfully");
    }
  }
);

app.use(cors());

//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, Access-Control-Allow-Origin"
//     );
//     res.header("Access-Control-Allow-Methods", "PUT, PATCH, GET, POST, DELETE");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
//   });

//   app.use(bodyParser.json());
//   app.use(
//     bodyParser.urlencoded({
//       extended: true
//     })
//   );

app.use(express.json());
app.use("/world", worldRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log("App running at port:" + port);
});

cron.schedule("* * * * *", async () => {
    const PK = config.CH_KEY;
    const Pkey = `0x${config.PR_KEY}`;
    const signer = new ethers.Wallet(Pkey);
  console.log("in Cron");
  let today;
  try {
    today = moment(new Date()).format("MM-DD");
 
    
  

  const data = await memoriesSchema.find({
    memoryDate: today,
  }).populate('User');
  console.log('level 1 length',data.length);

  data.map(async (mem) => {
    const profileID = mem.User.profileID;
    const req = gql`{
        followers(request: {
          profileId: "${profileID}"
        }) {
          items {
            wallet {
              address
            }
          }
        }
      }`;

      const followerData = await request(
        'https://api-mumbai.lens.dev/',
        req
      );
        let concatA = [] 
        console.log('followersData', followerData);
      followerData.followers.items.map(async(follower) => {
        let constantV = 'eip155:80001:'
        let final = `${constantV}${follower.wallet.address}`
        concatA.push(final)
      })
      console.log("--------------------->", concatA);
      let messageTitle = `Today is special for ${mem.User.Name}, let's congratulate together 🎊`
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 4, // subset
        identityType: 2, // direct payload
        notification: {
          title: `${messageTitle}`,
          body: `[s: ${mem.memoryDescription}]`
        },
        payload: {
          title: `${messageTitle}`,
          body: `[s: ${mem.memoryDescription}]`,
          cta: '',
          img: ''
        },
        recipients: concatA, // recipients addresses
        channel: `eip155:80001:${config.CH_PKEY}`, // your channel address
        env: 'staging'
      });
  })



  
} catch (error) {
    console.log(error);
}
});

module.exports = app;
