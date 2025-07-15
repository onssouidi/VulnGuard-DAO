// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VulnReportGovernance {
    IERC20 public vulnToken;
    uint public reportCount;
    address public admin;

    enum ReportPhase { ValidityVoting, SeverityVoting, Finalized }
    enum Severity {  Warning, Low, Medium, High, Critical }

    struct Report {
        address reporter;
        string ipfsHash;
        uint submissionFee;
        uint votesFor;
        uint votesAgainst;
        mapping(Severity => uint) severityVotes;
        Severity finalSeverity;
        ReportPhase phase;
        bool isValid;
        uint voteDeadline;
    }

    mapping(uint => Report) public reports;
    mapping(uint => mapping(address => bool)) public hasVoted;

    event ReportSubmitted(uint reportId, address reporter);
    event ValidityVoted(uint reportId, address voter, bool support);
    event SeverityVoted(uint reportId, address voter, Severity severity);
    event ReportFinalized(uint reportId, bool accepted, Severity severity);

    constructor(address _vulnToken) {
        vulnToken = IERC20(_vulnToken);
        admin = msg.sender;
    }

    function submitReport(string calldata _ipfsHash) external {
        uint fee = 5 * 10 ** 18; // here we have to specify the fee for submission
        require(vulnToken.transferFrom(msg.sender, address(this), fee), "Fee transfer failed,Try again");

        reportCount++;
        Report storage r = reports[reportCount];
        r.reporter = msg.sender;
        r.ipfsHash = _ipfsHash;
        r.submissionFee = fee;
        r.phase = ReportPhase.ValidityVoting;
        r.voteDeadline = block.timestamp + 2 days; //to change

        emit ReportSubmitted(reportCount, msg.sender);
    }

    function voteValidity(uint reportId, bool support) external {
        Report storage r = reports[reportId];
        require(r.phase == ReportPhase.ValidityVoting, "Wrong phase");
        require(!hasVoted[reportId][msg.sender], "Already voted");
        require(block.timestamp < r.voteDeadline, "Voting closed");

        uint weight = vulnToken.balanceOf(msg.sender);
        require(weight > 0, "No tokens to vote");

        hasVoted[reportId][msg.sender] = true;
        if (support) r.votesFor += weight;
        else r.votesAgainst += weight;

        emit ValidityVoted(reportId, msg.sender, support);
    }

    function moveToSeverityVote(uint reportId) external {
        Report storage r = reports[reportId];
        require(block.timestamp >= r.voteDeadline, "Still in validity voting");
        require(r.phase == ReportPhase.ValidityVoting, "Already moved");

        uint totalVotes = r.votesFor + r.votesAgainst;
        require(totalVotes > 0, "No votes");
        uint validityPercent = (r.votesFor * 100) / totalVotes;

        if (validityPercent >= 70) { //here the percentage of the validity
            r.phase = ReportPhase.SeverityVoting;
            r.voteDeadline = block.timestamp + 2 days;
            r.isValid = true;
        } else {
            r.phase = ReportPhase.Finalized;
            emit ReportFinalized(reportId, false, Severity.None);
        }
    }

    function voteSeverity(uint reportId, Severity severity) external {
        Report storage r = reports[reportId];
        require(r.phase == ReportPhase.SeverityVoting, "Wrong phase");
        require(!hasVoted[reportId][msg.sender], "Already voted");
        require(block.timestamp < r.voteDeadline, "Voting closed");
        require(severity != Severity.None, "Invalid severity");

        uint weight = vulnToken.balanceOf(msg.sender);
        require(weight > 0, "No tokens to vote");

        hasVoted[reportId][msg.sender] = true;
        r.severityVotes[severity] += weight;

        emit SeverityVoted(reportId, msg.sender, severity);
    }

    function finalizeReport(uint reportId) external {
        Report storage r = reports[reportId];
        require(r.phase == ReportPhase.SeverityVoting, "Not in finalization phase");
        require(block.timestamp >= r.voteDeadline, "Voting not over");

        r.phase = ReportPhase.Finalized;

        Severity topSeverity = Severity.None;
        uint topVotes = 0;

        for (uint i = 1; i <= 5; i++) {
            Severity s = Severity(i);
            uint v = r.severityVotes[s];
            if (v > topVotes) {
                topVotes = v;
                topSeverity = s;
            }
        }

        r.finalSeverity = topSeverity;
        emit ReportFinalized(reportId, true, topSeverity);
    }

    function getSeverityVotes(uint reportId, Severity severity) external view returns (uint) {
        return reports[reportId].severityVotes[severity];
    }
}