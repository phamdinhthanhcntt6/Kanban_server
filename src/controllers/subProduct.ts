import SubProductModel from "../models/SubProductModel";

const createSubProduct = async (req: any, res: any) => {
  const body = req.body;

  try {
    const newSubProduct = new SubProductModel(body);
    await newSubProduct.save();

    res.status(200).json({
      message: "Create sub product successfully!",
      data: newSubProduct,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export { createSubProduct };
