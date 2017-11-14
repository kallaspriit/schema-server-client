import { JSONSchema4 } from 'json-schema';
export interface IRouteMetadata {
    title: string;
    description: string;
    sinceVersion: string;
    isDeprecated: boolean;
}
export declare type RouteMethodVerb = 'get' | 'post' | 'delete' | 'put';
export interface IRouteSchema {
    method: RouteMethodVerb;
    group: string;
    name: string;
    path: string;
    endpointUrl: string;
    schemaUrl: string;
    metadata: IRouteMetadata;
    requestSchema: JSONSchema4;
    responseSchema: JSONSchema4;
}
export interface ISchemaMetadata {
    title: string;
    description: string;
    version: string;
}
export interface ISchema {
    metadata: ISchemaMetadata;
    routes: IRouteSchema[];
}
export interface IApiDescriptor {
    route: IRouteSchema;
    path: string;
    name: string;
    method: string;
    contents: string;
}
export declare function fetchSchema(url: string): Promise<ISchema>;
export declare function getApiDescriptor(route: IRouteSchema): Promise<IApiDescriptor>;
export declare function getDescriptorContents(method: string, _requestSchema: JSONSchema4, _responseSchema: JSONSchema4): Promise<string>;
