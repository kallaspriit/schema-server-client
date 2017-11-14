"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../");
const util_1 = require("util");
const mkdirp = require("mkdirp");
const path = require("path");
const fs_1 = require("fs");
const createPath = util_1.promisify(mkdirp);
const createFile = util_1.promisify(fs_1.writeFile);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'http://localhost:3000/schema';
        const schema = yield _1.fetchSchema(url);
        const descriptors = yield Promise.all(schema.routes.map(route => _1.getApiDescriptor(route)));
        const basePath = path.join(__dirname, '..', '..', 'src', 'example', 'api');
        // create api base path
        yield createPath(basePath);
        descriptors.forEach((descriptor) => __awaiter(this, void 0, void 0, function* () {
            const apiPath = path.join(basePath, descriptor.path);
            const apiFilename = path.join(apiPath, `${descriptor.method}.ts`);
            yield createPath(apiPath);
            yield createFile(apiFilename, descriptor.contents, 'utf8');
        }));
        console.log({
            schema,
            descriptors,
        });
    });
}
run();
// style alive for debugging
// setTimeout(() => console.log('done'), 60 * 60 * 1000);
//# sourceMappingURL=index.js.map