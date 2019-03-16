#!/usr/bin/env node
'use strict'

var chalk = require('chalk');
var inquirer = require('inquirer');

inquirer
  .prompt([
    /* Pass your questions in here */
      {
        type: 'rawlist',
        name: 'type',
        message: `${chalk.magenta(' What\'s your new job type？Please choose one of the following:')}`,
        choices: ['USA','CAN','Print','NON WMT'],
        default: 'USA'
      }
   
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
     switch (answers.type){
        case 'USA':
            require('./usa').run()
           break;
        case  'CAN':
            require('./can').run()
           break;
        case  'Print':
            require('./print').run()
           break;
        case  'NON WMT':
            require('./other').run()
           break;   
     }

  });
