import { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/common/Card';
import Table from '../components/common/Table';

const CustomerList = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get('/customers');
        setCustomers(response.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary-800 mb-6">Customer List</h2>
      <Card>
        {loading ? (
          <div className="text-center py-10">Loading customers...</div>
        ) : (
          <Table
            columns={[
              { header: 'Name', accessor: 'fullName' },
              { header: 'Phone', accessor: 'phone' },
              { header: 'Email', accessor: 'email' },
              { header: 'Business Type', accessor: 'businessType' },
            ]}
            data={customers}
          />
        )}
      </Card>
    </div>
  );
};

export default CustomerList;
