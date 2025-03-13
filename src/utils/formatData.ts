export function formatDate(date: Date | null, locale: string): string {
  if (date == null) return ''

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function getValidationResult(validationResultObject : any) : ValidateObj {

  let resultAsString: string = JSON.stringify(validationResultObject);
  let resultObject: ValidateObj = JSON.parse(resultAsString);

  return resultObject;
}
