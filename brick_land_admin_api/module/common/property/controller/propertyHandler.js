"use strict";
const { Types } = require("mongoose");
const { propertyModel } = require("../model/propertyModel");

const propertyList = async (req, res) => {
  try {
    // const { searchKey, type } = req.query;
    // if (!type) {
    //   return res.json({
    //     meta: { msg: "Type is required.", status: false },
    //   });
    // }
    // let page = Number(req.query.page || 0);
    // let contentPerPage = Number(req.query.contentPerPage || 0);
    // const findQuery = {
    //   status: "ACTIVE",
    //   type: type.toUpperCase(),
    //   ...(searchKey && {
    //     $or: [
    //       { title: { $regex: `${searchKey}.*`, $options: "i" } },
    //       { description: { $regex: `${searchKey}.*`, $options: "i" } },
    //       { url: { $regex: `${searchKey}.*`, $options: "i" } },
    //     ],
    //   }),
    // };
    // const propertyList = await propertyModel
    //   .find(findQuery)
    //   .sort({ createdAt: -1 })
    //   .skip(contentPerPage * page - contentPerPage)
    //   .limit(contentPerPage);
    // if (propertyList.length) {
    //   const total = await propertyModel.countDocuments(findQuery);
    //   return res.json({
    //     meta: { msg: "property list found.", status: true },
    //     data: propertyList,
    //     ...(contentPerPage && {
    //       pages: Math.ceil(total / contentPerPage),
    //       total,
    //     }),
    //   });
    // } else {
    //   return res.json({
    //     meta: { msg: "property list not found.", status: false },
    //   });
    // }
    console.log("Hwllkjfksjf")
    const response = await propertyModel.find();
    console.log(response,'response');
       return res.json({
        meta: { msg: "property list found.", status: true },
        data:response
      });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};


const propertyDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    const detailData = await propertyModel.findOne({
      _id: new Types.ObjectId(_id),
    });
    if (detailData) {
      return res.json({
        meta: { msg: "property details found.", status: true },
        data: detailData,
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const addProperty=async(req,res)=>{
  try {
    console.log(req.body,'request body');
    const response=await propertyModel.create(req.body);
    console.log(response,'response');
    return res.json({
      meta: { msg: "property details added Successfully.", status: true },
    });
    
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
}

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        meta: { msg: "Invalid ID format.", status: false },
      });
    }

    const result = await propertyModel.deleteOne({ _id: new Types.ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        meta: { msg: "Document not found.", status: false },
      });
    }

    return res.json({
      meta: { msg: "Successfully deleted.", status: true },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      meta: { msg: "Internal server error.", status: false },
    });
  }
};

module.exports = {
  propertyList,
  propertyDetail,
  addProperty,
  deleteProperty
};
