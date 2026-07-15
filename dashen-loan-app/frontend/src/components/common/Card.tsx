import { ReactNode } from 'react';

interface CardProps {
  title?: string;
    children: ReactNode;
    }

    const Card = ({ title, children }: CardProps) => {
      return (
          <div className="bg-white rounded-xl shadow-md p-6">
                {title && <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>}
                      {children}
                          </div>
                            );
                            };

                            export default Card;