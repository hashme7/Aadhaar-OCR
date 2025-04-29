"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../controller");
const userServices_1 = require("../services/userServices");
const userServiceInstance = new userServices_1.UserService();
const controller = new controller_1.UserController(userServiceInstance);
exports.default = controller;
