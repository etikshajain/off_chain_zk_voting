
export default function generateKeys(  ){
    
        const { generateKeyPair } = require('crypto-es');
        var voterpublickey;
        var voterprivatekey;
       generateKeyPair('ec', {
       namedCurve: 'secp256k1',   // Options
       publicKeyEncoding: {
        type: 'spki',
        format: 'der'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'der'
      }
    },
     (err, publicKey, privateKey) => {
           if(!err)
           {
            voterpublickey = publicKey.toString('hex');
            voterprivatekey =  privateKey.toString('hex');  
           }
             
      });
      //User ko show sirf first two things karna hai neeche wale object ka
      const finalobj = { voterpublickey, voterprivatekey, publicKey, privateKey };
      return finalobj;



}