import OrderModel from "../models/OrderModel";

const getOrders = async (req: any, res: any) => {
  const { pageSize, page } = req.query;

  try {
    const skip = (page - 1) * pageSize;
    const items = await OrderModel.find().skip(skip).limit(pageSize);

    const total = await OrderModel.countDocuments();

    res.status(200).json({
      message: "order",
      data: { total, items },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const createOrder = async (req: any, res: any) => {
  const body = req.body;
  try {
    const newOrder = new OrderModel(body);
    newOrder.save();

    res.status(200).json({
      message: "Add new order successfully!",
      data: newOrder,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateOrder = async (req: any, res: any) => {
  const body = req.body;
  const { id } = req.query;
  try {
    await OrderModel.findByIdAndUpdate(id, body);

    res.status(200).json({
      message: "Update order successfully!",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const removeOrder = async (req: any, res: any) => {
  const { id } = req.query;
  try {
    await OrderModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Remove order successfully!",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getOrderDetail = async (req: any, res: any) => {
  const { id } = req.query;

  const detail = await OrderModel.findById(id);

  try {
    res.status(200).json({
      data: detail,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getOrderByUid = async (req: any, res: any) => {
  const { createdBy, search, status } = req.query;

  try {
    const query: any = {};

    if (createdBy) {
      query.createdBy = createdBy;
    }

    if (search) {
      const regex = { $regex: search, $options: "i" };

      query.$or = [{ name: regex }, { "products.title": regex }];
    }

    if (status) {
      query.status = status;
    } else {
      query.status = { $in: ["pending", "complete"] };
    }

    const orders = await OrderModel.find(query);

    res.status(200).json({
      message: "Get orders successfully!",
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  createOrder,
  getOrders,
  removeOrder,
  updateOrder,
  getOrderDetail,
  getOrderByUid,
};
