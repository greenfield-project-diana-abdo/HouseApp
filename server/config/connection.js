const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;


main()
    .then(()=> console.log (`DB is connected successfully`))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(URI);

}

module.exports = main;