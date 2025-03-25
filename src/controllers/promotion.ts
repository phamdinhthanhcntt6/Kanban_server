import PromotionModel from "../models/PromotionModel";

const getPromotions = async (req: any, res: any) => {
  const { page, pageSize } = req.query;

  try {
    const skip = (page - 1) * pageSize;
    const promotions = await PromotionModel.find().skip(skip).limit(pageSize);

    res.status(200).json({
      massage: "Promotions",
      data: promotions,
    });
  } catch (error: any) {
    res.status(404).json({
      message: res.message,
    });
  }
};

const createPromotion = async (req: any, res: any) => {
  const body = req.body;

  try {
    const newPromotion = new PromotionModel(body);
    newPromotion.save();

    res.status(200).json({
      message: "Create new promotion successfully!",
      data: newPromotion,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const removePromotion = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    await PromotionModel.findByIdAndDelete(id);

    res.status(200).json({
      massage: "Remove promotion!",
    });
  } catch (error: any) {
    res.status(404).json({
      message: res.message,
    });
  }
};

const updatePromotion = async (req: any, res: any) => {
  const { id } = req.query;

  const body = req.body;

  try {
    await PromotionModel.findByIdAndUpdate(id, body);

    res.status(200).json({
      massage: "Update promotion!",
    });
  } catch (error: any) {
    res.status(404).json({
      message: res.message,
    });
  }
};

const checkPromotion = async (req: any, res: any) => {
  try {
    const { code } = req.query;
    const promotion = await PromotionModel.findOne({ code });

    if (!promotion) {
      throw new Error("Code is invalid!");
    } else {
      res.status(200).json({
        data: promotion,
      });
    }
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export {
  createPromotion,
  getPromotions,
  removePromotion,
  updatePromotion,
  checkPromotion,
};
