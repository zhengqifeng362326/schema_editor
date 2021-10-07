import { Engine } from '@designable/core';
import { transformToSchema } from '@designable/formily-transformer';
import { Message } from '@alifd/next';

export const saveSchema = (designer: Engine) => {
  localStorage.setItem('formily-schema', JSON.stringify(transformToSchema(designer.getCurrentTree())));
  Message.success('Save Success');
};
