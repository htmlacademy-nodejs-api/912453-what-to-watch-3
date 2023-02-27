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
    required: true,
  })
  public name!: string; //Мин. длина 1 символ, макс. длина 15 символов.

  @prop({
    unique: true,
    required: true,
  })
  public email!: string; //Валидный адрес электронной почты.

  @prop({
    default: 'no-avatar.png' // Пользователю без аватара назначается изображение по умолчанию
  })
  public avatar?: string; //Изображение пользователя в формате .jpg или .png.

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

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
