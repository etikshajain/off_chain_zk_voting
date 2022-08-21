
export default function stringToASCII(message){
    function getASCIIArray(s){
        let charCodeArr = [];
 
        for(let i = 0; i < s.length; i++){
         let code = s.charCodeAt(i);
         charCodeArr.push(code);
      }
 
      return charCodeArr;
   }

   return getASCIIArray(message);
}

