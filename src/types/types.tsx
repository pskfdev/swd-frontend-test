export type ItemCard = {
  id: number;
  src: string;
  title: string;
};

/* Store */
export interface UserData {
  key: string;
  firstname: string;
  lastname: string;
  gender: string;
  phone: string;
  nationality: string;
}

export interface UserState {
  users: UserData[];
}
