import { FormControl } from '@angular/forms';
import { CustomValidators } from './custom.validators';

describe('CustomValidators', () => {
  describe('passwordStrength', () => {
    it('should return null if the password meets all strength requirements', () => {
      const control = new FormControl('Aa1!');
      const result = CustomValidators.passwordStrength(control);
      expect(result).toBeNull();
    });

    it('should flag missing uppercase letter', () => {
      const control = new FormControl('aa1!');
      const result = CustomValidators.passwordStrength(control);
      expect(result).toEqual({ uppercaseRequired: true });
    });

    it('should flag missing lowercase letter', () => {
      const control = new FormControl('AA1!');
      const result = CustomValidators.passwordStrength(control);
      expect(result).toEqual({ lowercaseRequired: true });
    });

    it('should flag missing number', () => {
      const control = new FormControl('AAa!');
      const result = CustomValidators.passwordStrength(control);
      expect(result).toEqual({ numberRequired: true });
    });

    it('should flag missing special character', () => {
      const control = new FormControl('AAa1');
      const result = CustomValidators.passwordStrength(control);
      expect(result).toEqual({ specialCharRequired: true });
    });

    it('should handle an empty password', () => {
      const control = new FormControl('');
      const result = CustomValidators.passwordStrength(control);
      expect(result).toBeNull();
    });

    it('should combine multiple error flags for multiple validation failures', () => {
      const control = new FormControl('A');
      const result = CustomValidators.passwordStrength(control);
      expect(result).toEqual({
        lowercaseRequired: true,
        numberRequired: true,
        specialCharRequired: true,
      });
    });

    it('should return futureDate: true if the selected date is in the future', () => {
      const control = new FormControl(
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()
      );
      const result = CustomValidators.futureDateValidator(control);
      expect(result).toBeNull();
    });

    it('should return an error object if the selected date is in the past', () => {
      const control = new FormControl('2021-01-01');
      const result = CustomValidators.futureDateValidator(control);
      expect(result).toEqual({ futureDate: true });
    });
  });
});
