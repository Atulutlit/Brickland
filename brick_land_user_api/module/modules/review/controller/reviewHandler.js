const { Types, connection } = require("mongoose");
const { orderModel } = require("../../order/model/orderModel");
const { productModel } = require("../../product/model/productModel");
const { reviewModel } = require("../model/reviewModel");

const addReview = async function (req, res) {
    try {
        const { userData } = req;
        const {
            orderId,
            productId,
            shopId,
            rating,
            review,
            type
        } = req.body;
        if (!rating ||
            !review ||
            !type ||
            !orderId
        ) {
            return res.json({
                meta: { msg: "Parameters missing.", status: false },
            });
        }
        if (Number(rating) >= 5 && Number(rating) <= 1) {
            return res.json({
                meta: { msg: 'Rating should lie between 1 to 5', status: false }
            });
        }
        let findProduct;
        if (productId) {
            findProduct = await productModel.findOne({ productId: Types.ObjectId(productId) })
            if (!findProduct) {
                return res.json({
                    meta: { msg: "Product not found.", status: false },
                });
            }
        }
        let findShop;
        if (shopId) {
            findShop = await productModel.findOne({ shopId: Types.ObjectId(shopId) })
            if (!findShop) {
                return res.json({
                    meta: { msg: "Shop not found.", status: false },
                });
            }
        }
        const typeEnum = ["SHOP", "PRODUCT"];
        const checkType = typeEnum.includes(type.toUpperCase());
        if (!checkType) {
            return res.json({
                meta: { msg: "Invalid type.", status: false },
            });
        } else {
            if (type.toUpperCase() === 'SHOP' && !shopId) {
                return res.json({
                    meta: { msg: "Shop id is missing.", status: false },
                });
            } else if (type.toUpperCase() === 'SHOP') {
                const findReview = await reviewModel.findOne({
                    shopId: Types.ObjectId(shopId),
                    userId: userData.userId
                })
                if (findReview) {
                    const updateReview = await reviewModel.findOneAndUpdate({
                        reviewId: findReview.reviewId,
                        userId: userData.userId,
                        shopId: Types.ObjectId(shopId)
                    }, {
                        $set: {
                            rating: Number(rating),
                            review,
                            status: 'PENDING'
                        }
                    });
                    const updateOrder = await orderModel.findOneAndUpdate({
                        orderId: Types.ObjectId(orderId),
                        'shopData.shopId': Types.ObjectId(shopId)
                    }, {
                        $set: {
                            'shopData.isRate': true,
                            'shopData.rating': rating,
                            'shopData.review': review
                        },
                    }, { upsert: true, new: true })


                } else {
                    const addObj = {
                        userId: userData.userId,
                        userData,
                        rating: Number(rating),
                        review,
                        type: 'SHOP',
                        ...(shopId && {
                            shopId,
                            shopData: findShop
                        })
                    };
                    await reviewModel.create(addObj);
                    const updateOrder = await orderModel.findOneAndUpdate({
                        orderId: Types.ObjectId(orderId),
                        'shopData.shopId': Types.ObjectId(shopId)
                    }, {
                        $set: {
                            'shopData.isRate': true,
                            'shopData.rating': rating,
                            'shopData.review': review
                        },
                    })
                }
            }
            if (type.toUpperCase() === 'PRODUCT' && !productId) {
                return res.json({
                    meta: { msg: "Product id is missing.", status: false },
                });
            } else if (type.toUpperCase() === 'PRODUCT') {
                const findReview = await reviewModel.findOne({
                    product: Types.ObjectId(product),
                    userId: userData.userId
                })
                if (findReview) {
                    const updateReview = await reviewModel.findOneAndUpdate({
                        reviewId: findReview.reviewId,
                        userId: userData.userId,
                        productId: Types.ObjectId(productId)
                    }, {
                        $set: {
                            rating: Number(rating),
                            review,
                            status: 'PENDING'
                        }
                    });
                    await orderModel.findOneAndUpdate({
                        orderId: Types.ObjectId(orderId),
                        "shopData.shopId": Types.ObjectId(shopId)
                    }, {
                        $set: {
                            'shopData.isRate': true,
                            'shopData.rating': rating,
                            'shopData.review': review
                        }
                    }, { upsert: true, new: true })
                } else {
                    const addObj = {
                        userId: userData.userId,
                        userData,
                        rating: Number(rating),
                        review,
                        type: type.toUpperCase(),
                        ...(productId && {
                            productId,
                            productData: findProduct
                        })
                    };
                    await reviewModel.create(addObj);
                }
            }
        }
        return res.json({
            meta: { msg: "Review submitted Successfully.", status: true }
        });
    } catch (error) {
        return res.json({
            meta: { msg: error.message, status: false }
        });
    }
};

const addReviewProductMultiple = async function (req, res) {
    try {
        const { userData } = req;
        const { orderId, reviewData, isUpdate } = req.body;
        let promise = []
        if (!orderId || !reviewData) {
            return res.json({
                meta: { msg: "Parameters missing.", status: false },
            });
        }
        for (const reviewItem of reviewData) {
            const {
                productId,
                rating,
                review,
                type
            } = reviewItem
            const typeEnum = ["PRODUCT"];
            const checkType = typeEnum.includes(type.toUpperCase());
            if (!checkType) {
                return res.json({
                    meta: { msg: "Invalid type.", status: false },
                });
            } else {
                if (type.toUpperCase() === 'PRODUCT' && !productId) {
                    return res.json({
                        meta: { msg: "Product id is missing.", status: false },
                    });
                }
            }
            let findProduct;
            if (productId) {
                findProduct = await productModel.findOne({ productId: Types.ObjectId(productId) })
                if (!findProduct) {
                    return res.json({
                        meta: { msg: "Product not found.", status: false },
                    });
                }
            }
            if (Number(rating) <= 5 && Number(rating) >= 1) {
                if (isUpdate) {
                    const findReview = await reviewModel.findOne({
                        userId: userData.userId,
                        productId: Types.ObjectId(productId)
                    });
                    if (findReview) {
                        const u1 = reviewModel.findOneAndUpdate({
                            reviewId: findReview.reviewId,
                            userId: userData.userId,
                            productId: Types.ObjectId(productId)
                        }, {
                            $set: {
                                rating: Number(rating),
                                review,
                                status: 'PENDING'
                            }
                        })
                        promise.push(u1);
                    } else {
                        const addObj = {
                            userId: userData.userId,
                            userData,
                            rating: Number(rating),
                            review,
                            type: type.toUpperCase(),
                            ...(productId && {
                                productId,
                                productData: findProduct
                            })
                        };
                        const p1 = reviewModel.create(addObj);
                        promise.push(p1);
                    }

                } else {
                    const addObj = {
                        userId: userData.userId,
                        userData,
                        rating: Number(rating),
                        review,
                        type: type.toUpperCase(),
                        ...(productId && {
                            productId,
                            productData: findProduct
                        })
                    };
                    const p1 = reviewModel.create(addObj);
                    promise.push(p1);
                }
                const p2 = orderModel.findOneAndUpdate({
                    orderId: Types.ObjectId(orderId),
                    'productDetails.productId': Types.ObjectId(productId)
                }, {
                    $set: {
                        'productDetails.$.isRate': true,
                        'productDetails.$.rating': rating,
                        'productDetails.$.review': review
                    },
                })
                promise.push(p2);
            } else {
                return res.json({
                    meta: { msg: 'Rating should lie between 1 to 5', status: false }
                });
            }
        }
        const promiseResolve = await Promise.all(promise)
        if (promiseResolve) {
            return res.json({
                meta: { msg: `Review ${isUpdate ? 'updated' : 'submitted'} successfully.`, status: true }
            });
        }
    } catch (error) {
        return res.json({
            meta: { msg: error.message, status: false }
        });
    }
};

const reviewList = async (req, res) => {
    try {
        const { userId } = req.decoded;
        const { shopId, productId, type, searchKey, rating, status } = req.query;
        let contentPerPage = Number(req.query.contentPerPage || 0);
        let page = Number(req.query.page || 0);
        const findQuery = {
            ...(shopId && { shopId: Types.ObjectId(shopId) }),
            // ...(userId && { userId: Types.ObjectId(userId) }),
            ...(productId && { productId: Types.ObjectId(productId) }),
            ...(type && { type: type.toUpperCase() }),
            ...(status && { status: status.toUpperCase() }),
            ...(!status && { status: 'APPROVED' }),
            ...(rating && { rating: Number(rating) }),
            ...(searchKey && {
                $or: [
                    { 'review': { '$regex': `${searchKey}.*`, $options: "i" } },
                ]
            }),
        }
        const reviewList = await reviewModel
            .find(findQuery)
            .sort({ createdAt: -1 })
            .limit(contentPerPage)
            .skip(contentPerPage * page - contentPerPage);
        if (reviewList.length) {
            const total = await reviewModel.countDocuments(findQuery);
            return res.json({
                meta: { msg: "Review list found.", status: true },
                data: reviewList,
                ...(contentPerPage && {
                    pages: Math.ceil(total / contentPerPage || 1),
                    total
                }),
            });
        } else {
            return res.json({
                meta: { msg: "Review list not found.", status: false },
            });
        }
    } catch (error) {
        return res.json({
            meta: { msg: error.message, status: false }
        });
    }
}

const reviewDetails = async (req, res) => {
    try {
        const { userId } = req.userId;
        const { reviewId, productId, shopId } = req.query;
        const reviewDetails = await reviewModel.findOne({
            // status: "APPROVED"
            // userId: Types.ObjectId(userId),
            ...(reviewId && { reviewId: Types.ObjectId(reviewId) }),
            ...(productId && { productId: Types.ObjectId(productId) }),
            ...(shopId && { shopId: Types.ObjectId(shopId) }),
        });
        if (reviewDetails) {
            return res.json({
                meta: { msg: "Review Details found.", status: true },
                data: reviewDetails
            });
        } else {
            return res.json({
                meta: { msg: "Something went wrong.", status: false },
            });
        }
    } catch (error) {
        return res.json({
            meta: { msg: error.message, status: false }
        });
    }
}

const updateReview = async (req, res) => {
    try {
        const {
            reviewId,
            rating,
            review
        } = req.body;
        if (!reviewId || !rating || !review) {
            return res.json({
                meta: { msg: "Parameter missing", status: false },
            });
        }
        if (Number(rating) <= 5 && Number(rating) >= 1) {
            const findQuery = {
                reviewId: Types.ObjectId(reviewId)
            };
            const updateQuery = {
                rating: Number(rating),
                review,
                status: 'PENDING'
            };
            const updateData = await reviewModel.findOneAndUpdate(findQuery, { $set: updateQuery });
            if (updateData) {
                return res.json({
                    meta: { msg: "Rating updated Successfully.", status: true },
                });
            } else {
                return res.json({
                    meta: { msg: "Something went wrong.", status: false },
                });
            }
        } else {
            return res.json({
                meta: { msg: 'Rating should lie between 1 to 5', status: false }
            });
        }
    } catch (error) {
        return res.json({
            meta: { msg: error.message, status: false },
        });
    }
};

module.exports = {
    addReview,
    reviewList,
    reviewDetails,
    updateReview,
    addReviewProductMultiple
};