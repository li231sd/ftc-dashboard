import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Gauge, Navigation } from "lucide-react";

export default function DrivetrainView() {
  // Get data from Redux instead of local state
  const drivetrainData = useSelector((state: RootState) => state.drivetrain);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw field and robot path
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = width / 288; // 288 inches total (-144 to +144)

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = -144; x <= 144; x += 24) {
      const canvasX = centerX + x * scale;
      ctx.beginPath();
      ctx.moveTo(canvasX, 0);
      ctx.lineTo(canvasX, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = -144; y <= 144; y += 24) {
      const canvasY = centerY - y * scale;
      ctx.beginPath();
      ctx.moveTo(0, canvasY);
      ctx.lineTo(width, canvasY);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Draw path history
    if (drivetrainData.pathHistory.length > 1) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const firstPoint = drivetrainData.pathHistory[0];
      ctx.moveTo(
        centerX + firstPoint.x * scale,
        centerY - firstPoint.y * scale
      );

      for (let i = 1; i < drivetrainData.pathHistory.length; i++) {
        const point = drivetrainData.pathHistory[i];
        ctx.lineTo(
          centerX + point.x * scale,
          centerY - point.y * scale
        );
      }
      ctx.stroke();
    }

    // Draw robot position
    const robotX = centerX + drivetrainData.position.x * scale;
    const robotY = centerY - drivetrainData.position.y * scale;

    // Robot body
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(robotX, robotY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Robot heading indicator
    const headingRad = (drivetrainData.position.heading * Math.PI) / 180;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(robotX, robotY);
    ctx.lineTo(
      robotX + Math.cos(headingRad - Math.PI / 2) * 15,
      robotY + Math.sin(headingRad - Math.PI / 2) * 15
    );
    ctx.stroke();

    // Draw coordinate labels
    ctx.fillStyle = '#888';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';

    // X-axis labels
    for (let x = -144; x <= 144; x += 72) {
      const canvasX = centerX + x * scale;
      ctx.fillText(x.toString(), canvasX, height - 5);
    }

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let y = -144; y <= 144; y += 72) {
      const canvasY = centerY - y * scale;
      ctx.fillText(y.toString(), 30, canvasY + 4);
    }
  }, [drivetrainData.position, drivetrainData.pathHistory]);

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      {/* Robot Path Visualization - Takes up 2 columns */}
      <Card className="lg:col-span-2 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Robot Path & Position
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="w-full h-auto border border-border rounded-lg"
            style={{ maxHeight: '600px' }}
          />

          {/* Position Display */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">X Position</div>
              <div className="text-2xl font-bold">{drivetrainData.position.x.toFixed(1)}"</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Y Position</div>
              <div className="text-2xl font-bold">{drivetrainData.position.y.toFixed(1)}"</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Heading</div>
              <div className="text-2xl font-bold">{drivetrainData.position.heading.toFixed(1)}°</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Metrics */}
      <div className="space-y-4">
        {/* Velocity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Gauge className="h-4 w-4" />
              Velocity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">in/s</span>
                <span className="font-bold">{drivetrainData.velocity.toFixed(1)}</span>
              </div>
              <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300"
                  style={{ width: `${drivetrainData.velocity}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acceleration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Gauge className="h-4 w-4" />
              Acceleration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">in/s²</span>
                <span className="font-bold">{drivetrainData.acceleration.toFixed(1)}</span>
              </div>
              <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
                  style={{ width: `${drivetrainData.acceleration}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Center of Gravity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Compass className="h-4 w-4" />
              Center of Gravity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-square bg-muted/30 rounded-lg">
              {/* CoG Grid */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Grid lines */}
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" opacity="0.2" />

                {/* CoG indicator */}
                <circle
                  cx={`${50 + (drivetrainData.centerOfGravity.x / 20) * 50}%`}
                  cy={`${50 - (drivetrainData.centerOfGravity.y / 20) * 50}%`}
                  r="8"
                  fill="#ef4444"
                  className="transition-all duration-300"
                />
              </svg>

              {/* Labels */}
              <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
                X: {drivetrainData.centerOfGravity.x.toFixed(1)}"
              </div>
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                Y: {drivetrainData.centerOfGravity.y.toFixed(1)}"
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
