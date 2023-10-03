import { Topic, TopicProps } from '@module/topics/entities/Topic';
import { UniqueId } from '@shared/core/entities/UniqueId';
export declare function makeTopic(override?: Partial<TopicProps>, id?: UniqueId): Topic;
