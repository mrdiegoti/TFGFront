export interface User {
    name?: string;
    email: string;
    password: string;
    password_confirmation?: string;
  }
  
  export interface JwtResponse {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      // Puedes añadir más campos si lo deseas
    };
  }
  