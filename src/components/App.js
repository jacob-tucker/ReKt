import React, { useEffect, useState } from 'react';
import GameMoments from '../abis/GameMoments.json'
import Navbar from './Navbar/Navbar'
import Main from './Main/Main'
import Games from './Games/Games'
import Game from './Games/Game/Game'
import Profile from './Profile/Profile'
import Web3 from 'web3';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';
export const appHistory = createBrowserHistory()
const classNames = require('classnames')

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

const App = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState('');
  const [gameMoments, setGameMoments] = useState(null);
  const [buffer, setBuffer] = useState(null);
  const [videos, setVideos] = useState([]);
  const [hashTx, setHashTx] = useState(null)
  const [receiptSucceed, setReceiptSucceed] = useState(false)
  const [receiptFail, setReceiptFail] = useState(false)
  const [receiptPending, setReceiptPending] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function thisAsyncFunction() {
      await loadWeb3()
      await loadBlockchainData()
    }

    thisAsyncFunction();
  }, [])

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3
    // Load accounts
    const accounts = await web3.eth.getAccounts() // gets the address
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId() // gets the networkId you're on (in this case it gets 5777 because of Ganache)
    const networkData = GameMoments.networks[networkId]
    if (networkData) {
      const tempgamemoments = new web3.eth.Contract(GameMoments.abi, networkData.address) // you can see the networkId we want (5777 if we're using Ganache) by using networkId, and then this is the address the contract is deployed to (the address will survive even if Ganache closes, but it won't be able to sign more transactions)

      const videosCount = await tempgamemoments.methods.videoCount().call() //call is used when no state change and it doesn't cost ETH. Equivalent of having "view" or "pure" keywords in Solidity method calls when specifying the type.

      // Load videos, sort by newest
      const arrayOfVideos = []
      for (var i = videosCount; i >= 1; i--) {
        const video = await tempgamemoments.methods.videos(i).call() // the mapping in solidity is a method
        arrayOfVideos.push(video)
        console.log(arrayOfVideos)
      }
      setVideos(arrayOfVideos)

      setLoading(false)

      setGameMoments(tempgamemoments)

    } else {
      window.alert('GameMoments contract not deployed to detected network.') // So for example if you go to the main eth network this will happen
    }
  }

  // Prepares the file for upload to IPFD
  const captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      setBuffer(Buffer(reader.result))
      // Cannot just log buffer here or it will be null
      // Use useEffect as the callback
    }
  }

  useEffect(() => {
    console.log(buffer)
  }, [buffer])

  // Upload video
  const uploadVideo = (title, game) => {
    console.log("The title:", title)
    console.log("Submitting file to IPFS...")

    // Add to IPFS...
    ipfs.add(buffer, (error, result) => { // Result has the ipfs hash in it
      console.log('IPFS result', result)
      if (error) {
        console.error(error)
        return
      }

      // Put on blockchain and save to smart contract...

      setLoading(true)
      gameMoments.methods.uploadVideo(result[0].hash, title, game).send({ from: account })
        .on('transactionHash', (hash) => { // Send is needed to "write" data to the blockchain (send a transaction)
          setLoading(false);
          setReceiptPending(true);
          console.log(hash)
          setHashTx(hash)

          setInterval(() => {
            setReceiptPending(false)
          }, 5000)
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          console.log({ confirmationNumber, receipt })
        })
        .on('receipt', (receipt) => {
          console.log(receipt)
          setReceiptSucceed(true)

          setInterval(() => {
            setReceiptSucceed(false)
          }, 5000)
        })
        .on('error', (error, receipt) => {
          console.log({ error, receipt })
          setError(error)
          setReceiptFail(true)

          setInterval(() => {
            setReceiptFail(false)
          }, 5000)
        })
    })
  }

  return (
    <BrowserRouter history={appHistory}>
      <div className={classNames({ "blurMe": receiptSucceed || receiptFail || receiptPending, "mainDiv": true })}>
        <Navbar account={account} />
        <img id="background-image" src="https://cdn.medal.tv/assets/img/desktop-background.png" alt="background" />
        <div className={classNames({ "transaction-receipt": receiptPending, "dont-display": true })}>
          <p>Transaction Recepit: <span style={{ color: "purple" }}>Transaction Pending</span></p>
          <p>Transaction Hash: <span style={{ color: "purple" }}>{hashTx}</span></p>
          <p>Your transaction is currently pending.</p>
        </div>
        <div className={classNames({ "transaction-receipt": receiptSucceed, "dont-display": true })}>
          <p>Transaction Recepit: <span style={{ color: "green" }}>Transaction Succeeded</span></p>
          <p>Transaction Hash: <span style={{ color: "purple" }}>{hashTx}</span></p>
          <p>Congradulations! Please wait a few minutes for your video to appear.</p>
        </div>
        <div className={classNames({ "transaction-receipt": receiptFail, "dont-display": true })}>
          <h2>Transaction Recepit: <span style={{ color: "red" }}>Transaction Failed</span></h2>
          <p>Transaction Hash: <span style={{ color: "purple" }}>{hashTx}</span></p>
          <p style={{ fontSize: "8px" }}>Transaction Error: {error}</p>
        </div>
        {loading
          ? <div id="loader"><p>Loading...</p></div>
          :
          <Switch>
            <Route exact path="/"
              render={(routeProps) => <Main {...routeProps} captureFile={captureFile} uploadVideo={uploadVideo} videos={videos} />}>
            </Route>
            <Route exact path="/games"
              render={(routeProps) => <Games {...routeProps} contract={gameMoments} />}>
            </Route>
            <Route path="/games/:game"
              render={(routeProps) => <Game {...routeProps} captureFile={captureFile} uploadVideo={uploadVideo} contract={gameMoments} />}>
            </Route>
            <Route path="/profile/:address"
              render={(routeProps) => <Profile {...routeProps} contract={gameMoments} />}>
            </Route>
          </Switch>
        }
      </div>
    </BrowserRouter>
  );

}

export default App;