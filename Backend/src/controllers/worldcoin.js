const worldSchema = require("../models/WorldID");
const axios = require('axios');

const verifyID = async (req, res) => {
    
    const merkle_root = req.body.merkle_root;
    const nullifier_hash = req.body.nullifier_hash;
    const action_id = req.body.action_id;
    const signal = req.body.signal;
    const proof = req.body.proof;

    try {

        const response = await axios.post('https://developer.worldcoin.org/api/v1/verify', {
        merkle_root,
        nullifier_hash,
        action_id,
        signal,
        proof
      });
      return res.status(200).json({
        success: false,
        data: {
          msg: 'successful',
          results: response,
        },
      });
        
    } catch (error) {
        console.log('in error');
        //console.log(error.message);
        console.log(error);
        res.status(400).send('user not eligible to register')
    }

}

module.exports = {
    verifyID
  };