export interface Table {
  id: number;
  name: string;
  gender: 'male' | 'female';
  department: 'Backend' | 'Hr' | 'Frontend';
  address: addressType;
}


export type addressType = {
  city: string;
  street: string;
};
