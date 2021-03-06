// to update smart contract code, do "truffle migrate --reset"
// * NEED Ganache OPEN * //

// * truffle migrate --reset --network ropsten-infura * //

pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

// [X] 1. Model the Video
// [X] 2. Store the Video
// [X] 3. Upload Video
// [X] 4. List Videos

contract GameMoments {
    uint256 public videoCount = 0;
    //"public" means can access outside of the smart contract
    // you can get this value by doing "truffle console", doing dVideo = await DVideo.deployed(), then doing name = await dVideo.name(), and typing name
    string public name = "ReKt";
    mapping(uint256 => Video) public videos;

    // map a person's address to all the videos they have
    mapping(address => Video[]) public account_videos;

    // mapping videos to games
    mapping(string => Video[]) public game_videos;

    // 1. Model the Video
    struct Video {
        uint256 id;
        string hash; //from ipfs
        string title;
        address author;
        string game;
    }

    event VideoUploaded(
        uint256 id,
        string hash,
        string title,
        address author,
        string game
    );

    constructor() public {}

    function uploadVideo(
        string memory _videoHash,
        string memory _title,
        string memory _game
    ) public {
        // Make sure the video hash exists
        require(bytes(_videoHash).length > 0);
        // Make sure video title exists
        require(bytes(_title).length > 0);
        // Make sure game category exists
        require(bytes(_game).length > 0);
        // Make sure uploader address exists
        require(msg.sender != address(0));

        // Increment video id
        videoCount++;

        // Add video to the contract
        videos[videoCount] = Video(
            videoCount,
            _videoHash,
            _title,
            msg.sender,
            _game
        ); // msg is a global variable, msg.sender is the person (address) calling the function

        // adding the video to a person's personal collection
        account_videos[msg.sender].push(
            Video(videoCount, _videoHash, _title, msg.sender, _game)
        );

        // pushing a new Video into a collection for its game
        game_videos[_game].push(
            Video(videoCount, _videoHash, _title, msg.sender, _game)
        );

        // Trigger an event
        emit VideoUploaded(videoCount, _videoHash, _title, msg.sender, _game);
    }

    function returnVideosInGame(string memory _game)
        public
        view
        returns (Video[] memory)
    {
        return game_videos[_game];
    }

    function returnVideosForAddress() public view returns (Video[] memory) {
        // Note about msg.sender: you have to specify it using the from parameter in web3.
        // When you write "from" in a .call (which is a view method), you can make it
        // "from" whoever you want, it doesn't actually have to be you. In a normal
        // TRANSACTION though where you write data, the from must be you obviously,
        // or else you'd be able to modify the contract using someone else's address.
        return account_videos[msg.sender];
    }
}
