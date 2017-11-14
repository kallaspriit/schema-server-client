import axios from 'axios';
import {camelCase} from 'change-case';
import {JSONSchema4} from 'json-schema';

export interface IRouteMetadata {
	title: string;
	description: string;
	sinceVersion: string;
	isDeprecated: boolean;
}

export type RouteMethodVerb = 'get' | 'post' | 'delete' | 'put';

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

export async function fetchSchema(url: string): Promise<ISchema> {
	const schema = await axios.get(url);

	return schema.data as ISchema;
}

export async function getApiDescriptor(route: IRouteSchema): Promise<IApiDescriptor> {
	const path = getDescriptorPath(route.group);
	const name = getDescriptorName(route.name);
	const method = camelCase(name);
	const contents = await getDescriptorContents(method, route.requestSchema, route.responseSchema);
	const descriptor: IApiDescriptor = {
		route,
		path,
		name,
		method,
		contents,
	};

	return descriptor;
}

export async function getDescriptorContents(method: string, _requestSchema: JSONSchema4, _responseSchema: JSONSchema4) {
	return [`export default function ${method}() {`, `  return null;`, `}`].join('\n');
}

function getDescriptorPath(group: string): string {
	if (group.length > 0) {
		return group;
	}

	return 'index';
}

function getDescriptorName(name: string): string {
	if (name.substring(name.length - 6) === '-route') {
		return name.substring(0, name.length - 6);
	}

	return name;
}
