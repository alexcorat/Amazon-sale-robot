const tryVerify = require("./utils/tryVerify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const USDT = "0x55d398326f99059ff775485246999027b3197955";

  const args = [
    USDT,
    1633780800, // Sat Oct 09 2021 12:00:00 GMT+0000
    1635422400, //	Sat Oct 16 2021 15:00:00 GMT+0000
    BigInt(50000 * 10 ** 18).toString(),
  ];

  const depositPool = await deploy("DepositPool", {
    from: deployer,
    args: args,
    log: true,
  });

  await tryVerify(
    depositPool.address,
    args,
    "contracts/Pools/DepositPool.sol:DepositPool"
  );
};

module.exports.tags = ["FlashloansProd"];
