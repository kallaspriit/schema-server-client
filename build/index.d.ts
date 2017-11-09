import { JSONSchema4 } from 'json-schema';
export interface ISchemaMetadata {
    title: string;
    description: string;
    version: string;
}
export declare type RouteMethodVerb = 'get' | 'post' | 'delete';
export interface ISchemaRouteMetadata {
    title: string;
    description: string;
    sinceVersion: string;
    isDeprecated: boolean;
}
export interface ISchemaRoute {
    group: string;
    path: string;
    method: RouteMethodVerb;
    endpointUrl: string;
    schemaUrl: string;
    metadata: ISchemaRouteMetadata;
    requestSchema: JSONSchema4;
    responseSchema: JSONSchema4;
}
export interface ISchema {
    metadata: ISchemaMetadata;
    routes: ISchemaRoute[];
}
export declare function fetchSchema(url: string): Promise<JSONSchema4>;
