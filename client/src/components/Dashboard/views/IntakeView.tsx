import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCw, ChevronUp, ChevronDown } from "lucide-react";

export default function IntakeView() {
  // Get data from Redux instead of local state
  const intakeData = useSelector((state: RootState) => state.intake);

  const getBallColor = (color: 'green' | 'purple' | 'empty') => {
    if (color === 'green') return 'bg-green-500';
    if (color === 'purple') return 'bg-purple-500';
    return 'bg-muted';
  };

  const getBallBorder = (color: 'green' | 'purple' | 'empty') => {
    if (color === 'green') return 'border-green-500';
    if (color === 'purple') return 'border-purple-500';
    return 'border-border';
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Left Column */}
      <div className="space-y-6">
        {/* RPM Display */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCw className="h-5 w-5 animate-spin" style={{ animationDuration: `${1000 / (intakeData.rpm / 60)}ms` }} />
              Intake RPM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-6xl font-bold tabular-nums">{intakeData.rpm.toFixed(0)}</div>
              <div className="text-2xl text-muted-foreground">RPM</div>
            </div>

            {/* RPM Visual Bar */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0</span>
                <span>250</span>
                <span>500</span>
              </div>
              <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 transition-all duration-300"
                  style={{ width: `${(intakeData.rpm / 500) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flick Servos */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Flick Servos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {/* Servo 1 */}
              <div className="flex flex-col items-center gap-3">
                <div className="text-sm font-medium text-muted-foreground">Servo 1</div>
                <div className={`relative w-20 h-32 rounded-lg border-2 transition-all ${
                  intakeData.flickServos.servo1 === 'up'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-red-500 bg-red-500/10'
                }`}>
                  <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                    intakeData.flickServos.servo1 === 'up' ? 'top-2' : 'bottom-2'
                  }`}>
                    {intakeData.flickServos.servo1 === 'up' ? (
                      <ChevronUp className="h-6 w-6 text-green-500" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </div>
                <div className={`text-sm font-bold ${
                  intakeData.flickServos.servo1 === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {intakeData.flickServos.servo1.toUpperCase()}
                </div>
              </div>

              {/* Servo 2 */}
              <div className="flex flex-col items-center gap-3">
                <div className="text-sm font-medium text-muted-foreground">Servo 2</div>
                <div className={`relative w-20 h-32 rounded-lg border-2 transition-all ${
                  intakeData.flickServos.servo2 === 'up'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-red-500 bg-red-500/10'
                }`}>
                  <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                    intakeData.flickServos.servo2 === 'up' ? 'top-2' : 'bottom-2'
                  }`}>
                    {intakeData.flickServos.servo2 === 'up' ? (
                      <ChevronUp className="h-6 w-6 text-green-500" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </div>
                <div className={`text-sm font-bold ${
                  intakeData.flickServos.servo2 === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {intakeData.flickServos.servo2.toUpperCase()}
                </div>
              </div>

              {/* Servo 3 */}
              <div className="flex flex-col items-center gap-3">
                <div className="text-sm font-medium text-muted-foreground">Servo 3</div>
                <div className={`relative w-20 h-32 rounded-lg border-2 transition-all ${
                  intakeData.flickServos.servo3 === 'up'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-red-500 bg-red-500/10'
                }`}>
                  <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                    intakeData.flickServos.servo3 === 'up' ? 'top-2' : 'bottom-2'
                  }`}>
                    {intakeData.flickServos.servo3 === 'up' ? (
                      <ChevronUp className="h-6 w-6 text-green-500" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </div>
                <div className={`text-sm font-bold ${
                  intakeData.flickServos.servo3 === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {intakeData.flickServos.servo3.toUpperCase()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Ball Holders */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Ball Holder Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-8 py-8">
            {/* Position 1 */}
            <div className="flex items-center gap-6 w-full max-w-md">
              <div className="text-lg font-semibold text-muted-foreground w-24">Position 1</div>
              <div className={`flex-1 h-24 rounded-xl border-4 ${getBallBorder(intakeData.ballHolders.pos1)} ${getBallColor(intakeData.ballHolders.pos1)} transition-all duration-300 flex items-center justify-center shadow-lg`}>
                {intakeData.ballHolders.pos1 !== 'empty' && (
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white drop-shadow-lg">
                      {intakeData.ballHolders.pos1 === 'green' ? 'G' : 'P'}
                    </span>
                  </div>
                )}
                {intakeData.ballHolders.pos1 === 'empty' && (
                  <span className="text-sm text-muted-foreground/50">EMPTY</span>
                )}
              </div>
            </div>

            {/* Position 2 */}
            <div className="flex items-center gap-6 w-full max-w-md">
              <div className="text-lg font-semibold text-muted-foreground w-24">Position 2</div>
              <div className={`flex-1 h-24 rounded-xl border-4 ${getBallBorder(intakeData.ballHolders.pos2)} ${getBallColor(intakeData.ballHolders.pos2)} transition-all duration-300 flex items-center justify-center shadow-lg`}>
                {intakeData.ballHolders.pos2 !== 'empty' && (
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white drop-shadow-lg">
                      {intakeData.ballHolders.pos2 === 'green' ? 'G' : 'P'}
                    </span>
                  </div>
                )}
                {intakeData.ballHolders.pos2 === 'empty' && (
                  <span className="text-sm text-muted-foreground/50">EMPTY</span>
                )}
              </div>
            </div>

            {/* Position 3 */}
            <div className="flex items-center gap-6 w-full max-w-md">
              <div className="text-lg font-semibold text-muted-foreground w-24">Position 3</div>
              <div className={`flex-1 h-24 rounded-xl border-4 ${getBallBorder(intakeData.ballHolders.pos3)} ${getBallColor(intakeData.ballHolders.pos3)} transition-all duration-300 flex items-center justify-center shadow-lg`}>
                {intakeData.ballHolders.pos3 !== 'empty' && (
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white drop-shadow-lg">
                      {intakeData.ballHolders.pos3 === 'green' ? 'G' : 'P'}
                    </span>
                  </div>
                )}
                {intakeData.ballHolders.pos3 === 'empty' && (
                  <span className="text-sm text-muted-foreground/50">EMPTY</span>
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm text-muted-foreground">Green Ball</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <span className="text-sm text-muted-foreground">Purple Ball</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border border-muted-foreground/50"></div>
                <span className="text-sm text-muted-foreground">Empty</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}