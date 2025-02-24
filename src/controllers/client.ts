import bcrypt from "bcrypt";
import dotenv from "dotenv";
import ClientModel from "../models/ClientModel";
import { generatorRandomText } from "../utils/generatorRandomText";
import { getAccesstoken } from "./../utils/getAccessToken";

dotenv.config();

const register = async (req: any, res: any) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const client = await ClientModel.findOne({ email });

    if (client) {
      throw new Error(`Account is existed`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    body.password = hashpassword;

    const newClient: any = new ClientModel(body);
    await newClient.save();

    delete newClient._doc.password;

    res.status(200).json({
      message: "Register",
      data: {
        ...newClient._doc,
        token: await getAccesstoken({
          _id: newClient._id,
          email: newClient.email,
          rule: 0,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const login = async (req: any, res: any) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const client: any = await ClientModel.findOne({ email });

    if (!client) {
      throw new Error(`Account does not exist`);
    }

    const isMatchPassword = await bcrypt.compare(password, client.password);

    if (!isMatchPassword) {
      throw new Error("Wrong account or password");
    }

    delete client._doc.password;

    res.status(200).json({
      message: "Login successfully",
      data: {
        ...client._doc,
        token: await getAccesstoken({
          _id: client._id,
          email: client.email,
          rule: client.rule ?? 0,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const loginWithGoogle = async (req: any, res: any) => {
  const body = req.body;
  const { email, name } = body;
  try {
    const user: any = await ClientModel.findOne({ email });

    if (user) {
      await ClientModel.findByIdAndUpdate(user._id, body);

      const newUser: any = await ClientModel.findById(user._id);

      delete newUser._doc.password;

      res.status(200).json({
        message: "Login successfully!",
        data: {
          ...newUser._doc,
          token: await getAccesstoken({
            _id: newUser._id,
            email: newUser.email,
            rule: newUser.rule ?? 1,
          }),
        },
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(generatorRandomText(6), salt);

      body.password = hashpassword;

      const newUser: any = new ClientModel(body);
      await newUser.save();

      delete newUser._doc.password;

      res.status(200).json({
        message: "Register successfully!",
        data: {
          ...newUser._doc,
          token: await getAccesstoken({
            _id: newUser._id,
            email: newUser.email,
            rule: 1,
          }),
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const refreshToken = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    const user = await ClientModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const token = await getAccesstoken({
      _id: id,
      email: user.email,
      rule: user.rule,
    });

    res.status(200).json({
      message: "refresh token",
      data: token,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export { login, loginWithGoogle, refreshToken, register };
