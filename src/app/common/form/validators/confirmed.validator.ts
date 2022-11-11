import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function confirmedValidator(
  controlName: string,
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl):
    ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[controlName] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
    !!control.parent.value &&
    control.value ===
    (control.parent?.controls as any)[controlName].value
      ? null
      : { matching: true };
  };
}
