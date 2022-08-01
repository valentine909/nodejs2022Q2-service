import { ValueTransformer } from 'typeorm';

export class BigintTransformer implements ValueTransformer {
  from(value: string): number {
    return parseInt(value, 10);
  }

  to(value: number): number {
    return value;
  }
}
