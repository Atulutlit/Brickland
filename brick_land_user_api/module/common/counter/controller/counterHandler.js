const { counterModel } = require("../model/counterModel");

const createCustomId = async function (name, idPrefix) {
  return new Promise(async (resolve, reject) => {
    const findCounter = await counterModel.findOne({ name });
    if (findCounter) {
      const updateCounter = await counterModel.findOneAndUpdate(
        { counterId: findCounter.counterId },
        { $inc: { seq: 1 } },
        { new: true }
      );
      if (updateCounter) resolve(`${idPrefix}${updateCounter.seq}`);
    } else {
      const addCounter = await counterModel.create({ name, seq: 1 });
      if (addCounter) {
        resolve(`${idPrefix}${addCounter.seq}`);
      }
    }
  });
};

const getCustomUserId = async function () {
  const name = "user-ID";
  const idPrefix = "U";
  const customId = await createCustomId(name, idPrefix);
  return customId;
};

const getCustomAddressId = async function () {
  const name = "address-ID";
  const idPrefix = "AD";
  const customId = await createCustomId(name, idPrefix);
  return customId;
};

const getCustomOrderId = async function () {
  const name = "order-ID";
  const idPrefix = "O";
  const customId = await createCustomId(name, idPrefix);
  return customId;
};

module.exports = {
  getCustomUserId,
  getCustomAddressId,
  getCustomOrderId,
};
