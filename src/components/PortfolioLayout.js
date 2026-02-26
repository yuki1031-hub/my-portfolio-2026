import React from 'react';
import PortfolioHeader from './PortfolioHeader';

export default function PortfolioLayout({ children }) {
    return (
        <div className="portfolio-layout">
            <PortfolioHeader />
            <main>{children}</main>
        </div>
    );
}
