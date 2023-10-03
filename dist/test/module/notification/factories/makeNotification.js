import { fakerPT_BR } from '@faker-js/faker';
import { Notification, } from '@module/notifications/entities/Notification';
import { UniqueId } from '@shared/core/entities/UniqueId';
export function makeNotification(override = {}, id) {
    const notification = Notification.create({
        content: fakerPT_BR.lorem.paragraphs(2),
        title: fakerPT_BR.lorem.words(8),
        recipientId: new UniqueId(fakerPT_BR.string.uuid()),
        ...override,
    }, id);
    return notification;
}
//# sourceMappingURL=makeNotification.js.map