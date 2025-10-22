const fs = require('fs');


//Syntax : fs.writeFile(path,data[,options],callback)
//fs.write create a file New.txt and add a content that is written then callback means function runs if error in method or not
fs.writeFile("New.txt", "Hello World:This is Mohit Yadav", function(err){
if(err){
    console.log(err);
}
else{
    console.log("Done");
}
})

//append used to add content in that is already written in file that was craeted before
fs.appendFile("New.txt", ".How are you?I want to know!!", function(err){
if(err){
    console.log(err);
}
else{
    console.log("Done");
}
})

//Rename
// fs.rename("new.txt","Old.txt",function(err){
//     if(err)  console.log(err);
//     else console.log("Done");
// })

//copyFile
fs.copyFile("New.txt","./Copy/newCopy.txt", function(err){
    if(err) console.log(err);
    else console.log("Done");
})

//Unlink => remove dir or file
//fs,rmdir = > delete folder but sure it will empty folder otherwise it will not deleted

//How to delete content inside folders
fs.rm("./Copy", {recursive:true}, function(err){
    if(err) console.log(err);
    else console.log("Removed");
})