interface KPICardProps {
      title: string;
        value: number;
          prefix?: string;
            suffix?: string;
            }

            const KPICard = ({ title, value, prefix = '', suffix = '' }: KPICardProps) => {
              return (
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
                        <span className="text-sm text-gray-500 uppercase tracking-wide">{title}</span>
                              <span className="text-2xl font-bold text-gray-800 mt-2">
                                      {prefix}{value?.toLocaleString()}{suffix}
                                            </span>
                                                </div>
                                                  );
                                                  };

                                                  export default KPICard;
}