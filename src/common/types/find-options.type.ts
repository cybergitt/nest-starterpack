import { EntityCondition } from './entity-condition.type';

export type FIndOptions<T> = {
  where: EntityCondition<T>[] | EntityCondition<T>;
};
