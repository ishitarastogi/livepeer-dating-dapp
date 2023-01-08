const moment = require("moment");

const t = moment('2022-12-03T00:57:00.471Z').format("MM-DD")
console.log(t);

const temp  = moment(new Date()).format("MM-DD")
console.log(temp)