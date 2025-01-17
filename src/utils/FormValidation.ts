export function getValidationResult(validationResultObject : any) : ValidateObj {

  let resultAsString: string = JSON.stringify(validationResultObject);
  let resultObject: ValidateObj = JSON.parse(resultAsString);

  return resultObject;
}
