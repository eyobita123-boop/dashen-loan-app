export interface Column<T> {
  header: string;
  accessor: keyof T | string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const Table = <T extends Record<string, any>>({ columns, data }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
      <table className="min-w-full text-left divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={String(column.accessor)} className="px-4 py-3 text-sm font-semibold text-gray-700">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={String(column.accessor)} className="px-4 py-3 text-sm text-gray-600">
                  {String(row[column.accessor as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
