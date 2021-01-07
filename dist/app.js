"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
var path_1 = __importDefault(require("path"));
var error_1 = __importDefault(require("./middlewares/error"));
var user_1 = __importDefault(require("./route/user"));
var category_1 = __importDefault(require("./route/category"));
var product_1 = __importDefault(require("./route/product"));
var order_1 = __importDefault(require("./route/order"));
dotenv_1.default.config();
var app = express_1.default();
var port = process.env.PORT || 4000;
var db = process.env.DB || "";
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname + ".." + "images")));
var Storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, "images");
    },
    filename: function (_req, file, cb) {
        cb(null, uuid_1.v4() + "_" + file.originalname);
    },
});
var fileFilter = function (_req, file, cb) {
    if (file.mimetype === "image/jpg" || "image/png" || "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use(multer_1.default({ storage: Storage, fileFilter: fileFilter }).single("image"));
mongoose_1.default
    .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then(function () {
    app.listen(port, function () {
        console.log("Server is running at port " + port);
    });
    // route
    //json middle
    app.use(express_1.default.json());
    //user_route
    app.use("/api/v1/user", user_1.default);
    //category route
    app.use("/api/v1/category", category_1.default);
    //product route
    app.use("/api/v1/product", product_1.default);
    //order route
    app.use("/api/v1/order", order_1.default);
    //error middleware
    app.use(error_1.default);
    // route
})
    .catch(function (err) {
    console.log(err.message);
});
//# sourceMappingURL=app.js.map