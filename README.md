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
 1.refresh token
 2.acess token

 just read about it
 single user authentication
 
 
