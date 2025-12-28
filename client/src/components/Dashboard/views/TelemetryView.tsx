import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/reducers';
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
  const dispatch = useDispatch();
  const socket = useSelector((state: RootState) => state.socket);
  const telemetry = useSelector((state: RootState) => state.telemetry);

  const handleSendIntakeRpm = () => {
    // Dispatch to Redux
    dispatch({
      type: 'SET_INTAKE_MOTOR_RPM',
      rpm: telemetry.intakeMotorRpm
    });

    // Send to robot via WebSocket
    if (socket.connection) {
      socket.connection.send(JSON.stringify({
        type: 'command',
        subsystem: 'intake',
        command: 'setRpm',
        value: telemetry.intakeMotorRpm
      }));
    }
  };

  const handleSendFlickServo = (servo: 1 | 2 | 3, position: 'up' | 'down') => {
    const servoKey = `servo${servo}` as 'servo1' | 'servo2' | 'servo3';

    // Dispatch to Redux
    dispatch({
      type: 'SET_FLICK_SERVO_POSITION',
      servo: servoKey,
      position: position
    });

    // Send to robot via WebSocket
    if (socket.connection) {
      socket.connection.send(JSON.stringify({
        type: 'command',
        subsystem: 'intake',
        command: 'setFlickServo',
        servo: servo,
        position: position
      }));
    }
  };

  const handleSendDepositRpm = () => {
    // Dispatch to Redux
    dispatch({
      type: 'SET_DEPOSIT_RPM',
      rpm: telemetry.depositRpm
    });

    // Send to robot via WebSocket
    if (socket.connection) {
      socket.connection.send(JSON.stringify({
        type: 'command',
        subsystem: 'deposit',
        command: 'setRpm',
        value: telemetry.depositRpm
      }));
    }
  };

  const handleSendPID = () => {
    // Dispatch to Redux
    dispatch({
      type: 'SET_DEPOSIT_PIDF',
      pidf: telemetry.depositPidf
    });

    // Send to robot via WebSocket
    if (socket.connection) {
      socket.connection.send(JSON.stringify({
        type: 'command',
        subsystem: 'deposit',
        command: 'setPidf',
        values: telemetry.depositPidf
      }));
    }
  };

  const updateIntakeRpm = (rpm: number) => {
    dispatch({
      type: 'SET_INTAKE_MOTOR_RPM',
      rpm: rpm
    });
  };

  const updateDepositRpm = (rpm: number) => {
    dispatch({
      type: 'SET_DEPOSIT_RPM',
      rpm: rpm
    });
  };

  const updatePidf = (key: 'p' | 'i' | 'd' | 'f', value: number) => {
    dispatch({
      type: 'SET_DEPOSIT_PIDF',
      pidf: {
        ...telemetry.depositPidf,
        [key]: value
      }
    });
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
                  value={telemetry.intakeMotorRpm}
                  onChange={(e) => updateIntakeRpm(Number(e.target.value))}
                  className="text-lg font-bold"
                />
                <Button onClick={handleSendIntakeRpm} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Slider
                value={[telemetry.intakeMotorRpm]}
                onValueChange={(value) => updateIntakeRpm(value[0])}
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
                style={{ animationDuration: telemetry.intakeMotorRpm > 0 ? `${1000 / (telemetry.intakeMotorRpm / 60)}ms` : '0s' }}
              />
              <span className="text-3xl font-bold tabular-nums">{telemetry.intakeMotorRpm}</span>
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
                  telemetry.flickServos.servo1 === 'up'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-red-500 bg-red-500/10'
                }`}>
                  <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                    telemetry.flickServos.servo1 === 'up' ? 'top-2' : 'bottom-2'
                  }`}>
                    {telemetry.flickServos.servo1 === 'up' ? (
                      <ChevronUp className="h-6 w-6 text-green-500" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={telemetry.flickServos.servo1 === 'up' ? 'default' : 'outline'}
                    onClick={() => handleSendFlickServo(1, 'up')}
                  >
                    Up
                  </Button>
                  <Button
                    size="sm"
                    variant={telemetry.flickServos.servo1 === 'down' ? 'default' : 'outline'}
                    onClick={() => handleSendFlickServo(1, 'down')}
                  >
                    Down
                  </Button>
                </div>
              </div>

              {/* Servo 2 */}
              <div className="flex flex-col items-center gap-3">
                <Label className="text-sm font-medium text-muted-foreground">Servo 2</Label>
                <div className={`relative w-20 h-32 rounded-lg border-2 transition-all ${
                  telemetry.flickServos.servo2 === 'up'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-red-500 bg-red-500/10'
                }`}>
                  <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                    telemetry.flickServos.servo2 === 'up' ? 'top-2' : 'bottom-2'
                  }`}>
                    {telemetry.flickServos.servo2 === 'up' ? (
                      <ChevronUp className="h-6 w-6 text-green-500" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={telemetry.flickServos.servo2 === 'up' ? 'default' : 'outline'}
                    onClick={() => handleSendFlickServo(2, 'up')}
                  >
                    Up
                  </Button>
                  <Button
                    size="sm"
                    variant={telemetry.flickServos.servo2 === 'down' ? 'default' : 'outline'}
                    onClick={() => handleSendFlickServo(2, 'down')}
                  >
                    Down
                  </Button>
                </div>
              </div>

              {/* Servo 3 */}
              <div className="flex flex-col items-center gap-3">
                <Label className="text-sm font-medium text-muted-foreground">Servo 3</Label>
                <div className={`relative w-20 h-32 rounded-lg border-2 transition-all ${
                  telemetry.flickServos.servo3 === 'up'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-red-500 bg-red-500/10'
                }`}>
                  <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                    telemetry.flickServos.servo3 === 'up' ? 'top-2' : 'bottom-2'
                  }`}>
                    {telemetry.flickServos.servo3 === 'up' ? (
                      <ChevronUp className="h-6 w-6 text-green-500" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={telemetry.flickServos.servo3 === 'up' ? 'default' : 'outline'}
                    onClick={() => handleSendFlickServo(3, 'up')}
                  >
                    Up
                  </Button>
                  <Button
                    size="sm"
                    variant={telemetry.flickServos.servo3 === 'down' ? 'default' : 'outline'}
                    onClick={() => handleSendFlickServo(3, 'down')}
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
                  value={telemetry.depositRpm}
                  onChange={(e) => updateDepositRpm(Number(e.target.value))}
                  className="text-lg font-bold"
                />
                <Button onClick={handleSendDepositRpm} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Slider
                value={[telemetry.depositRpm]}
                onValueChange={(value) => updateDepositRpm(value[0])}
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
                style={{ animationDuration: telemetry.depositRpm > 0 ? `${1000 / (telemetry.depositRpm / 60)}ms` : '0s' }}
              />
              <span className="text-3xl font-bold tabular-nums">{telemetry.depositRpm}</span>
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
                <span className="text-xl font-bold tabular-nums text-blue-500">{telemetry.depositPidf.p.toFixed(4)}</span>
              </div>
              <Input
                id="pid-p"
                type="number"
                step="0.001"
                min="0"
                max="1"
                value={telemetry.depositPidf.p}
                onChange={(e) => updatePidf('p', Number(e.target.value))}
              />
              <Slider
                value={[telemetry.depositPidf.p * 1000]}
                onValueChange={(value) => updatePidf('p', value[0] / 1000)}
                max={100}
                step={1}
              />
            </div>

            {/* I Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label htmlFor="pid-i">I (Integral)</Label>
                <span className="text-xl font-bold tabular-nums text-green-500">{telemetry.depositPidf.i.toFixed(4)}</span>
              </div>
              <Input
                id="pid-i"
                type="number"
                step="0.0001"
                min="0"
                max="0.1"
                value={telemetry.depositPidf.i}
                onChange={(e) => updatePidf('i', Number(e.target.value))}
              />
              <Slider
                value={[telemetry.depositPidf.i * 10000]}
                onValueChange={(value) => updatePidf('i', value[0] / 10000)}
                max={20}
                step={0.1}
              />
            </div>

            {/* D Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label htmlFor="pid-d">D (Derivative)</Label>
                <span className="text-xl font-bold tabular-nums text-purple-500">{telemetry.depositPidf.d.toFixed(4)}</span>
              </div>
              <Input
                id="pid-d"
                type="number"
                step="0.0001"
                min="0"
                max="0.1"
                value={telemetry.depositPidf.d}
                onChange={(e) => updatePidf('d', Number(e.target.value))}
              />
              <Slider
                value={[telemetry.depositPidf.d * 10000]}
                onValueChange={(value) => updatePidf('d', value[0] / 10000)}
                max={40}
                step={0.1}
              />
            </div>

            {/* F Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label htmlFor="pid-f">F (Feedforward)</Label>
                <span className="text-xl font-bold tabular-nums text-orange-500">{telemetry.depositPidf.f.toFixed(4)}</span>
              </div>
              <Input
                id="pid-f"
                type="number"
                step="0.001"
                min="0"
                max="1"
                value={telemetry.depositPidf.f}
                onChange={(e) => updatePidf('f', Number(e.target.value))}
              />
              <Slider
                value={[telemetry.depositPidf.f * 1000]}
                onValueChange={(value) => updatePidf('f', value[0] / 1000)}
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
