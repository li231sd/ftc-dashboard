// Telemetry reducer for manual control values
// Used by TelemetryView to set and send commands to the robot

export interface TelemetryState {
  // Intake controls
  intakeMotorRpm: number;
  flickServos: {
    servo1: 'up' | 'down';
    servo2: 'up' | 'down';
    servo3: 'up' | 'down';
  };

  // Deposit controls
  depositRpm: number;
  depositPidf: {
    p: number;
    i: number;
    d: number;
    f: number;
  };
}

const initialState: TelemetryState = {
  intakeMotorRpm: 0,
  flickServos: {
    servo1: 'down',
    servo2: 'down',
    servo3: 'down',
  },
  depositRpm: 0,
  depositPidf: {
    p: 0.06,
    i: 0.001,
    d: 0.003,
    f: 0.1,
  },
};

export const SET_INTAKE_MOTOR_RPM = 'SET_INTAKE_MOTOR_RPM';
export const SET_FLICK_SERVO_POSITION = 'SET_FLICK_SERVO_POSITION';
export const SET_DEPOSIT_RPM = 'SET_DEPOSIT_RPM';
export const SET_DEPOSIT_PIDF = 'SET_DEPOSIT_PIDF';
export const UPDATE_TELEMETRY_DATA = 'UPDATE_TELEMETRY_DATA';

interface SetIntakeMotorRpmAction {
  type: typeof SET_INTAKE_MOTOR_RPM;
  rpm: number;
}

interface SetFlickServoPositionAction {
  type: typeof SET_FLICK_SERVO_POSITION;
  servo: 'servo1' | 'servo2' | 'servo3';
  position: 'up' | 'down';
}

interface SetDepositRpmAction {
  type: typeof SET_DEPOSIT_RPM;
  rpm: number;
}

interface SetDepositPidfAction {
  type: typeof SET_DEPOSIT_PIDF;
  pidf: {
    p: number;
    i: number;
    d: number;
    f: number;
  };
}

interface UpdateTelemetryDataAction {
  type: typeof UPDATE_TELEMETRY_DATA;
  payload: Partial<TelemetryState>;
}

type TelemetryAction =
  | SetIntakeMotorRpmAction
  | SetFlickServoPositionAction
  | SetDepositRpmAction
  | SetDepositPidfAction
  | UpdateTelemetryDataAction;

const telemetryReducer = (
  state: TelemetryState = initialState,
  action: TelemetryAction,
): TelemetryState => {
  switch (action.type) {
    case SET_INTAKE_MOTOR_RPM:
      return {
        ...state,
        intakeMotorRpm: action.rpm,
      };

    case SET_FLICK_SERVO_POSITION:
      return {
        ...state,
        flickServos: {
          ...state.flickServos,
          [action.servo]: action.position,
        },
      };

    case SET_DEPOSIT_RPM:
      return {
        ...state,
        depositRpm: action.rpm,
      };

    case SET_DEPOSIT_PIDF:
      return {
        ...state,
        depositPidf: action.pidf,
      };

    case UPDATE_TELEMETRY_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default telemetryReducer;
