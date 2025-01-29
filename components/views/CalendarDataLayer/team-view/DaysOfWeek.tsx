export function DaysOfWeek() {
  return (
    <div className="z-10 grid grid-cols-7 gap-px border-b border-vodafone-gray-200 bg-vodafone-gray-200 text-center text-xs/6 font-semibold text-gray-700 lg:sticky lg:left-0 lg:top-0 lg:flex-none lg:justify-self-start">
      <div className="bg-white py-2">
        M<span className="sr-only sm:not-sr-only">on</span>
      </div>
      <div className="bg-white py-2">
        T<span className="sr-only sm:not-sr-only">ue</span>
      </div>
      <div className="bg-white py-2">
        W<span className="sr-only sm:not-sr-only">ed</span>
      </div>
      <div className="bg-white py-2">
        T<span className="sr-only sm:not-sr-only">hu</span>
      </div>
      <div className="bg-white py-2">
        F<span className="sr-only sm:not-sr-only">ri</span>
      </div>
      <div className="bg-white py-2">
        S<span className="sr-only sm:not-sr-only">at</span>
      </div>
      <div className="bg-white py-2">
        S<span className="sr-only sm:not-sr-only">un</span>
      </div>
    </div>
  );
}
