// test/GovernorTest.js
const { expect } = require("chai");

describe("VulnReportGovernance", function () {
  let token, governance, owner, voter1, voter2;

  beforeEach(async () => {
    [owner, voter1, voter2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MockVulnToken");
    token = await Token.deploy();

    const Gov = await ethers.getContractFactory("VulnReportGovernance");
    governance = await Gov.deploy(token.address);

    await token.transfer(voter1.address, ethers.utils.parseEther("100"));
    await token.transfer(voter2.address, ethers.utils.parseEther("100"));
  });

  it("Should allow submission and validity vote", async () => {
    await token.connect(voter1).approve(governance.address, ethers.utils.parseEther("5"));
    await governance.connect(voter1).submitReport("ipfs://report123");

    await token.connect(voter2).approve(governance.address, ethers.utils.parseEther("1"));
    await governance.connect(voter2).voteValidity(1, true);

    const report = await governance.reports(1);
    expect(report.votesFor).to.be.gt(0);
  });
});