import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import AuthUser from '../../domain/auth-user';
import { FullNameProps } from '../../domain/value-objects/fullname';

interface FlattenedAuthUser extends Omit<AuthUser, 'fullName'>, FullNameProps {}

@Entity({ name: 'user', schema: 'auth' })
@Unique(['email'])
class AuthUserEntity implements FlattenedAuthUser {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 100 })
  public email!: string;

  @Column({ name: 'email_verified', type: 'boolean', default: false })
  public emailVerified!: boolean;

  @Column({ name: 'first_name', type: 'varchar', length: 70 })
  public firstName!: string;

  @Column({ name: 'surname', type: 'varchar', length: 70 })
  public surname!: string;

  @Column({ type: 'date' })
  public birthday!: Date;

  @Column()
  public hash!: string;

  @Column({ name: 'profile_picture', nullable: true })
  public profilePicture!: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt!: Date;
}

export default AuthUserEntity;
