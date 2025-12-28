// Intake reducer for intake motor and servo data

export interface IntakeState {
  rpm: number;
  flickServos: {
    servo1: 'up' | 'down';
    servo2: 'up' | 'down';
    servo3: 'up' | 'down';
  };
  ballHolders: {
    pos1: 'green' | 'purple' | 'empty';
    pos2: 'green' | 'purple' | 'empty';
    pos3: 'green' | 'purple' | 'empty';
  };
}

const initialState: IntakeState = {
  rpm: 0,
  flickServos: {
    servo1: 'down',
    servo2: 'down',
    servo3: 'down',
  },
  ballHolders: {
    pos1: 'empty',
    pos2: 'empty',
    pos3: 'empty',
  },
};

export const UPDATE_INTAKE_DATA = 'UPDATE_INTAKE_DATA';
export const SET_INTAKE_RPM = 'SET_INTAKE_RPM';
export const SET_FLICK_SERVO = 'SET_FLICK_SERVO';
export const SET_BALL_HOLDER = 'SET_BALL_HOLDER';

interface UpdateIntakeDataAction {
  type: typeof UPDATE_INTAKE_DATA;
  payload: Partial<IntakeState>;
}

interface SetIntakeRpmAction {
  type: typeof SET_INTAKE_RPM;
  rpm: number;
}

interface SetFlickServoAction {
  type: typeof SET_FLICK_SERVO;
  servo: 'servo1' | 'servo2' | 'servo3';
  position: 'up' | 'down';
}

interface SetBallHolderAction {
  type: typeof SET_BALL_HOLDER;
  position: 'pos1' | 'pos2' | 'pos3';
  color: 'green' | 'purple' | 'empty';
}

type IntakeAction =
  | UpdateIntakeDataAction
  | SetIntakeRpmAction
  | SetFlickServoAction
  | SetBallHolderAction;

const intakeReducer = (
  state: IntakeState = initialState,
  action: IntakeAction,
): IntakeState => {
  switch (action.type) {
    case UPDATE_INTAKE_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case SET_INTAKE_RPM:
      return {
        ...state,
        rpm: action.rpm,
      };

    case SET_FLICK_SERVO:
      return {
        ...state,
        flickServos: {
          ...state.flickServos,
          [action.servo]: action.position,
        },
      };

    case SET_BALL_HOLDER:
      return {
        ...state,
        ballHolders: {
          ...state.ballHolders,
          [action.position]: action.color,
        },
      };

    default:
      return state;
  }
};

export default intakeReducer;
