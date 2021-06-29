// 存在一个request函数用来进行ajax请求，请实现一个retry(option, callback ,count)函数
// request({
//   url: "./",
//   method: "GET",
//   data: {
//     param: {

//     }
//   }
// }, (error, data)=>{
//   if(error == null){
//     console.log(data);
//   }else{
//     // error handler...
//   }
// });

// function retry(option, callback, count){
//   request(option, (error, data)=>{
//     if(error != null){
//       if(count <= 0){
//         callback(error);
//       }else{
//         retry(option, callback, count - 1);
//       }
//     }else{
//       callback(null, data);
//     }
//   });
// }

// retry({}, ()=>{
//   retry({}, ()=>{
//     retry({}, ()=>{

//     });
//   });
// });