// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact carlos@prexis.io
contract Coffe is ERC721, ERC721Enumerable, Pausable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public constant maxSupply = 100;
    string public baseURI;

    event BaseURI(string _oldBaseURI, string _newBaseURI);

    constructor() ERC721("Coffe NFT Token", "COFF") {
        baseURI = "https://statics.fazendadecafe.com.br/";
    }

    function mint(address to) external onlyOwner {
        require(
            _tokenIdCounter.current() < maxSupply,
            "Coffe: maximum supply reached"
        );

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function setBaseURI(string calldata _newBaseURI) external onlyOwner {
        string memory _oldBaseURI = baseURI;
        baseURI = _newBaseURI;

        emit BaseURI(_oldBaseURI, _newBaseURI);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        require(
            from == address(0) || totalSupply() >= 10,
            "Coffe: insufficient tokens minted"
        );

        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
