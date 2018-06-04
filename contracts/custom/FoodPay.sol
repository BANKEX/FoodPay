pragma solidity ^ 0.4 .23;
import "../token/multiToken/MultiDividendsToken.sol";
import "../ownership/Ownable.sol";

contract FoodPay is MultiToken, Ownable {
    /**
     * @dev Approve the passed addresses to spend specified amount of tokens on behalf of msg.sender.
     * 
     * This function is used to approve the array of addresses of each 
     * of the array of tokens by the corresponding number of tokens
     *
     * This function not for mainnet. Used only for fast hackathon solution to approve big count of addresses
     */
    function approveArr(uint256[] _tokenId, address[] _spender, uint256[] _value) onlyOwner public returns(bool) {
        var _sender = msg.sender;
        for (uint256 i = 0; i < _tokenId.length; i++) {
            for (uint256 b = 0; b < _spender.length; b++) {
                allowed[_tokenId[i]][_sender][_spender[b]] = _value[i];

            }

        }

        return true;
    }

    /**
     * @dev Create new _tokenId.length count of tokens by the corresponding values
     * 
     * This function not for mainnet. Used only for fast hackathon solution to creates big count of tokens
     */
    function createNewSubtokens(uint256[] _tokenId, address _to, uint256[] _value) onlyOwner public returns(bool) {
        for (uint256 i = 0; i < _tokenId.length; i++) {
            require(_value[i] > 0);
            balance[_tokenId[i]][_to] = _value[i];
            totalSupply_[_tokenId[i]] = _value[i];
            Transfer(_tokenId[i], address(0), _to, _value[i]);
        }

        return true;
    }
}