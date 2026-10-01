import React from 'react';
import { Heart, MessageSquareQuote, UserCheck } from 'lucide-react';

export const DonorWall = ({ donors, currencySymbol = '$' }) => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-10 border-t border-slate-800/80">
      
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            Community Gratitude
          </span>
          <h2 className="text-3xl font-bold text-white font-heading tracking-tight mt-2">
            Ambassador Supporters & Champions
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Special thanks to our generous donors and alumni who are making CIS Ambassadors Camp 2026 possible!
          </p>
        </div>
      </div>

      {/* Grid of Donor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donors.map((donor, idx) => (
          <div key={idx} className="glass-panel p-5 border-slate-800 hover:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center justify-center font-bold text-xs">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm line-clamp-1">{donor.name}</h3>
                    <span className="text-[11px] text-slate-400">{donor.date}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-extrabold text-sm font-heading shrink-0">
                  {currencySymbol}{donor.amount.toLocaleString()}
                </span>
              </div>

              {donor.comment && (
                <div className="mt-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 italic flex items-start gap-2">
                  <MessageSquareQuote className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>"{donor.comment}"</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
