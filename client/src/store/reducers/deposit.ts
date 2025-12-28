// Deposit reducer for deposit motor and control data

export interface DepositState {
  motorRpm: number;
  pidfValues: {
    p: number;
    i: number;
    d: number;
    f: number;
  };
  robotPosition: {
    x: number;
    y: number;
    heading: number;
  };
  distanceToGoal: number;
  allianceColor: 'red' | 'blue';
}

const initialState: DepositState = {
  motorRpm: 0,
  pidfValues: {
    p: 0.05,
    i: 0.001,
    d: 0.002,
    f: 0.1,
  },
  robotPosition: {
    x: 0,
    y: 0,
    heading: 0,
  },
  distanceToGoal: 0,
  allianceColor: 'blue',
};

export const UPDATE_DEPOSIT_DATA = 'UPDATE_DEPOSIT_DATA';
export const SET_DEPOSIT_RPM = 'SET_DEPOSIT_RPM';
export const SET_PIDF_VALUES = 'SET_PIDF_VALUES';
export const SET_ROBOT_POSITION = 'SET_ROBOT_POSITION';
export const SET_DISTANCE_TO_GOAL = 'SET_DISTANCE_TO_GOAL';
export const SET_ALLIANCE_COLOR = 'SET_ALLIANCE_COLOR';

interface UpdateDepositDataAction {
  type: typeof UPDATE_DEPOSIT_DATA;
  payload: Partial<DepositState>;
}

interface SetDepositRpmAction {
  type: typeof SET_DEPOSIT_RPM;
  rpm: number;
}

interface SetPidfValuesAction {
  type: typeof SET_PIDF_VALUES;
  pidfValues: {
    p: number;
    i: number;
    d: number;
    f: number;
  };
}

interface SetRobotPositionAction {
  type: typeof SET_ROBOT_POSITION;
  position: {
    x: number;
    y: number;
    heading: number;
  };
}

interface SetDistanceToGoalAction {
  type: typeof SET_DISTANCE_TO_GOAL;
  distance: number;
}

interface SetAllianceColorAction {
  type: typeof SET_ALLIANCE_COLOR;
  color: 'red' | 'blue';
}

type DepositAction =
  | UpdateDepositDataAction
  | SetDepositRpmAction
  | SetPidfValuesAction
  | SetRobotPositionAction
  | SetDistanceToGoalAction
  | SetAllianceColorAction;

const depositReducer = (
  state: DepositState = initialState,
  action: DepositAction,
): DepositState => {
  switch (action.type) {
    case UPDATE_DEPOSIT_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case SET_DEPOSIT_RPM:
      return {
        ...state,
        motorRpm: action.rpm,
      };

    case SET_PIDF_VALUES:
      return {
        ...state,
        pidfValues: action.pidfValues,
      };

    case SET_ROBOT_POSITION:
      return {
        ...state,
        robotPosition: action.position,
      };

    case SET_DISTANCE_TO_GOAL:
      return {
        ...state,
        distanceToGoal: action.distance,
      };

    case SET_ALLIANCE_COLOR:
      return {
        ...state,
        allianceColor: action.color,
      };

    default:
      return state;
  }
};

export default depositReducer;
