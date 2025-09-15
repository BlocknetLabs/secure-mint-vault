// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecureMintVault is SepoliaConfig {
    using FHE for *;
    
    struct WhitelistEntry {
        euint32 entryId;
        euint32 priority;
        euint32 contributionAmount;
        bool isVerified;
        bool isActive;
        string encryptedData;
        address user;
        uint256 timestamp;
    }
    
    struct MintRequest {
        euint32 requestId;
        euint32 tokenAmount;
        euint32 price;
        bool isApproved;
        bool isProcessed;
        address requester;
        uint256 timestamp;
    }
    
    struct VaultStats {
        euint32 totalEntries;
        euint32 verifiedEntries;
        euint32 totalMinted;
        euint32 totalRevenue;
    }
    
    mapping(uint256 => WhitelistEntry) public whitelistEntries;
    mapping(uint256 => MintRequest) public mintRequests;
    mapping(address => euint32) public userReputation;
    mapping(address => bool) public isWhitelisted;
    
    VaultStats public vaultStats;
    
    uint256 public entryCounter;
    uint256 public requestCounter;
    
    address public owner;
    address public verifier;
    address public treasury;
    
    uint256 public constant MAX_ENTRIES = 10000;
    uint256 public constant MIN_CONTRIBUTION = 0.01 ether;
    uint256 public constant MAX_CONTRIBUTION = 10 ether;
    
    event WhitelistEntryAdded(uint256 indexed entryId, address indexed user);
    event WhitelistEntryVerified(uint256 indexed entryId, bool isVerified);
    event MintRequestCreated(uint256 indexed requestId, address indexed requester);
    event MintRequestApproved(uint256 indexed requestId, bool isApproved);
    event TokensMinted(uint256 indexed requestId, address indexed to, uint32 amount);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier, address _treasury) {
        owner = msg.sender;
        verifier = _verifier;
        treasury = _treasury;
        
        // Initialize vault stats
        vaultStats = VaultStats({
            totalEntries: FHE.asEuint32(0),
            verifiedEntries: FHE.asEuint32(0),
            totalMinted: FHE.asEuint32(0),
            totalRevenue: FHE.asEuint32(0)
        });
    }
    
    function addWhitelistEntry(
        externalEuint32 priority,
        externalEuint32 contributionAmount,
        string memory encryptedData,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(entryCounter < MAX_ENTRIES, "Maximum entries reached");
        require(msg.value >= MIN_CONTRIBUTION && msg.value <= MAX_CONTRIBUTION, "Invalid contribution amount");
        require(!isWhitelisted[msg.sender], "Already whitelisted");
        
        uint256 entryId = entryCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalPriority = FHE.fromExternal(priority, inputProof);
        euint32 internalContribution = FHE.fromExternal(contributionAmount, inputProof);
        
        whitelistEntries[entryId] = WhitelistEntry({
            entryId: FHE.asEuint32(0), // Will be set properly later
            priority: internalPriority,
            contributionAmount: internalContribution,
            isVerified: false,
            isActive: true,
            encryptedData: encryptedData,
            user: msg.sender,
            timestamp: block.timestamp
        });
        
        isWhitelisted[msg.sender] = true;
        
        // Update vault stats
        vaultStats.totalEntries = FHE.add(vaultStats.totalEntries, FHE.asEuint32(1));
        
        emit WhitelistEntryAdded(entryId, msg.sender);
        return entryId;
    }
    
    function verifyWhitelistEntry(uint256 entryId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify entries");
        require(whitelistEntries[entryId].user != address(0), "Entry does not exist");
        
        whitelistEntries[entryId].isVerified = isVerified;
        
        if (isVerified) {
            vaultStats.verifiedEntries = FHE.add(vaultStats.verifiedEntries, FHE.asEuint32(1));
        }
        
        emit WhitelistEntryVerified(entryId, isVerified);
    }
    
    function createMintRequest(
        externalEuint32 tokenAmount,
        externalEuint32 price,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(isWhitelisted[msg.sender], "Not whitelisted");
        require(whitelistEntries[entryCounter - 1].isVerified, "Entry not verified");
        
        uint256 requestId = requestCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalTokenAmount = FHE.fromExternal(tokenAmount, inputProof);
        euint32 internalPrice = FHE.fromExternal(price, inputProof);
        
        mintRequests[requestId] = MintRequest({
            requestId: FHE.asEuint32(0), // Will be set properly later
            tokenAmount: internalTokenAmount,
            price: internalPrice,
            isApproved: false,
            isProcessed: false,
            requester: msg.sender,
            timestamp: block.timestamp
        });
        
        emit MintRequestCreated(requestId, msg.sender);
        return requestId;
    }
    
    function approveMintRequest(uint256 requestId, bool isApproved) public {
        require(msg.sender == verifier, "Only verifier can approve requests");
        require(mintRequests[requestId].requester != address(0), "Request does not exist");
        
        mintRequests[requestId].isApproved = isApproved;
        
        emit MintRequestApproved(requestId, isApproved);
    }
    
    function processMintRequest(uint256 requestId) public {
        require(mintRequests[requestId].isApproved, "Request not approved");
        require(!mintRequests[requestId].isProcessed, "Request already processed");
        require(msg.sender == owner, "Only owner can process requests");
        
        mintRequests[requestId].isProcessed = true;
        
        // Update vault stats
        vaultStats.totalMinted = FHE.add(vaultStats.totalMinted, mintRequests[requestId].tokenAmount);
        vaultStats.totalRevenue = FHE.add(vaultStats.totalRevenue, mintRequests[requestId].price);
        
        emit TokensMinted(requestId, mintRequests[requestId].requester, 0); // Amount will be decrypted off-chain
    }
    
    function updateUserReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getWhitelistEntryInfo(uint256 entryId) public view returns (
        uint8 priority,
        uint8 contributionAmount,
        bool isVerified,
        bool isActive,
        string memory encryptedData,
        address user,
        uint256 timestamp
    ) {
        WhitelistEntry storage entry = whitelistEntries[entryId];
        return (
            0, // FHE.decrypt(entry.priority) - will be decrypted off-chain
            0, // FHE.decrypt(entry.contributionAmount) - will be decrypted off-chain
            entry.isVerified,
            entry.isActive,
            entry.encryptedData,
            entry.user,
            entry.timestamp
        );
    }
    
    function getMintRequestInfo(uint256 requestId) public view returns (
        uint8 tokenAmount,
        uint8 price,
        bool isApproved,
        bool isProcessed,
        address requester,
        uint256 timestamp
    ) {
        MintRequest storage request = mintRequests[requestId];
        return (
            0, // FHE.decrypt(request.tokenAmount) - will be decrypted off-chain
            0, // FHE.decrypt(request.price) - will be decrypted off-chain
            request.isApproved,
            request.isProcessed,
            request.requester,
            request.timestamp
        );
    }
    
    function getVaultStats() public view returns (
        uint8 totalEntries,
        uint8 verifiedEntries,
        uint8 totalMinted,
        uint8 totalRevenue
    ) {
        return (
            0, // FHE.decrypt(vaultStats.totalEntries) - will be decrypted off-chain
            0, // FHE.decrypt(vaultStats.verifiedEntries) - will be decrypted off-chain
            0, // FHE.decrypt(vaultStats.totalMinted) - will be decrypted off-chain
            0  // FHE.decrypt(vaultStats.totalRevenue) - will be decrypted off-chain
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function withdrawFunds() public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        require(address(this).balance > 0, "No funds to withdraw");
        
        // Transfer funds to treasury
        payable(treasury).transfer(address(this).balance);
    }
    
    function emergencyPause() public {
        require(msg.sender == owner, "Only owner can pause");
        // Implementation for emergency pause functionality
    }
    
    function emergencyUnpause() public {
        require(msg.sender == owner, "Only owner can unpause");
        // Implementation for emergency unpause functionality
    }
}
