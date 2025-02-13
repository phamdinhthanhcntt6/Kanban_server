import { supplierForm } from "../form/supplier";
import SupplierModel from "../models/SupplierModel";

const getSuppliers = async (req: any, res: any) => {
  const { pageSize, page } = req.query;

  try {
    const skip = (page - 1) * pageSize;
    const items = await SupplierModel.find().skip(skip).limit(pageSize);

    const total = await SupplierModel.countDocuments();

    res.status(200).json({
      message: "Suppliers",
      data: { total, items },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const createSupplier = async (req: any, res: any) => {
  const body = req.body;

  try {
    const newSupplier = new SupplierModel(body);
    newSupplier.save();

    res.status(200).json({
      message: "Add new supplier successfully!",
      data: newSupplier,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateSupplier = async (req: any, res: any) => {
  const body = req.body;
  const { id } = req.query;

  try {
    await SupplierModel.findByIdAndUpdate(id, body);

    res.status(200).json({
      message: "Update supplier successfully!",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const removeSupplier = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    await SupplierModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Remove supplier successfully!",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getForm = async (req: any, res: any) => {
  try {
    const form = {
      title: "Supplier",
      layout: "horizontal",
      labelCol: 6,
      wrapperCol: 18,
      formItem: supplierForm,
    };

    res.status(200).json({
      message: "",
      data: form,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getExportSupplier = async (req: any, res: any) => {
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
    const items = await SupplierModel.find(filter);
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
      message: "Suppliers",
      data: data,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getSupplierDetail = async (req: any, res: any) => {
  const { id } = req.query;

  const detail = await SupplierModel.findById(id);

  try {
    res.status(200).json({
      message: "",
      data: detail,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export {
  getSuppliers,
  createSupplier,
  updateSupplier,
  removeSupplier,
  getForm,
  getExportSupplier,
  getSupplierDetail,
};
