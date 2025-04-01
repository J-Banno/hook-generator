interface CharProgressProps {
  current: number;
  max: number;
}

export function CharProgress({ current, max }: CharProgressProps) {
  const percentage = Math.min((current / max) * 100, 100);
  const barColor =
    current < 800
      ? "bg-blue-500"
      : current < 1000
      ? "bg-yellow-400"
      : "bg-red-500";

  return (
    <div className="w-full mt-1">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div
        className={`text-right text-xs mt-1 ${
          current > max ? "text-red-500 font-semibold" : "text-gray-500"
        }`}
      >
        {current} / {max} caractères
      </div>
    </div>
  );
}
