// Drivetrain reducer for robot position and movement data

export interface Position {
  x: number;
  y: number;
  heading: number;
}

export interface DrivetrainState {
  position: Position;
  velocity: number;
  acceleration: number;
  centerOfGravity: { x: number; y: number };
  pathHistory: Position[];
}

const initialState: DrivetrainState = {
  position: {
    x: 0,
    y: 0,
    heading: 0,
  },
  velocity: 0,
  acceleration: 0,
  centerOfGravity: {
    x: 0,
    y: 0,
  },
  pathHistory: [],
};

export const UPDATE_DRIVETRAIN_DATA = 'UPDATE_DRIVETRAIN_DATA';
export const ADD_PATH_POINT = 'ADD_PATH_POINT';
export const CLEAR_PATH_HISTORY = 'CLEAR_PATH_HISTORY';

interface UpdateDrivetrainDataAction {
  type: typeof UPDATE_DRIVETRAIN_DATA;
  payload: Partial<DrivetrainState>;
}

interface AddPathPointAction {
  type: typeof ADD_PATH_POINT;
  position: Position;
}

interface ClearPathHistoryAction {
  type: typeof CLEAR_PATH_HISTORY;
}

type DrivetrainAction =
  | UpdateDrivetrainDataAction
  | AddPathPointAction
  | ClearPathHistoryAction;

const drivetrainReducer = (
  state: DrivetrainState = initialState,
  action: DrivetrainAction,
): DrivetrainState => {
  switch (action.type) {
    case UPDATE_DRIVETRAIN_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case ADD_PATH_POINT:
      // Add new position to path history, keep last 200 points
      const newHistory = [...state.pathHistory, action.position].slice(-200);
      return {
        ...state,
        pathHistory: newHistory,
      };

    case CLEAR_PATH_HISTORY:
      return {
        ...state,
        pathHistory: [],
      };

    default:
      return state;
  }
};

export default drivetrainReducer;
