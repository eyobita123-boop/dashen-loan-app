import { useState } from 'react';
import api from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const CollateralValuation = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await api.post('/collateral/evaluate', {
        type: 'Commercial Building',
        estimatedValue: 1000000,
        ageYears: 1,
      });
      setResult(response.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary-800 mb-6">Collateral Valuation</h2>
      <Card>
        <p className="text-gray-600 mb-4">Use the collateral valuation API to estimate net collateral value and discount factors.</p>
        <Button onClick={handleCalculate} loading={loading}>
          Calculate Sample Value
        </Button>
      </Card>
      {result && (
        <Card title="Valuation Result">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between">
              <span>Discount Factor</span>
              <span>{result.discountFactor}%</span>
            </div>
            <div className="flex justify-between">
              <span>Net Value</span>
              <span>{result.netValue}</span>
            </div>
            <div className="flex justify-between">
              <span>Acceptable Base</span>
              <span>{result.acceptableBase}</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CollateralValuation;
