const admin = require("firebase-admin");
const { project_key_id, project_key, client_email, client_id, auth_uri, token_uri, auth_cert_url, client_cert_url } = require("../config/config");

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "fetchcart-01",
        "private_key_id": project_key_id,
        "private_key": project_key,
        "client_email": client_email,
        "client_id": client_id,
        "auth_uri": auth_uri,
        "token_uri": token_uri,
        "auth_provider_x509_cert_url": auth_cert_url,
        "client_x509_cert_url": client_cert_url,
        "universe_domain": "googleapis.com"
    }),
});

module.exports = admin;
