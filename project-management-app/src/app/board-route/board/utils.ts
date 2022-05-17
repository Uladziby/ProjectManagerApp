import { IColumn, ITask } from './../../shared/interfaces/interfaces';
export function calculateMaxOrder(array: IColumn[]): number {
  return array.reduce(function (a, b) {
    return Math.max(a, b.order) + 1;
  }, -Infinity);
}

export function calculateMaxOrderTasks(array: ITask[]): number {
  return [...array].reduce(function (a, b) {
    return Math.max(a, b.order);
  }, -Infinity);
}