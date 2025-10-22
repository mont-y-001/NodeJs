let arr = [1,2,3,4,5];
 

//#ForEach used to access array one by one and we can change accrding to us but "return value not array"
// let newArr = arr.forEach(function(val){
//        console.log(val+1);
// })  


//#Map is same as forEach but it returns Array
// let newArr = arr.map( (val)=> {
//     return val*3;
// })
// console.log(newArr)


//#Filter give values or item in array less than or equal to array
// let newArr = arr.filter((val)=>{
//     return val>3;    //yah pr if condition lgti h then true hote hi array me value pass hojati h otherwise false
// })
// console.log(newArr);


//Async

async function abcd(){
    let blob = await fetch(`http://randomuser.me/api/`);
    let ans =  await blob.json();

    console.log(ans.results);
}
abcd();