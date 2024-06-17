const { counterModel } = require("../model/counterModel");

const createCustomId = async function (name, nameID) {
  return new Promise(async (resolve, reject) => {
    const findCounter = await counterModel.findOne({ name });
    if (findCounter) {
      const updateCounter = await counterModel.findOneAndUpdate(
        { counterId: findCounter.counterId },
        { $inc: { seq: 1 } },
        { new: true }
      );
      if (updateCounter) resolve(`${nameID}${updateCounter.seq}`);
    } else {
      const addCounter = await counterModel.create({ name, seq: 1 });
      if (addCounter) {
        resolve(`${nameID}${addCounter.seq}`);
      }
    }
  });
};

const getCustomBlogCategoryId = async function () {
  const name = "blog-category-ID";
  const nameID = "CB0";
  const customId = await createCustomId(name, nameID);
  return customId;
};

const getCustomEventCategoryId = async function () {
  const name = "event-category-ID";
  const nameID = "CE0";
  const customId = await createCustomId(name, nameID);
  return customId;
};

const getCustomSubCategoryId = async function () {
  const name = "subcategory-ID";
  const nameID = "SC0";
  const customId = await createCustomId(name, nameID);
  return customId;
};

const getCustomProductId = async function () {
  const name = "product-ID";
  const nameID = "P0";
  const customId = await createCustomId(name, nameID);
  return customId;
};

const getCustomCouponId = async function () {
  const name = "coupon-ID";
  const nameID = "CP0";
  const customId = await createCustomId(name, nameID);
  return customId;
};

module.exports = {
  getCustomBlogCategoryId,
  getCustomEventCategoryId,
  getCustomSubCategoryId,
  getCustomProductId,
  getCustomCouponId,
};
