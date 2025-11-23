install first 
`npm init` || `npm init -y` ==> `-y` means yes it is a ls command 
{
        yes all 
}
install 
install express
`npm i express`

install  
`npm i nodemon` what is this 
{
        bro kuch nhi hai 
        bas apna file node file ko monitor karta hai
        if any changes in our node file happen then it restart the rendering of our file

        two types of installation
        1. `npm i -D nodemon`
            -D ==> installation for only dev dependencies

        2. `npm i nodemon`
}


install 
`npm i cors`

install 
`npm i mongoose`

{
        important when you setup mongoose

        tab : password normal hi rakhana if
        u use any special character then it will give error
}


{
        install nodemailer
        `npm i nodemailer`

         mailtrap.in ==> freely send mail
        add mailtrap.io
}



new concept {
        how to sign in through google
        how to sign in through github
        how to sign in through facebook

        we use symmetric encryption == in normal

        we use asymmetric encryption == public key and private key (only read and see allow){
                you can not set or update the key
                you can only read the key
                you can only see the key

        }

        in statefull authentication you can not scalable
        but security is most important

        in assymmetric authentication we prefer scalability
        but security is most important

        authentication =={
                1.openID connect
                2.SAML
        }

        what is that ==>{
                lets read it
                open id connect (OIDC) is an identity authentication protocol that allows users to access multiple applications with a single set of credentials. It is an open standard built on top of Oauth2.0 enabling applications and user verification and obtain basic profile information , supporting single sign on (SSO) across different applications.
        }

        Take an Example {
                Google == sandard ==> connect YT , INSTAGRAM ,FACEBOOK,....etc
                open standard
        }

        Working ==>{
                AUTH SERVICE in every system --> issue token 
                Private Key in it

                public key ==> {
                        globally available for all domain
                        public key in every system
                        `accounts.google.com/` then type the URL 
                        URL=##````.well-known/openid-configuration````
########################`https://accounts.google.com/.well-known/openid-configuration`

`jwks_uri": "https://www.googleapis.com/oauth2/v3/certs` public Key

                app.get("./.well-known/openid-configuration" , (req , res) => {
                        res.json({ jwks_uri: "https://www.lucky.com/public-key" });  
                })

                when user login in google then google issue token
                token contain public key
                token contain user id
                token contain user name
                token contain user email
                token contain user profile
                token contain user profile

                when you send ==>{
                        jwt.sign({
                                sub: user.id,
                                name: user.name, //they are called claims
                                email: user.email,
                                issuer : accounts.google.com
                        } , secret);

                search claims 
                jwt claims

                by getting this information we can verify user identity
                 now we go to the `accounts.google.com/.well-known/openid-configuration`
                 then we go to the `jwks/uri`
                 then i got our public key


                 now i verify that with the token that we got from google
                 we verify that with the public key that we got from google
                 if it is match then we can verify user identity


                        
                }

                }

                then match your token with public key and private key if it is match then you are authenticated
        }

        {
                2.SAML 
         ==> works on xml
         ==> works on https
        }
        

        how token is given to the particular doamin name server
        that is done by oAuth2 to our domain name server
        oAuth2 is a authorization server

        how token is verified dns to google
        by using public key that is given by google to our domain name server (OpenID connect)

        only google with their internal servers like YT , GMAIL , ...etc
        can verify through openID connect



        but for other servers like chaicode ,(means how u login  through gmail and verify) , ...etc
        we need to use oAuth2 to get the token from them(becoz google connect with them through oAuth2)
        and then we need to use oAuth2 to verify the token with their public key


}


{
        Access token and refresh Token
        Access token is used to get the user data
        refresh token is used to get the new access token when the access token is expired

}


# new concept
 hybrid authentication through
 1.refresh token(long lived)
 2.acess token(short lived)

 just read about it
 single user authentication


# openID and Oauth
for good user experience we use openID
openID is used to authenticate the user(OpenID is used to verify the user identity)
Oauth is used to authorize the user(Oauth is used to give access to the user)
# Oauth2
{
        Oauth2 is a authorization framework that enables applications to obtain limited access to user accounts on an HTTP service, such as Facebook, GitHub, or DigitalOcean. It works by allowing users to authorize third-party applications to access their information without sharing their passwords.
        
        Oauth2 is used to authorize the user
        Oauth2 is used to get the access token
        Oauth2 is used to get the refresh token
        Oauth2 is used to get the user data
}

# Oauth2 flow
{
        1. User clicks on the login button
        2. User is redirected to the authorization server (Google, Facebook, etc.)
        3. User logs in and authorizes the application
        4. Authorization server redirects back to the application with an authorization code
        5. Application exchanges the authorization code for an access token and refresh token
        6. Application uses the access token to access user data
        7. If access token expires, application uses refresh token to get a new access token
}
# Oauth2 grant types
{
        1. Authorization Code Grant
        2. Implicit Grant
        3. Resource Owner Password Credentials Grant
        4. Client Credentials Grant
        5. Device Authorization Grant
}
# Oauth2 grant types explained
{
        1. Authorization Code Grant: 
            - Used for server-side applications
            - User is redirected to the authorization server to log in and authorize the application
            - Application receives an authorization code which is exchanged for an access token

        2. Implicit Grant: 
            - Used for client-side applications (e.g., single-page applications)
            - User is redirected to the authorization server to log in and authorize the application
            - Access token is returned directly in the URL

        3. Resource Owner Password Credentials Grant: 
            - Used when the user trusts the application (e.g., first-party applications)
            - User provides their username and password directly to the application
            - Application exchanges credentials for an access token

        4. Client Credentials Grant: 
            - Used for machine-to-machine communication
            - Application authenticates itself using its own credentials to obtain an access token

        5. Device Authorization Grant: 
            - Used for devices with limited input capabilities (e.g., smart TVs, IoT devices)
            - User is provided a code to enter on another device to authorize the application
}
# Oauth2 scopes
{
        Scopes are used to limit the access that an application has to a user's data. 
        They define what resources the application can access and what actions it can perform.
        
        Example scopes:
        - `profile`: Access to the user's profile information
        - `email`: Access to the user's email address
        - `openid`: Access to the user's OpenID Connect information
}
# Oauth2 tokens
{
        1. Access Token: 
            - Used to access protected resources
            - Has a limited lifespan (usually a few hours)

        2. Refresh Token: 
            - Used to obtain a new access token when the current one expires
            - Has a longer lifespan (can be days or weeks)
}
# Oauth2 token storage
{
        Access tokens and refresh tokens can be stored in various ways:
        1. In-memory storage (not persistent, lost on server restart)
        2. Database storage (persistent, can be used across server restarts)
        3. Secure cookies (for web applications)
        4. Local storage (for client-side applications)
}
# Oauth2 security
{
        1. Use HTTPS to protect tokens in transit
        2. Store tokens securely (e.g., encrypted in a database)
        3. Implement token expiration and rotation
        4. Validate tokens on each request
        5. Use scopes to limit access
}
# Oauth2 best practices
{
        1. Use the Authorization Code Grant for server-side applications
        2. Use the Implicit Grant for client-side applications
        3. Use short-lived access tokens and long-lived refresh tokens
        4. Implement proper error handling and logging
        5. Regularly review and update your Oauth2 implementation
}
# Oauth2 libraries
{
        1. Passport.js: A popular authentication middleware for Node.js that supports Oauth2.
        2. Grant: A middleware for Express.js that simplifies Oauth2 integration.
        3. Oauth2orize: A toolkit for implementing Oauth2 providers in Node.js.
        4. SimpleOauth2: A library for managing Oauth2 tokens and flows in Node.js.
}
# Oauth2 resources
{
        1. Oauth2 specification: https://oauth.net/2/
        2. Oauth2 documentation: https://oauth.net/documentation/
        3. Oauth2 tutorials: https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2
        4. Oauth2 libraries:
                - Passport.js: https://www.passportjs.org/
                - Grant: https://github.com/simov/grant
                - Oauth2orize: https://oauth2orize.readthedocs.io/en/latest/
                - SimpleOauth2: https://github.com/lelylan/simple-oauth2
        5. Oauth2 best practices: https://auth0.com/docs/best-practices/oauth2
        6. Oauth2 security: https://auth0.com/docs/security/oauth2
        7. Oauth2 scopes: https://auth0.com/docs/scopes
        8. Oauth2 grant types: https://auth0.com/docs/flows
        9. Oauth2 token storage: https://auth0.com/docs/tokens
        10. Oauth2 error handling: https://auth0.com/docs/errors/oauth2
        11. Oauth2 logging: https://auth0.com/docs/logs
        12. Oauth2 token validation: https://auth0.com/docs/tokens/validation
        13. Oauth2 token expiration: https://auth0.com/docs/tokens/expiration
        14. Oauth2 token rotation: https://auth0.com/docs/tokens/rotation
        15. Oauth2 implementation review: https://auth0.com/docs/reviews/oauth2
        16. Oauth2 implementation update: https://auth0.com/docs/updates/oauth2
        17. Oauth2 client libraries: https://auth0.com/docs/libraries/oauth2
        18. Oauth2 server libraries: https://auth0.com/docs/libraries/oauth2-server
        19. Oauth2 client-side libraries: https://auth0.com/docs/libraries/oauth2-client

}

# Oauth2 and OpenID Connect
{
        Oauth2 is a framework for authorization, while OpenID Connect is an authentication layer built on top of Oauth2.
        OpenID Connect allows clients to verify the identity of the end-user based on the authentication performed by an authorization server.
        It provides a standardized way to obtain user profile information and supports single sign-on (SSO) across different applications.
}

# Oauth2 and OpenID Connect resources
{
        1. OpenID Connect specification: https://openid.net/specs/openid-connect-core-1_0.html
        2. OpenID Connect documentation: https://openid.net/connect/
        3. OpenID Connect tutorials: https://www.digitalocean.com/community/tutorials/an-introduction-to-openid-connect
        4. OpenID Connect libraries:
                - Passport.js with OpenID Connect: https://www.passportjs.org/packages/passport-openidconnect/
                - OIDC Client:
                - https://github.com/panva/node-oidc-client
                -
                - OpenID Connect Client:

}


