import {fetchSchema} from '../';

async function run() {
	console.log('running');

	const url = 'http://localhost:3000/schema';
	const schema = await fetchSchema(url);

	console.log({
		schema,
	});
}

run();
