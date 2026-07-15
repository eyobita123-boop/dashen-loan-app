import { UseFormRegister, FieldError } from 'react-hook-form';

interface SelectProps {
  label: string;
    name: string;
      register: UseFormRegister<any>;
        options: string[];
          error?: FieldError;
            required?: boolean;
            }

            const Select = ({ label, name, register, options, error, required }: SelectProps) => {
              return (
                  <div>
                        <label className="label">
                                {label} {required && <span className="text-red-500">*</span>}
                                      </label>
                                            <select {...register(name)} className="input-field">
                                                    <option value="">Select...</option>
                                                            {options.map((opt) => (
                                                                      <option key={opt} value={opt}>{opt}</option>
                                                                              ))}
                                                                                    </select>
                                                                                          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                                                                                              </div>
                                                                                                );
                                                                                                };

                                                                                                export default Select;