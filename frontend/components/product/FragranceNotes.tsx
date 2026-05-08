'use client';

import React from 'react';

interface FragranceNotesProps {
  notes: {
    top?: string;
    heart?: string;
    base?: string;
  };
}

const FragranceNotes = ({ notes }: FragranceNotesProps) => {
  return (
    <div className="space-y-6 py-6 border-t border-z-gold/10">
      <h4 className="font-display text-xl text-z-black tracking-wide">Fragrance Notes</h4>
      <div className="grid grid-cols-1 gap-6">
        {notes.top && (
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 flex-shrink-0 bg-z-gold/10 flex items-center justify-center text-z-amber font-display italic">Top</div>
            <div>
              <div className="font-body text-[10px] uppercase tracking-widest text-z-charcoal/40 mb-1">First Impression</div>
              <div className="font-body text-sm text-z-charcoal">{notes.top}</div>
            </div>
          </div>
        )}
        {notes.heart && (
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 flex-shrink-0 bg-z-gold/10 flex items-center justify-center text-z-amber font-display italic">Heart</div>
            <div>
              <div className="font-body text-[10px] uppercase tracking-widest text-z-charcoal/40 mb-1">The Soul</div>
              <div className="font-body text-sm text-z-charcoal">{notes.heart}</div>
            </div>
          </div>
        )}
        {notes.base && (
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 flex-shrink-0 bg-z-gold/10 flex items-center justify-center text-z-amber font-display italic">Base</div>
            <div>
              <div className="font-body text-[10px] uppercase tracking-widest text-z-charcoal/40 mb-1">The Sillage</div>
              <div className="font-body text-sm text-z-charcoal">{notes.base}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FragranceNotes;
