
export default function main() {
    const { createHash } = require('crypto');
  const ok = "Ok bhai"
  
  var b =  createHash('sha256').update(ok).digest('hex');
  return b;
  
}