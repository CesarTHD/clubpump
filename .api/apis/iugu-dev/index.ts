import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'iugu-dev/unknown (api/6.1.1)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Remove permanentemente um cliente. Porém, não permite remover clientes com assinaturas
   * ou faturas vinculadas.
   *
   * @summary Remover Cliente
   * @throws FetchError<400, types.RemoverClienteResponse400> 400
   */
  removerCliente(metadata: types.RemoverClienteMetadataParam): Promise<FetchResponse<200, types.RemoverClienteResponse200>> {
    return this.core.fetch('/customers/{id}', 'delete', metadata);
  }

  /**
   * Retorna os dados de um cliente
   *
   * @summary Buscar Cliente
   * @throws FetchError<400, types.BuscarClienteResponse400> 400
   */
  buscarCliente(metadata: types.BuscarClienteMetadataParam): Promise<FetchResponse<200, types.BuscarClienteResponse200>> {
    return this.core.fetch('/customers/{id}', 'get', metadata);
  }

  /**
   * Alterar os dados de um Cliente. Quaisquer parâmetros não informados não serão alterados.
   *
   * @summary Editar Cliente
   * @throws FetchError<400, types.AlterarClienteResponse400> 400
   */
  alterarCliente(body: types.AlterarClienteBodyParam, metadata: types.AlterarClienteMetadataParam): Promise<FetchResponse<200, types.AlterarClienteResponse200>>;
  alterarCliente(metadata: types.AlterarClienteMetadataParam): Promise<FetchResponse<200, types.AlterarClienteResponse200>>;
  alterarCliente(body?: types.AlterarClienteBodyParam | types.AlterarClienteMetadataParam, metadata?: types.AlterarClienteMetadataParam): Promise<FetchResponse<200, types.AlterarClienteResponse200>> {
    return this.core.fetch('/customers/{id}', 'put', body, metadata);
  }

  /**
   * Retorna uma lista com todos os clientes cadastrados em sua conta ordenados pela data de
   * Criação, sendo o primeiro o que foi criado mais recentemente. O campo totalItems contém
   * a quantidade de clientes encontrados no sistema de acordo com os parametros `query`. O
   * resultado da pesquisa fica dentro de `items`.
   *
   * @summary Listar Clientes
   * @throws FetchError<400, types.ListarClienteResponse400> 400
   */
  listarCliente(metadata?: types.ListarClienteMetadataParam): Promise<FetchResponse<200, types.ListarClienteResponse200>> {
    return this.core.fetch('/customers', 'get', metadata);
  }

  /**
   * Essa chamada cria um objeto cliente.
   * A propriedade zip_code realiza uma pré-consulta e valida se existe um endereço valido
   * para o cliente, porém caso não seja retornado os dados do endereço completo do cliente,
   * será apresentado um erro ao tentar criar o cliente informando que falta alguma
   * informação, pois não conseguimos obter nessa pré consulta.
   *
   * @summary Criar Cliente
   * @throws FetchError<400, types.CriarClienteResponse400> 400
   */
  criarCliente(body: types.CriarClienteBodyParam): Promise<FetchResponse<200, types.CriarClienteResponse200>> {
    return this.core.fetch('/customers', 'post', body);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AlterarClienteBodyParam, AlterarClienteMetadataParam, AlterarClienteResponse200, AlterarClienteResponse400, BuscarClienteMetadataParam, BuscarClienteResponse200, BuscarClienteResponse400, CriarClienteBodyParam, CriarClienteResponse200, CriarClienteResponse400, ListarClienteMetadataParam, ListarClienteResponse200, ListarClienteResponse400, RemoverClienteMetadataParam, RemoverClienteResponse200, RemoverClienteResponse400 } from './types';
