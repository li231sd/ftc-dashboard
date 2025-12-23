import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Settings,
  RotateCw,
  ChevronUp,
  ChevronDown,
  TrendingUp,
  Send
} from "lucide-react";

export default function TelemetryView() {
  // Intake Motor State
  const [intakeMotorRpm, setIntakeMotorRpm] = useState(0);

  // Flick Servo States
  const [flickServo1, setFlickServo1] = useState<'up' | 'down'>('down');
  const [flickServo2, setFlickServo2] = useState<'up' | 'down'>('down');
  const [flickServo3, setFlickServo3] = useState<'up' | 'down'>('down');

  // Deposit Motor RPM
  const [depositRpm, setDepositRpm] = useState(0);

  // PID Values for Deposit
  const [pidP, setPidP] = useState(0.05);
  const [pidI, setPidI] = useState(0.001);
  const [pidD, setPidD] = useState(0.002);
  const [pidF, setPidF] = useState(0.1);

  const handleSendIntakeRpm = () => {
    // TODO: Send to robot via WebSocket/Redux
    console.log('Sending Intake RPM:', intakeMotorRpm);
  };

  const handleSendFlickServo = (servo: 1 | 2 | 3, position: 'up' | 'down') => {
    // TODO: Send to robot via WebSocket/Redux
    console.log(`Sending Flick Servo ${servo}:`, position);
  };

  const handleSendDepositRpm = () => {
    // TODO: Send to robot via WebSocket/Redux
    console.log('Sending Deposit RPM:', depositRpm);
  };

  const handleSendPID = () => {
    // TODO: Send to robot via WebSocket/Redux
    console.log('Sending PID Values:', { p: pidP, i: pidI, d: pidD, f: pidF });
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Left Column - Intake Controls */}
      <div className="space-y-6">
        {/* Intake Motor RPM Control */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCw className="h-5 w-5" />
              Intake Motor RPM
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="intake-rpm">Target RPM (0-500)</Label>
              <div className="flex gap-2">
                <Input
                  id="intake-rpm"
                  type="number"
                  min="0"
                  max="500"
                  value={intakeMotorRpm}
                  onChange={(e) => setIntakeMotorRpm(Number(e.target.value))}
                  className="text-lg font-bold"
                />
                <Button onClick={handleSendIntakeRpm} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Slider
                value={[intakeMotorRpm]}
                onValueChange={(value) => setIntakeMotorRpm(value[0])}
                max={500}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 RPM</span>
                <span>250 RPM</span>
                <span>500 RPM</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 p-4 bg-muted/30 rounded-lg">
              <RotateCw
                className="h-8 w-8 text-primary animate-spin"
                style={{ animationDuration: intakeMotorRpm > 0 ? `${1000 / (intakeMotorRpm / 60)}ms` : '0s' }}
              />
              <span className="text-3xl font-bold tabular-nums">{intakeMotorRpm}</span>
              <span className="text-muted-foreground">RPM</span>
            </div>
          </CardContent>
        </Card>

        {/* Flick Servos Control */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Flick Servos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {/* Servo 1 */}
              <div className="flex flex-col items-center gap-3">
                <Label className="text-sm font-medium text-muted-foreground">Servo 1</Label>
                <div className={`relative w-20 h-32 rounded-lg border-2 transition-all ${
                  flickServo1 === 'up'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-red-500 bg-red-500/10'
                }`}>
                  <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                    flickServo1 === 'up' ? 'top-2' : 'bottom-2'
                  }`}>
                    {flickServo1 === 'up' ? (
                      <ChevronUp className="h-6 w-6 text-green-500" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={flickServo1 === 'up' ? 'default' : 'outline'}
                    onClick={() => {
                      setFlickServo1('up');
                      handleSendFlickServo(1, 'up');
                    }}
                  >
                    Up
                  </Button>
                  <Button
                    size="sm"
                    variant={flickServo1 === 'down' ? 'default' : 'outline'}
                    onClick={() => {
                      setFlickServo1('down');
                      handleSendFlickServo(1, 'down');
                    }}
                  >
                    Down
                  </Button>
                </div>
              </div>

              {/* Servo 2 */}
              <div className="flex flex-col items-center gap-3">
                <Label className="text-sm font-medium text-muted-foreground">Servo 2</Label>
                <div className={`relative w-20 h-32 rounded-lg border-2 transition-all ${
                  flickServo2 === 'up'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-red-500 bg-red-500/10'
                }`}>
                  <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                    flickServo2 === 'up' ? 'top-2' : 'bottom-2'
                  }`}>
                    {flickServo2 === 'up' ? (
                      <ChevronUp className="h-6 w-6 text-green-500" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={flickServo2 === 'up' ? 'default' : 'outline'}
                    onClick={() => {
                      setFlickServo2('up');
                      handleSendFlickServo(2, 'up');
                    }}
                  >
                    Up
                  </Button>
                  <Button
                    size="sm"
                    variant={flickServo2 === 'down' ? 'default' : 'outline'}
                    onClick={() => {
                      setFlickServo2('down');
                      handleSendFlickServo(2, 'down');
                    }}
                  >
                    Down
                  </Button>
                </div>
              </div>

              {/* Servo 3 */}
              <div className="flex flex-col items-center gap-3">
                <Label className="text-sm font-medium text-muted-foreground">Servo 3</Label>
                <div className={`relative w-20 h-32 rounded-lg border-2 transition-all ${
                  flickServo3 === 'up'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-red-500 bg-red-500/10'
                }`}>
                  <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                    flickServo3 === 'up' ? 'top-2' : 'bottom-2'
                  }`}>
                    {flickServo3 === 'up' ? (
                      <ChevronUp className="h-6 w-6 text-green-500" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={flickServo3 === 'up' ? 'default' : 'outline'}
                    onClick={() => {
                      setFlickServo3('up');
                      handleSendFlickServo(3, 'up');
                    }}
                  >
                    Up
                  </Button>
                  <Button
                    size="sm"
                    variant={flickServo3 === 'down' ? 'default' : 'outline'}
                    onClick={() => {
                      setFlickServo3('down');
                      handleSendFlickServo(3, 'down');
                    }}
                  >
                    Down
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Deposit Controls */}
      <div className="space-y-6">
        {/* Deposit Motor RPM Control */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCw className="h-5 w-5" />
              Deposit Motor RPM
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-rpm">Target RPM (0-600)</Label>
              <div className="flex gap-2">
                <Input
                  id="deposit-rpm"
                  type="number"
                  min="0"
                  max="600"
                  value={depositRpm}
                  onChange={(e) => setDepositRpm(Number(e.target.value))}
                  className="text-lg font-bold"
                />
                <Button onClick={handleSendDepositRpm} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Slider
                value={[depositRpm]}
                onValueChange={(value) => setDepositRpm(value[0])}
                max={600}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 RPM</span>
                <span>300 RPM</span>
                <span>600 RPM</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 p-4 bg-muted/30 rounded-lg">
              <RotateCw
                className="h-8 w-8 text-primary animate-spin"
                style={{ animationDuration: depositRpm > 0 ? `${1000 / (depositRpm / 60)}ms` : '0s' }}
              />
              <span className="text-3xl font-bold tabular-nums">{depositRpm}</span>
              <span className="text-muted-foreground">RPM</span>
            </div>
          </CardContent>
        </Card>

        {/* PID Controller Values */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Deposit PIDF Values
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* P Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label htmlFor="pid-p">P (Proportional)</Label>
                <span className="text-xl font-bold tabular-nums text-blue-500">{pidP.toFixed(4)}</span>
              </div>
              <Input
                id="pid-p"
                type="number"
                step="0.001"
                min="0"
                max="1"
                value={pidP}
                onChange={(e) => setPidP(Number(e.target.value))}
              />
              <Slider
                value={[pidP * 1000]}
                onValueChange={(value) => setPidP(value[0] / 1000)}
                max={100}
                step={1}
              />
            </div>

            {/* I Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label htmlFor="pid-i">I (Integral)</Label>
                <span className="text-xl font-bold tabular-nums text-green-500">{pidI.toFixed(4)}</span>
              </div>
              <Input
                id="pid-i"
                type="number"
                step="0.0001"
                min="0"
                max="0.1"
                value={pidI}
                onChange={(e) => setPidI(Number(e.target.value))}
              />
              <Slider
                value={[pidI * 10000]}
                onValueChange={(value) => setPidI(value[0] / 10000)}
                max={20}
                step={0.1}
              />
            </div>

            {/* D Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label htmlFor="pid-d">D (Derivative)</Label>
                <span className="text-xl font-bold tabular-nums text-purple-500">{pidD.toFixed(4)}</span>
              </div>
              <Input
                id="pid-d"
                type="number"
                step="0.0001"
                min="0"
                max="0.1"
                value={pidD}
                onChange={(e) => setPidD(Number(e.target.value))}
              />
              <Slider
                value={[pidD * 10000]}
                onValueChange={(value) => setPidD(value[0] / 10000)}
                max={40}
                step={0.1}
              />
            </div>

            {/* F Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label htmlFor="pid-f">F (Feedforward)</Label>
                <span className="text-xl font-bold tabular-nums text-orange-500">{pidF.toFixed(4)}</span>
              </div>
              <Input
                id="pid-f"
                type="number"
                step="0.001"
                min="0"
                max="1"
                value={pidF}
                onChange={(e) => setPidF(Number(e.target.value))}
              />
              <Slider
                value={[pidF * 1000]}
                onValueChange={(value) => setPidF(value[0] / 1000)}
                max={150}
                step={1}
              />
            </div>

            {/* Send PID Button */}
            <Button onClick={handleSendPID} className="w-full" size="lg">
              <Send className="h-4 w-4 mr-2" />
              Send PIDF Values
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
