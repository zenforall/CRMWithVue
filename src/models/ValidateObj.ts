interface ErrorObj {
  id:string;
  errorMessages:string[];
}

interface ValidateObj {
   valid: boolean;
   errors: ErrorObj[];
}
