import {User} from '../../types/user.type.js';
import {defaultClasses, getModelForClass, ModelOptions, prop} from '@typegoose/typegoose';
import {createSHA256} from '../../utils/common.js';

export interface UserEntity extends defaultClasses.Base {}

@ModelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
  }

  @prop({
    minlength: 1,
    maxlength: 15,
    required: true,
  })
  public name!: string; //Мин. длина 1 символ, макс. длина 15 символов.

  @prop({
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  })
  public email!: string; //Валидный адрес электронной почты.

  @prop({
    required: true,
    default: 'no-avatar.png'
  })
  public avatar!: string; //Изображение пользователя в формате .jpg или .png.

  @prop({
    required: true,
    default: []
  })
  public watchlist!: string[];

  @prop({
    required: true,
    default: ''
  })
  private password!: string; //Мин. длина 6 символов, макс. длина 12 символов.

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
