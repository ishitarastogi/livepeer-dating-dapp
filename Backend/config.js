if(process.env.NODE_ENV){
    require ('custom-env').env(process.env.NODE_ENV || 'prod');
  }else{
    process.env.NODE_ENV = 'prod';
    require ('custom-env').env(process.env.NODE_ENV);
  }


  module.exports = {
    port: 8001,
    db_info:
      "mongodb+srv://thunderpi:--Earth123--@thunderpi.rmgof.mongodb.net/slambook?retryWrites=true&w=majority",
    RPC: "https://rpc-mumbai.maticvigil.com/",
    PR_KEY: "d760dc1596fdf9791829852e6b5af30cac922ee0f1b320ff4f3ab49b1997446b",
    CH_KEY: "d760dc1596fdf9791829852e6b5af30cac922ee0f1b320ff4f3ab49b1997446b",
    CH_PKEY: "0x9147BDf9aaca01B5f2680633e254a9776ecB10e5",
  };