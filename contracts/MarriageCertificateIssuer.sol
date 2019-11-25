pragma solidity 0.5.0;

import '@openzeppelin/contracts/ownership/Ownable.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';

/**
 * @title MarriageCertificateIssuer
 * @dev Issue marriage certificate. 
 * Don't issue as ERC720 for saving gas cost purpose. We don't assume to trasfer token
 */
contract MarriageCertificateIssuer is Ownable {
    using SafeMath for uint256;

    uint256 public FEE = 20000000000000000;
    uint256 private deposits;
    uint256 private prefix = 20000000;

    struct Certificate {
        bytes32 bride;
        bytes32 groom;
    }

    // Certificate ID range is 20000001 to 4294967295
    Certificate[] public certificates;

    /**
     * @dev Emitted when certificate issued
     */
    event Issued (uint256 indexed certificateID, bytes32 bride, bytes32 groom);

    /**
     * @dev Reverts if fee is not same as FEE
     */
    modifier confirmFee() {
        require(msg.value == FEE, "Should pay exact 0.02 ETH");
        _;
    }

    /**
     * @dev Issue marriage certificate
     * @param _bride One persono name got married
     * @param _groom The other persono name got married
     */
    function issueCertificate(bytes32 _bride, bytes32 _groom) public confirmFee payable returns (uint256) {

        uint256 certificateID = certificates.push(Certificate({
            bride: _bride,
            groom: _groom
        })).add(prefix);

        uint256 amount = msg.value;
        deposits = deposits.add(amount);

        emit Issued(certificateID, _bride, _groom);

        return certificateID;
    }

    /**
     * @dev Withdraw accumulated fee by owner
     */
    function withdrawFee(address payable payee) public onlyOwner {
        uint256 payment = deposits;
        deposits = 0;
        payee.transfer(payment);
    }

    /**
     * @dev See accumulated fee by owner
     */
    function depositedFee() public view onlyOwner returns (uint256) {
        return deposits;
    }
}
