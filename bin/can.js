var fs = require('fs-extra');
var path = require('path');
var inquirer = require('inquirer');
var chalk = require('chalk');
const {getTime,mkdir,rename,open}= require('./utils');

function check_job(job){
   var patt=/[C][12][890][0-9]{2}[0-9A-Z][0-9]_[A-Z]{3}/g;
   return patt.test(job.toUpperCase())
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
		    	fs.copy(path.resolve(__dirname,'../.temp/CWMT_xxxxxx_xxx\ 做稿'),'./'+answers.job_number.toUpperCase()+'\ 做稿',function(err){
		    		if (err) return console.log(err)
	    	        const oldFilePath = './'+answers.job_number.toUpperCase()+'\ 做稿/CXXXXXX_XXX_DetailList_W.xls';
	    	        const newFilePath= './'+answers.job_number.toUpperCase()+'\ 做稿/'+answers.job_number.toUpperCase()+'_DetailList_W.xls'; 
	    	        rename(oldFilePath,newFilePath).then((data)=>{
	    	        	const dirPath = './'+answers.job_number.toUpperCase()+'\ 做稿/2\ raw\ client\ files/'+getTime();
	    	            return mkdir(dirPath)
		    	       
	    	        })
	    	        .then((data)=>{
                        const another_path = './'+answers.job_number.toUpperCase()+'\ 做稿/1\ intake\ sheet\ \&\ order/'+getTime();
                        mkdir(another_path)
	    	        })
	    	        .then(()=>{
		    	        	open().then(()=>{})
		    	        })
	    	        .catch(err=>{
	    	        	console.log(err)
	    	        })
	    	    	console.log('   New Job '+answers.job_number.toUpperCase()+' was created successfully!')	
		    	})
		    }else{
		    	console.log("Invalid case number")
		    }

		  });
	}
}