import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type AlterarClienteBodyParam = FromSchema<typeof schemas.AlterarCliente.body>;
export type AlterarClienteMetadataParam = FromSchema<typeof schemas.AlterarCliente.metadata>;
export type AlterarClienteResponse200 = FromSchema<typeof schemas.AlterarCliente.response['200']>;
export type AlterarClienteResponse400 = FromSchema<typeof schemas.AlterarCliente.response['400']>;
export type BuscarClienteMetadataParam = FromSchema<typeof schemas.BuscarCliente.metadata>;
export type BuscarClienteResponse200 = FromSchema<typeof schemas.BuscarCliente.response['200']>;
export type BuscarClienteResponse400 = FromSchema<typeof schemas.BuscarCliente.response['400']>;
export type CriarClienteBodyParam = FromSchema<typeof schemas.CriarCliente.body>;
export type CriarClienteResponse200 = FromSchema<typeof schemas.CriarCliente.response['200']>;
export type CriarClienteResponse400 = FromSchema<typeof schemas.CriarCliente.response['400']>;
export type ListarClienteMetadataParam = FromSchema<typeof schemas.ListarCliente.metadata>;
export type ListarClienteResponse200 = FromSchema<typeof schemas.ListarCliente.response['200']>;
export type ListarClienteResponse400 = FromSchema<typeof schemas.ListarCliente.response['400']>;
export type RemoverClienteMetadataParam = FromSchema<typeof schemas.RemoverCliente.metadata>;
export type RemoverClienteResponse200 = FromSchema<typeof schemas.RemoverCliente.response['200']>;
export type RemoverClienteResponse400 = FromSchema<typeof schemas.RemoverCliente.response['400']>;
