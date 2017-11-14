import {writeFile} from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import {promisify} from 'util';
import {fetchSchema, getApiDescriptor, IApiDescriptor} from '../';

const createPath = promisify(mkdirp);
const createFile = promisify(writeFile);

async function run() {
	const url = 'http://localhost:3000/schema';
	const schema = await fetchSchema(url);
	const descriptors: IApiDescriptor[] = await Promise.all(schema.routes.map(route => getApiDescriptor(route)));
	const basePath = path.join(__dirname, '..', '..', 'src', 'example', 'api');

	// create api base path
	await createPath(basePath);

	descriptors.forEach(async descriptor => {
		const apiPath = path.join(basePath, descriptor.path);
		const apiFilename = path.join(apiPath, `${descriptor.method}.ts`);

		await createPath(apiPath);
		await createFile(apiFilename, descriptor.contents, 'utf8');
	});

	console.log({
		schema,
		descriptors,
	});
}

run();

// style alive for debugging
// setTimeout(() => console.log('done'), 60 * 60 * 1000);
