import { Crud } from '@nestjsx/crud';
import { Controller } from '@nestjs/common';
import { ContactsService } from '../services/contacts.service';
import { ContactEntity } from '../entities/contact.entity';

@Crud({
    model: {
        type: ContactEntity
    }
})
@Controller('contacts')
export class ContactsController {

    constructor(public readonly service: ContactsService) { }
}
