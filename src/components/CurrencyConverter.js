import React, { useEffect, useState } from "react"
import { FaBitcoin, FaEthereum, FaEnvira, FaDollarSign } from "react-icons/fa"
import { FaChrome,FaFacebook,FaGithub} from "react-icons/fa"
import axios from "axios"

export default function CurrencyConverter() {

    const [currencies, setCurrencies] = useState({})
    const [choseCrypto, setChoseCrypto] = useState('BTC')
    const [choseCurrency, setChoseCurrency] = useState('USD')
    const [amount, setAmount] = useState(1)
    const [crypto, setCrypto] = useState(["BTC"])
    const [result, setResult] = useState(0)
    const [display, setDisplay] = useState(false)
    const [rightSelect, setRightSelect] = useState("result")
    const [leftSelect, setLeftSelect] = useState('crypto')


    const convert = () => {

        document.getElementById("load").classList.remove('d-none')
        setDisplay(true)
        axios.post(`http://localhost:3003/convert`, {
            crypto: choseCrypto,
            coin: choseCurrency
        })

            .then((res) => {
                let myCalculation = res.data[choseCurrency]
                let myResult = (myCalculation).toFixed(3)
                setResult(myResult)
                setDisplay(false)
                document.getElementById("load").classList.add('d-none')
            })
            .catch((error) => {
                console.log(error)
                setDisplay(false)

            })

    }


    useEffect(() => {

        axios.get("http://localhost:3003")
            .then((response) => {
                let myData = response.data
                setCurrencies(myData)
            })
            .catch((error) => {
                console.log(error)
            })
        axios.get("http://localhost:3003/data")
            .then((response) => {
                let myCoin = response.data
                setCrypto(myCoin)
            })
            .catch((error) => {
                console.log(error)
            })
        convert()
    }, [])

    function swap() {

        if (leftSelect === 'crypto') {
            setLeftSelect('fiat')
        } else {
            setLeftSelect('crypto')
        }

        if (rightSelect === "result") {
            setRightSelect("amount")
        } else {
            setRightSelect("result")
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-black">
                <div class="container-fluid">
                    <a class="navbar-brand ms-3 text-white" href="#">Crypto-converter</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active ms-4 text-white" aria-current="page" href="#">Home</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link active ms-4 text-white">Announcements</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active ms-4 text-white">Exchange</a>
                            </li>
                        </ul>
                        <form class="d-flex ms-5" role="search">
                            <input class="form-control ms-5 me-3" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success text-white" type="submit">Search</button>
                        </form>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active ms-5 " aria-current="page" href="#"><FaChrome/></a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link active "><FaFacebook/></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active "><FaGithub/></a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>

            <div className="container-fluid">
                <div className="row d-flex mt-2 ">
                    <div className="row ms-1 mt-4 ">
                        <div className="col-sm-4">
                            <div className="card" id="header">
                                <div className="card-body">
                                    <div className="col-12">
                                        <p className="text-uppercase shadow p-3  bg-body rounded fs-2 fw-bold text-center" >Crypto-Converter</p>
                                        <p className="fs-5  mt-4 fw-light ">A simple form used to convert Cryptocoins to Currency. Which shows the value of each coins which will be helpful </p>
                                        <p className="fs-5 mt-3 fw-light ms-2 " id="font"><FaBitcoin />  Bitcoin  </p>
                                        <p className="fs-5 fw-light ms-2 " id="font"><FaEthereum /> Ethereum </p>
                                        <p className="fs-5 fw-light ms-2  " id="font"><FaEnvira />Tether </p>
                                        <p className="fs-5 fw-light ms-2 mb-2 " id="font"><FaDollarSign />USD </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="card" id="header">
                                <div className="card-body">
                                    <div className="container">
                                        <h2 className="mb-3 shadow p-3 mb-3 bg-body rounded  text-center text-uppercase fs-2 fw-semibold" id="head"> Exchange Crypto</h2>
                                        <div className="row mb-4">
                                            <div className=" col-5 mb-3  mt-3">
                                                <div className="card shadow p-3  bg-body rounded" id="header">
                                                    <div className="card-body ">
                                                        {
                                                            leftSelect === 'crypto' ? (
                                                                <select
                                                                    value={choseCrypto} className="form-select currency-option-1" id="option" aria-label="Default select example"
                                                                    onChange={(e) => setChoseCrypto(e.target.value)}>
                                                                    {crypto.map((ele) => (<option value={ele} >{ele}</option>))}
                                                                </select>
                                                            ) : (
                                                                <select value={choseCurrency} className="form-select currency-option-1" id="option1" aria-label="Default select example"
                                                                    onChange={(e) => setChoseCurrency(e.target.value)}>
                                                                    {Object.keys(currencies).map((ele) => (<option value={ele}>{ele}</option>))}

                                                                </select>
                                                            )
                                                        }
                                                        <div className="form-group mb-3  mt-5" >
                                                            {
                                                                rightSelect !== 'amount' ? (
                                                                    <input className="form-control" id="amount" style={{ width: "110px" }}
                                                                        type="number" name="crypto"
                                                                        value={amount} onChange={(e) => setAmount(e.target.value)} />
                                                                ) : (
                                                                    <input id="responce" style={{ width: "110px" }} className="form-control"
                                                                        value={result * amount} />
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2 mt-4 " id="bottom">
                                                <div className="mt-5">
                                                    <i className="bi bi-arrow-left-right mt-5" id="arrow" onClick={() => swap()}></i>
                                                </div>
                                            </div>
                                            <div className="col-5 mb-3 mt-3 ">
                                                <div className="card shadow p-3  bg-body rounded" id="header">
                                                    <div className="card-body">
                                                        {
                                                            leftSelect !== 'crypto' ? (
                                                                <select
                                                                    value={choseCrypto} className="form-select currency-option-1" id="option ms-3" aria-label="Default select example"
                                                                    onChange={(e) => setChoseCrypto(e.target.value)}>
                                                                    {crypto.map((ele) => (<option value={ele} >{ele}</option>))}
                                                                </select>
                                                            ) : (
                                                                <select value={choseCurrency} className="form-select currency-option-1" id="option1" aria-label="Default select example"
                                                                    onChange={(e) => setChoseCurrency(e.target.value)}>
                                                                    {Object.keys(currencies).map((ele) => (<option value={ele}>{ele}</option>))}

                                                                </select>
                                                            )
                                                        }
                                                        <div className="col-4 form-group mb-3 mt-5">
                                                            {
                                                                rightSelect === 'amount' ? (
                                                                    <input className="form-control " id="amount" style={{ width: "110px" }}
                                                                        type="number" name="crypto"
                                                                        value={amount} onChange={(e) => setAmount(e.target.value)} />
                                                                ) : (
                                                                    <input id="responce " style={{ width: "110px" }} className="form-control"
                                                                        value={result * amount} />
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row ">
                                                <div className="col d-flex justify-content-center  rounded">
                                                    <button className={display ? "btn btn-secondary " : "btn btn-dark"} onClick={convert} disabled={display ? true : false} >
                                                        <span type="submit" id="word">Exchange</span>
                                                        <span className="spinner-border spinner-border-sm d-none ms-2" role="status" aria-hidden="true" id="load"></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

