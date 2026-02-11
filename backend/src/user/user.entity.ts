import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true, length: 64 })
  di: string;
  
  @Column({ unique: true, length: 88 })
  ci: string;

  @Column()
  name: string;

  @Column({ length: 8 })
  birthday: string;

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE'] })
  gender: string;

  @Column({ type: 'enum', enum: ['LOCAL', 'FOREIGNER'] })
  nationality: string;

  @OneToMany(() => UserAccount, (account) => account.user)
  accounts: UserAccount[];
}

@Entity('UserAccount')
export class UserAccount{
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  bankCode: string;

  @Column()
  accountNumber: string;

  @Column({ type: 'bigint' })
  userId: number;

  @ManyToOne(() => User, {createForeignKeyConstraints: false})
  user: User;

  @CreateDateColumn()
  createAt: Date;
}