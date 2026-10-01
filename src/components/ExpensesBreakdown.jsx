import React from 'react';
import { Home, Utensils, Bus, BookOpen, Award, PieChart } from 'lucide-react';

const ICON_MAP = {
  Home: Home,
  Utensils: Utensils,
  Bus: Bus,
  BookOpen: BookOpen,
  Award: Award
};

export const ExpensesBreakdown = ({ expenses, targetGoal }) => {
  return (
    <section style={{ margin: '3rem 0', paddingTop: '2.5rem', borderTop: '1px solid var(--border-subtle)' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <div>
          <span className="badge-pill badge-violet">Budget Transparency</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', marginTop: '0.5rem' }}>
            Where Your Support Goes
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            Complete cost allocation of the $8,000 camp deficit for CIS Ambassadors Camp 2026.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '14px', background: '#0f172a', borderRadius: '9999px', overflow: 'hidden', display: 'flex', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
        {expenses.map((expense, idx) => (
          <div 
            key={idx}
            style={{ width: `${expense.percentage}%`, backgroundColor: expense.color, height: '100%' }}
            title={`${expense.category}: $${expense.amount} (${expense.percentage}%)`}
          ></div>
        ))}
      </div>

      {/* Expense Grid */}
      <div className="expenses-grid">
        {expenses.map((expense, idx) => {
          const IconComp = ICON_MAP[expense.icon] || Home;

          return (
            <div key={idx} className="expense-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ padding: '0.4rem', borderRadius: '0.5rem', background: `${expense.color}25`, color: expense.color }}>
                    <IconComp style={{ width: 18, height: 18 }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', fontFamily: 'monospace' }}>
                    {expense.percentage}%
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', lineHeight: '1.25' }}>
                  {expense.category}
                </div>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Allocated</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 900, color: '#ffffff' }}>
                  ${expense.amount.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
