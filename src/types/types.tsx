export type ItemCard = {
  id: number;
  src: string;
  title: string;
};

/* Store */
export interface UserData {
  key: string; // ใช้สำหรับ AntD Table
  title: 'mr' | 'mrs' | 'miss';
  firstname: string;
  lastname: string;
  birthday: string; 
  nationality: string;
  citizenId: [string, string, string, string, string]; // บัตรประชาชน 13 หลัก แบ่ง 5 ช่อง
  gender: 'male' | 'female' | 'unisex';
  mobileCode: string;
  mobileNumber: string;
  passport: string;
  salary: string;
  phone: string; // สำหรับรวม code+number เช่น "+660123456789"
  editing?: boolean; // สำหรับ track user ที่กำลัง edit (optional)
}

export interface UserState {
  users: UserData[];
}
