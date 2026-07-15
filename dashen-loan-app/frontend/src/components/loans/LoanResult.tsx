interface LoanResultProps {
  title: string;
  details: Record<string, any>;
}

const LoanResult = ({ title, details }: LoanResultProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="flex justify-between border-b border-gray-100 py-2">
            <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            <span className="font-medium text-gray-900">{String(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanResult;
