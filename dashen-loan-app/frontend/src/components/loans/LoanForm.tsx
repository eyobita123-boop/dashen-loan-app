import { ReactNode } from 'react';

interface LoanFormProps {
  title: string;
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoanForm = ({ title, children, onSubmit }: LoanFormProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </div>
  );
};

export default LoanForm;
