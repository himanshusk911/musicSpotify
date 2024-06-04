const express= require('express')
const cors =require("cors")
const bodyParser=require("body-parser")
const SpotifyWebApi=require('spotify-web-api-node');

const app=express()
app.use(cors())
app.use(bodyParser.json())

app.post('/refersh',(req,res) =>{
  const refreshToken= req.body.refreshToken
  console.log(refreshToken)
  const spotifyApi=new SpotifyWebApi({
    redirectUri:'http://localhost:3000',
    clientId:'2c639e27880e48aa871ec43751fe1e8d',
    clientSecret:'959aa5a0fd174f549d26ca3718b9b54f',
    refreshToken,
    })
    spotifyApi
     .refreshAccessToken()
     .then(data => {
       res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })

})
app.post('/login',(req,res)=>{
    const code=req.body.code
    const spotifyApi=new SpotifyWebApi({
    redirectUri:'http://localhost:3000',
    clientId:'2c639e27880e48aa871ec43751fe1e8d',
    clientSecret:'959aa5a0fd174f549d26ca3718b9b54f',

    })
    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })
})
app.listen(3001)