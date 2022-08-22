
export default function hashproof() {
  const { createHash } = require('crypto-es');
  const ok = "Ok bhai"
  
  var b =  createHash('sha256').update(ok).digest('hex');
  return b;
  
}