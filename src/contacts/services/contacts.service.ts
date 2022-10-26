import { Injectable } from '@nestjs/common';
import { ContactEntity } from '../entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteOneRouteOptions, UpdateOneRouteOptions, CrudRequest } from '@nestjsx/crud';
import { ContactsGateway } from '../gateways/contacts.gateway';
import { DeepPartial } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';


@Injectable()
export class ContactsService extends TypeOrmCrudService<ContactEntity> {
  async recoverOne(req: CrudRequest): Promise<void | ContactEntity> {
    return;
  }

  constructor(
    @InjectRepository(ContactEntity) repo,
    private contactsGateway: ContactsGateway
  ) {
    super(repo);
  }

  async createOne(data: CrudRequest, params: DeepPartial<ContactEntity>): Promise<ContactEntity> {
    const contact = await super.createOne(data, params);
    this.contactsGateway.contactCreated(contact);
    return contact;
  }

  async updateOne(data: CrudRequest, params?: DeepPartial<ContactEntity>, routeOptions?: UpdateOneRouteOptions): Promise<ContactEntity> {
    const contact = await super.updateOne(data, params);
    this.contactsGateway.contactUpdated(contact);
    return contact;
  }

  async deleteOne(params: CrudRequest, routeOptions?: DeleteOneRouteOptions): Promise<void | ContactEntity> {
    console.log('delete params', params);
    await super.deleteOne(params);
    this.contactsGateway.contactDeleted(params.parsed.paramsFilter[0].value);
    return params.parsed.paramsFilter[0].value;
  }
}