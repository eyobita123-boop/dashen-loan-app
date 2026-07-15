import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
      variant?: 'primary' | 'secondary' | 'danger';
        loading?: boolean;
          fullWidth?: boolean;
            onClick?: () => void;
            }

            const Button = ({ children, type = 'button', variant = 'primary', loading, fullWidth, onClick }: ButtonProps) => {
              const base = 'px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2';
                const variants = {
                    primary: 'bg-primary-600 text-white hover:bg-primary-700',
                        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
                            danger: 'bg-red-600 text-white hover:bg-red-700',
                              };
                                return (
                                    <button
                                          type={type}
                                                onClick={onClick}
                                                      disabled={loading}
                                                            className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
                                                                >
                                                                      {loading && <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
                                                                            {children}
                                                                                </button>
                                                                                  );
                                                                                  };

                                                                                  export default Button;