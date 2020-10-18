import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Image from './Image';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  about: string;

  @Column()
  whatsapp: string;

  @Column()
  instructions: string;

  @Column()
  openning_hours: string;

  @Column()
  open_on_weekends: boolean;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[];
}
