const CarbonCard = ({ energy, savings }) => {
  return (
    <div className="bg-PATH-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-emerald-500/30 shadow-lg">
      <h3 className="text-emerald-400 font-bold uppercase text-xs tracking-widest mb-4">Route Analysis</h3>
      <div className="space-y-4">
        <div>
          <p className="text-slate-400 text-sm">Energy Efficiency Score</p>
          <p className="text-3xl font-mono font-bold text-white">{energy} <span className="text-sm font-normal text-slate-500">MJ</span></p>
        </div>
        <div className="pt-4 border-t border-slate-700">
          <p className="text-slate-400 text-sm">Estimated CO2 Savings</p>
          <p className="text-2xl font-bold text-emerald-400">+{savings}g</p>
        </div>
      </div>
    </div>
  );
};

export default CarbonCard;