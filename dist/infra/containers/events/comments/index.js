"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const onCommentCreated_1 = require("@module/notifications/subscribers/onCommentCreated");
tsyringe_1.container.resolve(onCommentCreated_1.OnCommentCreated);
//# sourceMappingURL=index.js.map