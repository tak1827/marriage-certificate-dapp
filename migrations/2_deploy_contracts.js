var MarriageCertificationIssuer = artifacts.require("./MarriageCertificationIssuer.sol");

module.exports = function(deployer) {
  deployer.deploy(MarriageCertificationIssuer);
};
