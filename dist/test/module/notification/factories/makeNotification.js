"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNotification = void 0;
const faker_1 = require("@faker-js/faker");
const Notification_1 = require("@module/notifications/entities/Notification");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
function makeNotification(override = {}, id) {
    const notification = Notification_1.Notification.create({
        content: faker_1.fakerPT_BR.lorem.paragraphs(2),
        title: faker_1.fakerPT_BR.lorem.words(8),
        recipientId: new UniqueId_1.UniqueId(faker_1.fakerPT_BR.string.uuid()),
        ...override,
    }, id);
    return notification;
}
exports.makeNotification = makeNotification;
//# sourceMappingURL=makeNotification.js.map