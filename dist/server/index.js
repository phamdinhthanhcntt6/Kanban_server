"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const verifyToken_1 = require("./../client/src/middleware/verifyToken");
const category_1 = __importDefault(require("./src/routers/category"));
const order_1 = __importDefault(require("./src/routers/order"));
const product_1 = __importDefault(require("./src/routers/product"));
const storage_1 = __importDefault(require("./src/routers/storage"));
const supplier_1 = __importDefault(require("./src/routers/supplier"));
const user_1 = __importDefault(require("./src/routers/user"));
const subProduct_1 = __importDefault(require("./src/routers/subProduct"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@thanh236.zg7id.mongodb.net/?retryWrites=true&w=majority&appName=Thanh236`;
app.use(express_1.default.json());
app.use((0, cors_1.default)({}));
app.use("/auth", user_1.default);
app.use(verifyToken_1.verifyToken);
app.use("/storage", storage_1.default);
app.use("/supplier", supplier_1.default);
app.use("/order", order_1.default);
app.use("/product", product_1.default);
app.use("/category", category_1.default);
app.use("/sub-product", subProduct_1.default);
const connectDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield mongoose_1.default.connect(dbURL);
      console.log("Connect to DB successfully");
    } catch (error) {
      console.log(`Cannot connect to DB ${error}`);
    }
  });
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is starting at https://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
//# sourceMappingURL=index.js.map
