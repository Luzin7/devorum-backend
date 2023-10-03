import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueId } from '@shared/core/entities/UniqueId';
import { Optional } from '@shared/core/types/optional';
export interface NotificationProps {
    title: string;
    content: string;
    recipientId: UniqueId;
    createdAt: Date;
    readAt: Date | null;
}
export declare class Notification extends AggregateRoot<NotificationProps> {
    static create(props: Optional<NotificationProps, 'createdAt' | 'readAt'>, id?: UniqueId): Notification;
    get title(): string;
    get content(): string;
    get recipientId(): UniqueId;
    get createdAt(): Date;
    get readAt(): Date | null;
    read(): void;
}
