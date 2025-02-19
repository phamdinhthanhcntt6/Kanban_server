import SubProductModel from "../models/SubProductModel";

interface SelectModel {
  label: string;
  value: string;
}

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

const filterProduct = async (req: any, res: any) => {
  try {
    const datas = await SubProductModel.find();

    const colors: string[] = [];
    const sizes: SelectModel[] = [];
    const prices: number[] = [];

    if (datas.length > 0) {
      datas.forEach((item) => {
        item.color && !colors.includes(item.color) && colors.push(item.color);
        item.size && sizes.push({ label: item.size, value: item.size });
        prices.push(item.price);
      });
    }

    res.status(200).json({
      message: "fafa",
      data: {
        colors,
        prices,
        sizes,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const removeSubProduct = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    await SubProductModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Remove sub product successfully!",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateSubProduct = async (req: any, res: any) => {
  const body = req.body;
  const { id } = req.query;

  try {
    await SubProductModel.findByIdAndUpdate(id, body);

    res.status(200).json({
      message: "Update sub product successfully!",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export { createSubProduct, filterProduct, removeSubProduct, updateSubProduct };
