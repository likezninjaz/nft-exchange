// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTBartex is Ownable {
    enum BARTEX_STATUS { OPEN, CLOSE }

    struct Bartex {
        address contractAddress;
        uint256 tokenId;
        BARTEX_STATUS status;
    }

    struct Offer {
        address contractAddress;
        uint256 tokenId;
    }

    // Index of the current bartex
    uint256 public bartexIndex = 0;

    // Mapping from a bartex to its attributes
    mapping (uint256=>Bartex) public bartexes;

    // Index of the current offer
    uint256 private offerIndex = 0;

    // Mapping from a offer to its data
    mapping (uint256=>Offer) public offers;

    // Mapping from a bartex to its offers
    mapping (uint256=>uint256[]) public bartexOffers;

    // Address for fees
    address payable public feeAddress;

    // Fee value
    uint256 public feeValue;

    /**
     * @notice Sets the fee address and its value
     *
     * @param _feeAddress The fee address.
     * @param _feeValue The fee value.
     */
    function setFee(address payable _feeAddress, uint256 _feeValue) external onlyOwner {
        feeAddress = _feeAddress;
        feeValue = _feeValue;
    }

    function createBartex(address _contractAddress, uint256 _tokenId) external {
        // TODO: check if token is approved
        bartexIndex = ++bartexIndex;
        bartexes[bartexIndex].contractAddress = _contractAddress;
        bartexes[bartexIndex].tokenId = _tokenId;
        bartexes[bartexIndex].status = BARTEX_STATUS.OPEN;
    }

    function deleteBartex(uint256 _bartexIndex) external onlyOwner {
        require(bartexes[_bartexIndex].status == BARTEX_STATUS.OPEN, "Bartex does not exist");

        bartexes[_bartexIndex].status = BARTEX_STATUS.CLOSE;
    }

    function getBartexOffers(uint256 _bartexIndex) view external returns(uint256[] memory) {
        return bartexOffers[_bartexIndex];
    }

    function createOffer(uint256 _bartexIndex, address _contractAddress, uint256 _tokenId) external {
        // TODO: check if token is approved
        require(bartexes[_bartexIndex].status == BARTEX_STATUS.OPEN, "Bartex does not exist");
        
        offerIndex = ++offerIndex;
        offers[offerIndex].contractAddress = _contractAddress;
        offers[offerIndex].tokenId = _tokenId;
        bartexOffers[_bartexIndex].push(offerIndex);
    }
}
