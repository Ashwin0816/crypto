const express = require("express");

const app = express()

const cors = require("cors")

const axios = require("axios");
const { response } = require("express");

app.use(express.json())

app.use(cors({
  origin: "*"
}))
let myname;
let myFunction = (req, res, next) => {
  axios.get("https://cdn.moneyconvert.net/api/latest.json")
    .then((response) => {
      res.locals.crypto = (response.data.rates)
      next()


    })
    .catch((error) => {
      console.log(error)
    })
}

app.get("/", myFunction, (req, res) => {

  res.send(res.locals.crypto)
})


let myCurrency = (req, res, next) => {
  axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
    .then((response) => {
      let myCoin = response.data
      let myCoins = myCoin.map((ele) => ele.symbol).map((e) => e.toUpperCase())
      res.locals.currency = (myCoins)
      next()
    })
    .catch((error) => {
      console.log(error)
    })
}

app.get("/data", myCurrency, (req, res) => {
  res.send(res.locals.currency)
})

// let myConvert =(req,res,next) =>{
//   axios.get("https://min-api.cryptocompare.com/data/price?fsym=${choseCrypto}&tsyms=${choseCurrency}")
//   .then((responce) => {
//     res.locals.exchange = response 
//     next()
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// }

// app.post("/",myConvert,(req,res)=>{
//   res.json("res.locals.exchange")
// })
app.post("/convert", ((req, res) => {
  let crypto = req.body.crypto
  let coin = req.body.coin
  axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=${coin}`)
    .then((response) => {
      res.send(response.data)
    })
  .catch ((error) =>
    console.log(error))
}))


app.listen((3003))