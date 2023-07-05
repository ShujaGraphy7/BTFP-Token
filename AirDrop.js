const { ethers } = require("ethers");
const ABI = require("./ABI.json");
require("dotenv").config();

const providerUrl = process.env.PROVIDER_URL;
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = ABI;

const contract = new ethers.Contract(contractAddress, contractABI, provider);

const privateKey = process.env.PRIVATE_KEY;

const recipients = [
  
  // Add more recipient addresses here
];

const amounts = [
  
  // Add more amounts here
];

// Function to send tokens to multiple addresses
async function sendTokens() {
  const wallet = new ethers.Wallet(privateKey, provider);
  const signer = wallet.connect(provider);
  if (recipients.length == amounts.length) {
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      const amount = ethers.utils.parseUnits(amounts[i].toString(), 18);

      // Send tokens
      const transaction = await contract
        .connect(signer)
        .transfer(recipient, amount);
      await transaction.wait();

      console.log(`Sent ${amount.toString()} tokens to ${recipient}`);
    }
  }
}

sendTokens();
