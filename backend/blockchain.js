import { ethers } from "ethers";
import dotenv from "dotenv";
import abuseReportSystem from "./ARS.json" assert { type: "json" };

dotenv.config({ path: "config/config.env" });

const contractAddress = process.env.CONTRACTADDRESS;
const providerUrl = "http://localhost:8545"; // Modify if not using a local node

// Connect to the provider
const provider = new ethers.JsonRpcProvider(providerUrl);

// Load wallet/signer from private key or mnemonic in environment variables
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

// Create a contract instance
const contract = new ethers.Contract(
  contractAddress,
  abuseReportSystem.abi,
  signer
);

// Function to submit an abuse report
export async function submitAbuseReportOnBC(reportInput) {
  try {
    // Send the transaction to the blockchain
    const tx = await contract.submitAbuseReport(reportInput);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    let reportId = await getReportCount();

    return { success: true, reportId, txHash: tx.hash };
  } catch (error) {
    console.error("Error submitting report:", error);
    return { success: false, error: error.message };
  }
}

// Function to get a report by ID (Admin-only access)
export async function getReport(reportId) {
  try {
    const report = await contract.getReport(reportId);
    return report;
  } catch (error) {
    console.error("Error retrieving report:", error);
    return { success: false, error };
  }
}

// Function to get the report count
export async function getReportCount() {
  try {
    const count = await contract.getReportCount();
    return count.toString();
  } catch (error) {
    console.error("Error retrieving report count:", error.message);
    return { success: false, error: error.message };
  }
}


/*
// Calling getReportCount for testing purposes
getReportCount().then((result) => {
  if (result.success === false) {
    console.error("Failed to retrieve report count:", result.error);
  } else {
    console.log("Current report count:", result);
  }
});

// Sample data for the report
const sampleReport = {
  victimName: "John Doe",
  phoneNumber: "1234567890",
  abuseType: "Physical",
  gender: "Male",
  age: 30,
  incidentLocation: "123 Street Name",
  incidentCity: "CityName",
  incidentState: "StateName",
  incidentDate: "2024-01-01",
  description: "Description of the abuse incident.",
  evidence: ["evidence-link-1", "evidence-link-2"], // Array of evidence URLs or descriptions
};

// Function to submit the sample report
async function submitSampleReport() {
  try {
    const response = await submitAbuseReport(sampleReport);
    if (response.success) {
      console.log("Sample report submitted successfully:", response.txHash);
    } else {
      console.error("Failed to submit sample report:", response.error);
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}

// Call the function to submit the sample report
// submitSampleReport();

async function testGetReport(reportId) {
  console.log(`Fetching report with ID: ${reportId}`);
  
  const report = await getReport(reportId);
  
  if (report.success === false) {
    console.error("Failed to retrieve report:", report.error);
  } else {
    console.log("Retrieved report successfully:", report);
  }
}

// Example usage:
const reportId = 1; // Replace with a report ID you'd like to test
testGetReport(reportId);
*/