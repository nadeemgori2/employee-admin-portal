export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  attendance?: number;
  performance?: number[];
  leave?: number[];
  address?: string;
  phone?: string;
  photo?: string;
}
