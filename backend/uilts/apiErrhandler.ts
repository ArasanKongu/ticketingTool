import { SchemaError } from "../types/response.type";
import Ajv from "ajv";

const ajv = new Ajv({ useDefaults: true, removeAdditional: true }); // options can be passed, e.g. {allErrors: true}

class SchemaValidate {
  static schemaErrObject(errors?: null | any[]) {
    const schemaError: SchemaError[] = [];

    if (!errors) {
      return schemaError;
    }

    let error: SchemaError;
    for (let i = 0; i < errors.length; i++) {
      error = {
        instancePath: errors[i].instancePath,
        message: errors[i].message,
      };
      schemaError.push(error);
    }

    return schemaError;
  }
}

export default SchemaValidate;
