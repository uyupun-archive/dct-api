import dotenv from 'dotenv';
import fs from 'fs';
import Web3 from 'web3';

dotenv.config();

// プロバイダーのAlchemyを使用してGoerliネットワークに接続
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ALCHEMY_API_URL));

// 送金者を設定
const senderPrivateKey = process.env.PRIVATE_KEY;
const senderAccount = web3.eth.accounts.privateKeyToAccount(senderPrivateKey);
web3.eth.accounts.wallet.add(senderAccount);

// トークンコントラクトを設定
const ierc20Abi = JSON.parse(fs.readFileSync('./IERC20.json', 'utf-8')).abi;
const tokenContractAddress = process.env.TOKEN_CONTRACT_ADDRESS;
const tokenContract = new web3.eth.Contract(ierc20Abi, tokenContractAddress);

// トランザクションの作成
async function sendToken(toAddress, amount) {
  const gasPrice = await web3.eth.getGasPrice();
  const transferMethod = tokenContract.methods.transfer(toAddress, amount);

  const transaction = {
      from: senderAccount.address,
      to: tokenContractAddress,
      gas: await transferMethod.estimateGas({ from: senderAccount.address }),
      gasPrice: gasPrice,
      data: transferMethod.encodeABI()
  };

  return web3.eth.sendTransaction(transaction);
}

const recipientAddress = '0xAd4bb1548aF5205e8B9c749296Eebe36de33c90d';
const transferAmount = (100 * 10 ** 18).toString();
sendToken(recipientAddress, transferAmount)
  .then(receipt => {
      console.log("Transaction Hash:", receipt.transactionHash);
  })
  .catch(error => {
      console.error("Error sending transaction:", error);
  });