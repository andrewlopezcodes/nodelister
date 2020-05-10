#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk')

//method #2

const lstat = util.promisify(fs.lstat);

// method #3

// const {
//   lstat
// } = fs.promises;

fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) {
    console.log(err)
  }

  const statPromises = filenames.map(filename => {
    return lstat(filename);
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(filenames[index])
    } else {
      console.log(chalk.red(filenames[index]))
    }

    // console.log(filenames[index], stats.isFile());


  }

});

// //method #1
// const lstat = filename => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(stats);
//     })
//   })
// };