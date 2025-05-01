import OrderModel from "../models/OrderModel";

const getOrder = async (req: any, res: any) => {
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

const getExportOrder = async (req: any, res: any) => {
  const body = req.body;
  const { start, end } = req.query;

  const filter: any = {};

  if (start && end) {
    filter.createAt = {
      $lte: end,
      $gte: start,
    };
  }

  try {
    const items = await OrderModel.find(filter);
    const data: any = [];

    if (items.length > 0) {
      items.forEach((item: any) => {
        const values: any = {};

        body.forEach((key: string) => {
          values[`${key}`] = `${item._doc[`${key}`] ?? ""}`;
        });
        data.push(values);
      });
    }

    res.status(200).json({
      message: "Order",
      data: data,
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

export {
  createOrder,
  getExportOrder,
  getOrder,
  removeOrder,
  updateOrder,
  getOrderDetail,
};
