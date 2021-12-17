import * as _ from 'lodash';
import {$, cd, path} from 'zx'

import { createOutputDir, readInput, writeOutputs } from './transformer';

const run = async () => {
	const input = await readInput();
	const outputDir = await createOutputDir();
	
	console.log(`${input.transformerContract.name} starting`);
	console.log('input:', input.contract);
	console.log('input directory:', input.artifactPath);
	console.log('output directory:', outputDir);

	// ❇️ TODO your code goes here:
	// $ is a helper function that lets you easily execute any shell commands.
	// Just install your favorite CLI in the Dockerfile.
	// BEWARE that the input directory is read-only. 
	cd(input.artifactPath);
	$`tar czf ${path.join(outputDir, 'result.tar.gz')} *` // 👈 change this

	const outContract = {
		type: 'type-my-out-type@1.2.3', // 👈 change this
		data: {
			someResultProperty: 1,
		},
	};

	await writeOutputs([
		{ contract: outContract, artifactType: 'artifact', path: outputDir },
	]);
};

run().catch((err) => {
	console.log('ERROR IN TRANSFORMER', err);
	process.exit(1);
});
