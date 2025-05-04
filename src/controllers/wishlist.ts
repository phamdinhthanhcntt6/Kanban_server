import WishListModel from "../models/WishListModel";

const addProductInWidshList = async (req: any, res: any) => {
  const body = req.body;

  try {
    const newWishList = new WishListModel(body);
    newWishList.save();

    res.status(200).json({
      message: "Add product in wishlist successfully!",
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const checkProductInWishlist = async (req: any, res: any) => {
  const { id, createdBy } = req.query;

  try {
    const wishList = await WishListModel.findOne({
      createdBy: createdBy,
      productId: id,
    });

    const exists = wishList ? true : false;

    res.status(200).json({
      data: { exists },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const removeProductInWishlist = async (req: any, res: any) => {
  const { id, createdBy } = req.query;

  try {
    await WishListModel.findOneAndDelete({
      createdBy: createdBy,
      productId: id,
    });

    res.status(200).json({
      message: "Remove product in wishlist successfully!",
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getWishListByUid = async (req: any, res: any) => {
  const { uid } = req.query;

  try {
    const wishList = await WishListModel.find({
      createdBy: uid,
    }).populate("productId");

    res.status(200).json({
      message: "Get wishlist successfully!",
      data: wishList,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export {
  addProductInWidshList,
  checkProductInWishlist,
  removeProductInWishlist,
  getWishListByUid,
};
