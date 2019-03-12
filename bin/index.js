#!/usr/bin/env node
'use strict'
// process.title = 'sc';
var program = require('commander');
var chalk = require('chalk');
var inquirer = require('inquirer');

program.version(require('../package').version)
.usage('<command> [options]');

program
	.command('generate')
	.description('generate daily new case for benchmark')
	.alias('g')
    .action(() => {
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
    })       

program.parse(process.argv)

if(!program.args.length){
    program.help()
}