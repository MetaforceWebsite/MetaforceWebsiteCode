const PADDLE_ENVIRONMENT_IS_SANDBOX = false;
const PADDLE_CLIENT_API_TOKEN = PADDLE_ENVIRONMENT_IS_SANDBOX ? 'test_ca588667e6359ffbb474343f37c' : 'live_a68dd372f7809ffb069202d9049'
const PADDLE_PRICE_REQUESTS = PADDLE_ENVIRONMENT_IS_SANDBOX ? {
    items: [
        { quantity: 1, priceId: 'pri_01jta1x1vj0r3q7ft9byvyam2t' }, // 1 Month
        { quantity: 1, priceId: 'pri_01jta21d8bn3h7m6v98nary7pf' }, // 3 Months
        { quantity: 1, priceId: 'pri_01jta252eyxyggvjnpehsbytgf' }, // 6 Months
        { quantity: 1, priceId: 'pri_01jta26588t1nab896hrezmrtn' }, // Yearly
        { quantity: 1, priceId: 'pri_01jta2a2c2b9cadz106hr096cw' }, // One-Time Price
    ],
    address: {
        countryCode: 'US'
    }
} : {
    items: [
        { quantity: 1, priceId: 'pri_01jtyvx2mrfd78x92fnwyjmavq' }, // 1 Month
        { quantity: 1, priceId: 'pri_01jtyvy0pfvb450de3y8wr8jze' }, // 3 Months
        { quantity: 1, priceId: 'pri_01jtyvyqv9djjekg5ygjkbnbm0' }, // 6 Months
        { quantity: 1, priceId: 'pri_01jtyvzka5rrjgd2b7radjxc6c' }, // Yearly
        { quantity: 1, priceId: 'pri_01jtyw0g3ph49twwt76qgh1gjz' }, // One-Time Price
        /* { quantity: 1, priceId: 'pri_01jv6em6evb66bcsb1m542j3z6' }, // PROD TEST ONLY */
    ]/* ,
    address: {
        countryCode: 'US'
    } */
};

const METAFORCE_SERVICE_URL_REQUEST_CODE = "/metaforce/verification-code/request";
const METAFORCE_SERVICE_URL_VERIFY_CODE = "/metaforce/verification-code/verify";

const METAFORCE_SERVICE_URL_CUSTOMER = "/metaforce/customer";
const METAFORCE_SERVICE_URL_CASE = "/metaforce/case";
const METAFORCE_SERVICE_URL_CASE_COMMENT = "/metaforce/case_comment";

export {
    PADDLE_ENVIRONMENT_IS_SANDBOX,
    PADDLE_CLIENT_API_TOKEN,
    PADDLE_PRICE_REQUESTS,

    METAFORCE_SERVICE_URL_REQUEST_CODE,
    METAFORCE_SERVICE_URL_VERIFY_CODE,

    METAFORCE_SERVICE_URL_CUSTOMER,
    METAFORCE_SERVICE_URL_CASE,
    METAFORCE_SERVICE_URL_CASE_COMMENT
}