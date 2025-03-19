import CartModel from "../models/CartModel";

const getProductInCart = async (req: any, res: any) => {
  const { uid } = req.query;

  try {
    const data = await CartModel.find({
      createdBy: uid,
    });

    res.status(200).json({ data: data });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const addProductInCart = async (req: any, res: any) => {
  const { id } = req.query;

  const body = req.body;

  try {
    if (id) {
      await CartModel.findByIdAndUpdate(id, body);

      res.status(200).json({
        data: [],
      });
    } else {
      const item = new CartModel(body);
      await item.save();

      res.status(200).json({
        data: item,
      });
    }
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const removeProductInCart = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    await CartModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Remove product in cart!",
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateCountProductInCart = async (req: any, res: any) => {
  const body = req.body;
  const { id } = req.query;

  try {
    console.log(id);
    console.log(body);
    await CartModel.findByIdAndUpdate(id, body);

    res.status(200).json({
      message: "Update count product in cart successfully!",
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export {
  addProductInCart,
  getProductInCart,
  removeProductInCart,
  updateCountProductInCart,
};
