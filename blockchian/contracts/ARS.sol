// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AbuseReporting {
    // Struct to store abuse report details
    struct Report {
        string victimName;
        string phoneNumber;
        string abuseType;
        string gender;
        uint256 age;
        string incidentLocation;
        string incidentCity;
        string incidentState;
        string incidentDate;
        string description;
        string[] evidence;
    }

    // Struct to hold report input details as a single parameter
    struct ReportInput {
        string victimName;
        string phoneNumber;
        string abuseType;
        string gender;
        uint256 age;
        string incidentLocation;
        string incidentCity;
        string incidentState;
        string incidentDate;
        string description;
        string[] evidence;
    }

    address private admin;
    Report[] private reports;
    uint256 private reportCounter;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Unauthorized access!!");
        _;
    }

    // Event to log new report submission
    event ReportSubmitted(uint256 reportId);

    // Constructor to set the admin address
    constructor() {
        admin = msg.sender;
    }

    // Function to submit an abuse report using a struct as input
    function submitAbuseReport(
        ReportInput memory reportInput
    ) public returns (uint256) {
        Report memory newReport = Report({
            victimName: reportInput.victimName,
            phoneNumber: reportInput.phoneNumber,
            abuseType: reportInput.abuseType,
            gender: reportInput.gender,
            age: reportInput.age,
            incidentLocation: reportInput.incidentLocation,
            incidentCity: reportInput.incidentCity,
            incidentState: reportInput.incidentState,
            incidentDate: reportInput.incidentDate,
            description: reportInput.description,
            evidence: reportInput.evidence
        });

        reports.push(newReport); // Add the report to the array
        reportCounter++; // Increment the report counter

        emit ReportSubmitted(reportCounter); // Emit the event with report ID and user ID
        return reportCounter;
    }

    // Function to get the report count
    function getReportCount() public view returns (uint256) {
        return reportCounter;
    }

    // Function to retrieve a report (only accessible by the admin)
    function getReport(uint256 _reportId) public view onlyAdmin returns (Report memory) {
        require(_reportId > 0 && _reportId <= reportCounter, "Invalid report ID");
        return reports[_reportId - 1];
    }
}
