import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterLoad,
  AfterInsert,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from '@common/utils/entity-helper';
import { AppConfig } from '@infrastructure/config/config.type';
import appConfig from '@infrastructure/config/app.config';

@Entity({ name: 'media' })
export class FileEntity extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Media title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Media caption' })
  @Column()
  caption: string;

  @ApiProperty({ example: 'Media group' })
  @Column()
  filegroup: string;

  @ApiProperty({ example: 'Media type' })
  @Column()
  filetype: string;

  @Allow()
  @Column()
  path: string;

  @AfterLoad()
  @AfterInsert()
  updatePath() {
    if (this.path.startsWith('/')) {
      this.path = (appConfig() as AppConfig).serverHost + this.path;
    }
  }
}
