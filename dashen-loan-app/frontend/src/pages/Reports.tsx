import { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/common/Card';

const Reports = () => {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get('/reports/dashboard');
        setSummary(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary-800 mb-6">Reports</h2>
      <Card>
        {summary ? (
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between">
              <span>Total Portfolio</span>
              <strong>ETB {summary.totalPortfolio?.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between">
              <span>Active Loans</span>
              <strong>{summary.activeLoans}</strong>
            </div>
          </div>
        ) : (
          <div>Loading report summary...</div>
        )}
      </Card>
    </div>
  );
};

export default Reports;
