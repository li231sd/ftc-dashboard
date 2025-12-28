// Camera reducer for image and telemetry data
export interface CameraState {
  imageStr: string;
  resolution: string;
  fps: number;
  objectsDetected: number;
  processingMs: number;
  mode: 'apriltag' | 'color-detection' | 'none';
}

const initialState: CameraState = {
  imageStr: '',
  resolution: '1920x1080',
  fps: 0,
  objectsDetected: 0,
  processingMs: 0,
  mode: 'none',
};

export const RECEIVE_IMAGE = 'RECEIVE_IMAGE';
export const UPDATE_CAMERA_DATA = 'UPDATE_CAMERA_DATA';
export const SET_CAMERA_MODE = 'SET_CAMERA_MODE';
export const UPDATE_CAMERA_FPS = 'UPDATE_CAMERA_FPS';

interface ReceiveImageAction {
  type: typeof RECEIVE_IMAGE;
  imageString: string;
}

interface UpdateCameraDataAction {
  type: typeof UPDATE_CAMERA_DATA;
  payload: Partial<CameraState>;
}

interface SetCameraModeAction {
  type: typeof SET_CAMERA_MODE;
  mode: 'apriltag' | 'color-detection' | 'none';
}

interface UpdateCameraFpsAction {
  type: typeof UPDATE_CAMERA_FPS;
  fps: number;
}

type CameraAction = 
  | ReceiveImageAction 
  | UpdateCameraDataAction 
  | SetCameraModeAction
  | UpdateCameraFpsAction;

const cameraReducer = (
  state: CameraState = initialState,
  action: CameraAction,
): CameraState => {
  switch (action.type) {
    case RECEIVE_IMAGE:
      return {
        ...state,
        imageStr: action.imageString,
      };
    
    case UPDATE_CAMERA_DATA:
      return {
        ...state,
        ...action.payload,
      };
    
    case SET_CAMERA_MODE:
      return {
        ...state,
        mode: action.mode,
      };
    
    case UPDATE_CAMERA_FPS:
      return {
        ...state,
        fps: action.fps,
      };
    
    default:
      return state;
  }
};

export default cameraReducer;
