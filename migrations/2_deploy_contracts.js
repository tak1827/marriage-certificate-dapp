var MarriageCertificateIssuer = artifacts.require("./MarriageCertificateIssuer.sol");

module.exports = function(deployer) {
  deployer.deploy(MarriageCertificateIssuer);
};
