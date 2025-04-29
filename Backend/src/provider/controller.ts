import { UserController } from "../controller";

import { UserService } from "../services/userServices";

const userServiceInstance = new UserService();
const controller = new UserController(userServiceInstance);

export default controller;
