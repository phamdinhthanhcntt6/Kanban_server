import AddressModel from "../models/AddressModel";

const createAddress = async (req: any, res: any) => {
  const body = req.body;

  try {
    const newAddress = new AddressModel(body);
    newAddress.save();

    res.status(200).json({
      message: "Create a new address successfully!",
      data: newAddress,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getAddressesByUid = async (req: any, res: any) => {
  const { uid } = req.query;

  try {
    const addresses = await AddressModel.find({
      createdBy: uid,
    });

    res.status(200).json({
      message: "Get addresses successfully!",
      data: addresses,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const setDefaultAddress = async (req: any, res: any) => {
  const { id, uid } = req.query;

  const { isDefault } = req.body;

  try {
    if (isDefault) {
      await AddressModel.updateMany({ createdBy: uid }, { isDefault: false });

      await AddressModel.findByIdAndUpdate(id, { isDefault: true });
    } else {
      await AddressModel.findByIdAndUpdate(id, { isDefault: false });
    }

    res.status(200).json({
      message: "Set default address successfully!",
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const removeAddress = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    await AddressModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Remove address successfully!",
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateAddress = async (req: any, res: any) => {
  const { id } = req.query;

  const body = req.body;

  try {
    await AddressModel.findByIdAndUpdate(id, body);

    res.status(200).json({
      message: "Update address successfully!",
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getDefaultAddressDetail = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    const address = await AddressModel.findById(id);

    res.status(200).json({
      data: address,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export {
  createAddress,
  getAddressesByUid,
  setDefaultAddress,
  removeAddress,
  updateAddress,
  getDefaultAddressDetail,
};
