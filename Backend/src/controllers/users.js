const userSchema = require("../models/Users");
const memoriesSchema = require('../models/memories')
const moment = require("moment");

const createUser = async (req, res) => {
    
    try {
        const profileID = req.body.profileID;
        const walletID = req.body.walletID;
        const memories = req.body.memories;
        const name =  req.body.name;

        const userObject = {
            profileID:profileID,
            walletAddress:walletID,
            Name:name
          };

          const user = userSchema(userObject);
          const userResponse = await user.save();
          

          for(let i=0; i < memories.length; i++){
            const memoriesObject = {
                //memoryDate: new Date(memories[i].memoryDate).toISOString(),
                memoryDate: moment(memories[i].memoryDate).format("MM-DD"),
                memoryDescription: memories[i].memoryDescription,
                User: userResponse._id
            }
            const memory = memoriesSchema(memoriesObject);
            const memoryResponse = await memory.save();
          }

          res.status(201).send('memories saved')

    } catch (error) {
        res.status(501).send(error.message)

    }

}

module.exports = {
    createUser
  };