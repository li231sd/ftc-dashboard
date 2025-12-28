import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCw, Target, Navigation, TrendingUp } from "lucide-react";

export default function DepositView() {
  // Get data from Redux instead of local state
  const depositData = useSelector((state: RootState) => state.deposit);

  const getAllianceColors = () => {
    if (depositData.allianceColor === 'blue') {
      return {
        bg: 'bg-blue-500',
        border: 'border-blue-500',
        text: 'text-blue-500',
        bgLight: 'bg-blue-500/10'
      };
    }
    return {
      bg: 'bg-red-500',
      border: 'border-red-500',
      text: 'text-red-500',
      bgLight: 'bg-red-500/10'
    };
  };

  const colors = getAllianceColors();

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Motor RPM */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCw
                className="h-5 w-5 animate-spin"
                style={{ animationDuration: `${1000 / (depositData.motorRpm / 60)}ms` }}
              />
              Deposit Motor RPM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-6xl font-bold tabular-nums">{depositData.motorRpm.toFixed(0)}</div>
              <div className="text-2xl text-muted-foreground">RPM</div>
            </div>

            {/* RPM Visual Bar */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0</span>
                <span>300</span>
                <span>600</span>
              </div>
              <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${(depositData.motorRpm / 600) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alliance Color */}
        <Card className={`shadow-sm border-2 ${colors.border}`}>
          <CardHeader>
            <CardTitle>Alliance Color</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center justify-center gap-4 p-8 rounded-lg ${colors.bgLight}`}>
              <div className={`w-20 h-20 rounded-full ${colors.bg} shadow-lg`}></div>
              <div>
                <div className={`text-4xl font-bold uppercase ${colors.text}`}>
                  {depositData.allianceColor}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Alliance</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distance to Goal */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Distance to Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-5xl font-bold tabular-nums">
                {depositData.distanceToGoal.toFixed(1)}
              </div>
              <div className="text-xl text-muted-foreground">inches</div>
            </div>

            {/* Distance indicator */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Close</span>
                <span>Far</span>
              </div>
              <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full transition-all duration-300 ${
                    depositData.distanceToGoal <= 30
                      ? 'bg-green-500'
                      : depositData.distanceToGoal <= 80
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((depositData.distanceToGoal / 150) * 100, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Column - PIDF Values */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            PIDF Controller Values
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* P Value */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <div>
                  <span className="text-2xl font-bold">P</span>
                  <span className="text-sm text-muted-foreground ml-2">(Proportional)</span>
                </div>
                <span className="text-3xl font-bold tabular-nums text-blue-500">
                  {depositData.pidfValues.p.toFixed(4)}
                </span>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${(depositData.pidfValues.p / 0.1) * 100}%` }}
                />
              </div>
            </div>

            {/* I Value */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <div>
                  <span className="text-2xl font-bold">I</span>
                  <span className="text-sm text-muted-foreground ml-2">(Integral)</span>
                </div>
                <span className="text-3xl font-bold tabular-nums text-green-500">
                  {depositData.pidfValues.i.toFixed(4)}
                </span>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${(depositData.pidfValues.i / 0.002) * 100}%` }}
                />
              </div>
            </div>

            {/* D Value */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <div>
                  <span className="text-2xl font-bold">D</span>
                  <span className="text-sm text-muted-foreground ml-2">(Derivative)</span>
                </div>
                <span className="text-3xl font-bold tabular-nums text-purple-500">
                  {depositData.pidfValues.d.toFixed(4)}
                </span>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${(depositData.pidfValues.d / 0.004) * 100}%` }}
                />
              </div>
            </div>

            {/* F Value */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <div>
                  <span className="text-2xl font-bold">F</span>
                  <span className="text-sm text-muted-foreground ml-2">(Feedforward)</span>
                </div>
                <span className="text-3xl font-bold tabular-nums text-orange-500">
                  {depositData.pidfValues.f.toFixed(4)}
                </span>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300"
                  style={{ width: `${(depositData.pidfValues.f / 0.15) * 100}%` }}
                />
              </div>
            </div>

            {/* PIDF Info */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground leading-relaxed">
                PIDF controllers combine proportional, integral, derivative, and feedforward control
                to precisely maintain motor speed and position for accurate deposit mechanisms.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Robot Position */}
      <div className="space-y-6">
        {/* 3D Position Display */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Robot Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* X Position */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold text-muted-foreground">X Position</span>
                  <span className="text-3xl font-bold tabular-nums">{depositData.robotPosition.x.toFixed(1)}"</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 h-full bg-red-500 transition-all duration-300"
                    style={{
                      left: `${50 + (depositData.robotPosition.x / 288) * 50}%`,
                      width: '4px'
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>-144"</span>
                  <span>0"</span>
                  <span>+144"</span>
                </div>
              </div>

              {/* Y Position */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold text-muted-foreground">Y Position</span>
                  <span className="text-3xl font-bold tabular-nums">{depositData.robotPosition.y.toFixed(1)}"</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 h-full bg-green-500 transition-all duration-300"
                    style={{
                      left: `${50 + (depositData.robotPosition.y / 288) * 50}%`,
                      width: '4px'
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>-144"</span>
                  <span>0"</span>
                  <span>+144"</span>
                </div>
              </div>

              {/* Heading (Rotation) */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold text-muted-foreground">Heading</span>
                  <span className="text-3xl font-bold tabular-nums">{depositData.robotPosition.heading.toFixed(1)}°</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${(depositData.robotPosition.heading / 360) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0°</span>
                  <span>180°</span>
                  <span>360°</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3D Position Visualizer */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Position Visualizer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-square bg-muted/30 rounded-lg overflow-hidden">
              {/* Top-down view of field */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Grid lines */}
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <line x1="25%" y1="0" x2="25%" y2="100%" stroke="currentColor" strokeWidth="1" opacity="0.1" />
                <line x1="75%" y1="0" x2="75%" y2="100%" stroke="currentColor" strokeWidth="1" opacity="0.1" />
                <line x1="0" y1="25%" x2="100%" y2="25%" stroke="currentColor" strokeWidth="1" opacity="0.1" />
                <line x1="0" y1="75%" x2="100%" y2="75%" stroke="currentColor" strokeWidth="1" opacity="0.1" />

                {/* Robot position */}
                <circle
                  cx={`${50 + (depositData.robotPosition.x / 288) * 50}%`}
                  cy={`${50 - (depositData.robotPosition.y / 288) * 50}%`}
                  r="12"
                  fill={depositData.allianceColor === 'blue' ? '#3b82f6' : '#ef4444'}
                  className="transition-all duration-300"
                />

                {/* Robot heading indicator (direction arrow) */}
                <line
                  x1={`${50 + (depositData.robotPosition.x / 288) * 50}%`}
                  y1={`${50 - (depositData.robotPosition.y / 288) * 50}%`}
                  x2={`${50 + (depositData.robotPosition.x / 288) * 50 + Math.cos((depositData.robotPosition.heading - 90) * Math.PI / 180) * 5}%`}
                  y2={`${50 - (depositData.robotPosition.y / 288) * 50 + Math.sin((depositData.robotPosition.heading - 90) * Math.PI / 180) * 5}%`}
                  stroke="#fbbf24"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>

              {/* Labels */}
              <div className="absolute top-2 left-2 text-xs font-mono text-muted-foreground bg-background/80 px-2 py-1 rounded">
                XY: ({depositData.robotPosition.x.toFixed(0)}, {depositData.robotPosition.y.toFixed(0)})
              </div>
              <div className="absolute top-2 right-2 text-xs font-mono text-muted-foreground bg-background/80 px-2 py-1 rounded">
                Heading: {depositData.robotPosition.heading.toFixed(1)}°
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
