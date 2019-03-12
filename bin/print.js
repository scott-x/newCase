var fs = require('fs-extra');
var path = require('path');
var inquirer = require('inquirer');
var chalk = require('chalk');


function check_job(job){
   var patt=/[P][12][890][0-9]{2}[0-9A-Z][0-9]/g;
   return patt.test(job.toUpperCase())
}

function getJob(job){
   if (/.*LNC/.test(job.toUpperCase())) {
   	  return job.toUpperCase()
   }else{
   	return job.toUpperCase()+'_LNC'
   }
}
module.exports={
	run: function(){
		inquirer
		  .prompt([
		    /* Pass your questions in here */
		     {
		     	type: 'input',
		        name: 'job_number',
                message: `${chalk.magenta(' Input your job number here: ')}`
             }
		  ])
		  .then(answers => {
		    // Use user feedback for... whatever!!
		    if (check_job(answers.job_number)){
		    	// console.log(answers.job_number)
		    	fs.copy(path.resolve(__dirname,'../temp/印刷/P15xxxx_xxx'),'./'+getJob(answers.job_number),function(err){
		    		if (err) return console.log(err)
		    		console.log('New Job '+answers.job_number.toUpperCase()+' was created successfully!')
		    	})
		    }else{
		    	console.log("Invalid case number")
		    }

		  });
	}
}