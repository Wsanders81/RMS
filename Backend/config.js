
require("dotenv").config(); 

const SECRET_KEY = process.env.SECRET_KEY || "Pejd$52s!j"

// set up port 3001 if running DB locally so it doesn't conflict with React port 3000
const PORT = +process.env.PORT || 3001
const DB_URI = `postgresql://`
function getDatabaseUri(){
	
    return (process.env.NODE_ENV === "test") ? `${DB_URI}/rms_test` : process.env.DATABASE_URL || `${DB_URI}/rms`
    // return (process.env.NODE_ENV === "test") ? `${DB_URI}/rms_test` : process.env.DATABASE_URL || `${DB_URI}/rms`
}

// speed up bcrypt during testing
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12 ;

module.exports = {
    SECRET_KEY, 
    PORT, 
    BCRYPT_WORK_FACTOR, 
    getDatabaseUri
}