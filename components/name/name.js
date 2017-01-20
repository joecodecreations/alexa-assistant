// here you can place your variables

// This function will be called by the platform to verify credentials
module.exports = [{



  function saveName(name, cb) {


    // In credentials you will find what users entered in account form
    console.log('Credentials passed for verification %j', credentials)
    if (true) {
        // Verified
        return cb(null, {verified: true});
    } else {
       // Verification failed
       return cb(null , {verified: false});
    }
}


}];
