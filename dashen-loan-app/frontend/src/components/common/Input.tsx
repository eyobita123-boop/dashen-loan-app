import { UseFormRegister, FieldError } from 'react-hook-form';

interface InputProps {
  label: string;
    name: string;
      register: UseFormRegister<any>;
        type?: 'text' | 'number' | 'email' | 'password' | 'date';
          placeholder?: string;
            error?: FieldError;
              required?: boolean;
                step?: string;
                }

                const Input = ({ label, name, register, type = 'text', placeholder, error, required, step }: InputProps) => {
                  return (
                      <div>
                            <label className="label">
                                    {label} {required && <span className="text-red-500">*</span>}
                                          </label>
                                                <input
                                                        type={type}
                                                                {...register(name, { valueAsNumber: type === 'number' })}
                                                                        placeholder={placeholder}
                                                                                step={step}
                                                                                        className="input-field"
                                                                                              />
                                                                                                    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                                                                                                        </div>
                                                                                                          );
                                                                                                          };

                                                                                                          export default Input;