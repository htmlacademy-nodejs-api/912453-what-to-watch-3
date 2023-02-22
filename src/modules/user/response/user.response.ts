import {Expose} from 'class-transformer';

export class UserResponse {
  @Expose()
  public name!: string;

  @Expose()
  public email!: string ;

  @Expose()
  public avatar!: string;
}
