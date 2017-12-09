const accountSid = 'AC205921711ee6a870dc578b296474d69a';
const authToken = '09b728e5e573ab55bb7390b2a4e943b6';
const Twilio = require('twilio');
const client = new Twilio(accountSid, authToken);

client.api.calls
    .create({
        url: 'http://192.168.43.255:8000/gather',
        from: '+1641-323-4243 ',
        to: '+917983901060',
        body: 'hellow world'
    })
    .then((call) =>{
     console.log("---------------success", call)
} ).catch( (err) =>{
    console.log("eeeeeeeeeeeeeee", err)
});