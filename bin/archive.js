var fsa = require('fs-extra');
var fs = require('fs');
var path = require("path")

const desc_folder = "/Volumes/datavolumn_bmkserver_Pub/新做稿/未开始/"

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

	return date.getFullYear() + "-" + mon + "-" +  day+' '+hours+':'+minutes+':'+seconds;
}

var root = path.join('/Users/apple/desktop')
 
readDirSync(root)
function readDirSync(path){
	var pa = fs.readdirSync(path);
	pa.forEach(function(ele,index){
		var info = fs.statSync(path+"/"+ele)	
		var reg = /.*做稿/g;
		var archive_files=[];
		if(info.isDirectory() && reg.test(ele)){
            archive_files.push(ele)
		}
		archive_files.forEach(folder=>{
			console.log(folder)
			// fsa.copy('/Users/apple/desktop/'+folder, desc_folder+'/'+folder , function(err){
			//   if (err){
   //                fs.appendFile('history',getTime()+'  '+folder+' was copied to '+desc_folder+'  failed\n',function(err){
   //                	if (err) throw err;
   //                	console.log(folder+'move to' +desc_folder + 'failed' )
   //                })
      			 
			//   }else{
			//   	  //remove the folder on desktop
			//   	  fsa.remove('/Users/apple/desktop/'+folder, function(err){
			//   	    if (err) return console.error(err)
	  //                      //append log
	  //   	              fs.appendFile('history',getTime()+'  '+folder+' was copied to '+desc_folder+'  success\n',function(err){
	  //   	              	if (err) throw err;
	  //   	              	 console.log(folder+'move to' +desc_folder + 'success' )
	  //   	              })			
			//   	  });
                    
			//   }
              
			// }); //copies file

		})

	})

}