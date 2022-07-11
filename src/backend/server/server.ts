import express from 'express';

import * as oms from './oms-express.js';
import * as cat from './category-express.js';

const restPort = 3000;

const rest = express();

rest.use(express.json());

oms.deploy(rest);
cat.deploy(rest);

rest.listen(restPort, () => console.log(`REST server is running on http://localhost:${restPort}`));
