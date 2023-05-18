import React, { ReactNode } from 'react';
import './paper.scss';

interface PaperProps {
  children: ReactNode;
}

const Paper: React.FC<PaperProps> = ({ children }) => {
  return <div className="paper">{children}</div>;
};

export default Paper;