var axios = require('axios');
async function upload(json) {
    var data = JSON.stringify({
      "pinataOptions": {
        "cidVersion": 1
      },
      "pinataMetadata": {
        "name": "off_chain_zk_voting",
        "keyvalues": json
      },
      "pinataContent":json
    });
    var config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNWM2ZDhiNS03NmYwLTRjNTUtOTY0NC1kOTIzNmMwZTVjNTgiLCJlbWFpbCI6ImphaW5ldGlrc2hhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjYjk5ZjRhOGU2ZGIzM2I2YTA5OCIsInNjb3BlZEtleVNlY3JldCI6ImFjNjJhOTQ5NzRlYTcwMTc0Zjg4YzQwYTRhM2UzMTRkOWY1YzU0NGVhNjIwNzMzZjY4NTcwODBlZDQzZjFhMWYiLCJpYXQiOjE2NjExMDM5OTR9.GKLNPCS88TmAynM3q08Ib4U7f83ttUnBl6veZdicxC8'
      },
      data : data
    };
    const res = await axios(config);
    let hash = res.data.IpfsHash
    console.log(hash);
    return hash
  }

  async function f() {
    const res = await upload({"data":"fjefje"})
    return res
  }

let l = f()

console.log(l)