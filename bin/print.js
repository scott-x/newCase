var fs = require('fs-extra');
var path = require('path');
var inquirer = require('inquirer');
var chalk = require('chalk');
const {getTime,mkdir,rename,open}= require('./utils');

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
		    	let oldFilePath,newFilePath;
		    	fs.copy(path.resolve(__dirname,'../.temp/印刷/P15xxxx_xxx'),'./'+getJob(answers.job_number),function(err){
		    		if (err) return console.log(err)
		    		if (/.*LNC/.test(answers.job_number.toUpperCase())){
           	    		oldFilePath = './'+answers.job_number.toUpperCase()+'/BXXXXXX_XXX_DetailList_W.xls';
               	        newFilePath= './'+answers.job_number.toUpperCase()+'/'+answers.job_number.toUpperCase()+'_DetailList_W.xls'; 
		    		}else{
			    		oldFilePath = './'+answers.job_number.toUpperCase()+'_LNC/BXXXXXX_XXX_DetailList_W.xls';
		    	        newFilePath= './'+answers.job_number.toUpperCase()+'_LNC/'+answers.job_number.toUpperCase()+'_DetailList_W.xls';
		    		}	
		    		 
	    	        rename(oldFilePath,newFilePath).then((data)=>{
	    	        	const folderName= newFilePath.substring(2,9)+"_LNC"
	    	        	const dirPath = './'+folderName+'/3报价单或订单/'+getTime();
	    	            return mkdir(dirPath).then(()=>{
	    	            	return Promise.resolve(folderName)
	    	            })
	    	        })
		    	    .then((folderName)=>{
		    	    	    console.log(folderName)
		    	        	const { exec_cmd } = require('slimz')
                            exec_cmd(`cd ${folderName};open *.xls`,()=>{})
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