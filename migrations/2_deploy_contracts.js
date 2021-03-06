// puts GamingMoments contract to the blockchain by doing "truffle migrate"

const GameMoments = artifacts.require("GameMoments");

module.exports = function (deployer) {
  deployer.deploy(GameMoments);
};
