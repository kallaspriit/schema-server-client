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
const axios_1 = require("axios");
const change_case_1 = require("change-case");
function fetchSchema(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield axios_1.default.get(url);
        return schema.data;
    });
}
exports.fetchSchema = fetchSchema;
function getApiDescriptor(route) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = getDescriptorPath(route.group);
        const name = getDescriptorName(route.name, route.path, route.method);
        const method = change_case_1.camelCase(name);
        const contents = yield getDescriptorContents(method, route.requestSchema, route.responseSchema);
        const descriptor = {
            route,
            path,
            name,
            method,
            contents,
        };
        return descriptor;
    });
}
exports.getApiDescriptor = getApiDescriptor;
function getDescriptorContents(method, _requestSchema, _responseSchema) {
    return __awaiter(this, void 0, void 0, function* () {
        return [`export default function ${method}() {`, `  return null;`, `}`].join('\n');
    });
}
exports.getDescriptorContents = getDescriptorContents;
function getDescriptorPath(group) {
    if (group.length > 0) {
        return group;
    }
    return 'index';
}
function getDescriptorName(name, _path, _method) {
    if (name.substring(name.length - 6) === '-route') {
        return name.substring(0, name.length - 6);
    }
    return name;
}
//# sourceMappingURL=index.js.map