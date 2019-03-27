var fs = require('fs');

function getTime(){
	var date = new Date(),mon,hours,minutes,seconds;
	
	mon = date.getMonth()  + 1;     //getMonth()返回的是0-11，则需要加1
	hours = date.getHours(); 
    minutes=date.getMinutes(); 
    seconds=date.getSeconds();        
	if(mon <=9){                                     //如果小于9的话，则需要加上0
	mon = "0" + mon;
	}
	var day = date.getDate();                   //getdate()返回的是1-31，则不需要加1
	if(day <=9){                                     //如果小于9的话，则需要加上0
	day = "0" + day;
    }
    if(hours <=9){                                     //如果小于9的话，则需要加上0
	hours = "0" + hours;
    }
    if(minutes <=9){                                     //如果小于9的话，则需要加上0
	minutes = "0" + minutes;
    }
    if(seconds <=9){                                     //如果小于9的话，则需要加上0
	seconds = "0" + seconds;
    }

	return  mon +  day;
}

function open(){
	const { exec_cmd } = require('slimz')
    return exec_cmd('cd *做稿;open *.xls*',()=>{})
}

function mkdir(folder_path){
	const promise = new Promise((resolve,reject)=>{
       fs.mkdir(folder_path,err=>{
       	if (err) {reject(err)}  
       	resolve(folder_path) 
       })
	})
	return promise;
	
}

function rename(old_path,new_Path){
	const promise = new Promise((resolve,reject)=>{
       fs.rename(old_path,new_Path,err=>{
       	if (err) { reject(err)}
       	resolve('success')	
       })
	})
	return promise;
}

module.exports={
	getTime,
	mkdir,
	rename,
	open
};