import { Products } from './products';

export type ProductPayload = Omit<Products, 'id'>
