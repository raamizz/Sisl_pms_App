import React from "react";
import StatSection from "./StatSection";

const StatusCard = ({ stats }) => {
  return (
    <div>
      <div className="-mt-12 px-3">
        <div className="relative">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-white/20 rounded-xl" />

          <div className="relative bg-white/10 backdrop-blur-lg rounded-xl p-3">
            <div className="grid grid-cols-3 gap-2">
              <StatSection
                data={stats}
                title="Critical"
                dotColor="bg-red-500"
                type="critical"
              />

              <div className="border-l border-white/20 pl-2">
                <StatSection
                  data={stats}
                  title="Non-Critical"
                  dotColor="bg-blue-500"
                  type="non-critical"
                />
              </div>

              <div className="border-l border-white/20 pl-2">
                <StatSection
                  data={stats}
                  title="Postponed"
                  dotColor="bg-gray-500"
                  type="postponed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
