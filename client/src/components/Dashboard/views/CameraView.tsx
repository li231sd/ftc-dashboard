import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, VideoOff, Eye, Activity } from "lucide-react";

export default function CameraView() {
  // Get data from Redux instead of local state
  const cameraData = useSelector((state: RootState) => state.camera);

  const getModeColor = () => {
    switch (cameraData.mode) {
      case 'apriltag':
        return 'bg-blue-500/10 text-blue-500 border-blue-500';
      case 'color-detection':
        return 'bg-purple-500/10 text-purple-500 border-purple-500';
      case 'none':
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getModeLabel = () => {
    switch (cameraData.mode) {
      case 'apriltag':
        return 'AprilTag Mode';
      case 'color-detection':
        return 'Color Detection Mode';
      case 'none':
        return 'No Mode Active';
    }
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Camera Feed - Takes up 2 columns */}
      <Card className="lg:col-span-2 flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Camera Feed
            </CardTitle>
            <div className={`px-3 py-1 rounded-full border font-semibold text-sm ${getModeColor()}`}>
              {getModeLabel()}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {/* Video Display Area */}
          <div className="flex-1 bg-black rounded-lg flex items-center justify-center relative min-h-[400px]">
            {/* Camera Image or Placeholder */}
            {cameraData.imageStr ? (
              <img
                src={`data:image/jpeg;base64,${cameraData.imageStr}`}
                alt="Camera Feed"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <VideoOff className="h-16 w-16" />
                <div className="text-xl font-semibold">No Video Available</div>
                <div className="text-sm">Camera feed will appear here</div>
              </div>
            )}

            {/* Live Indicator */}
            {cameraData.imageStr && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-bold">LIVE</span>
              </div>
            )}

            {/* Resolution Overlay */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-white text-sm font-mono">
              {cameraData.resolution}
            </div>

            {/* FPS Counter */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded">
              <div className="text-white text-xs">FPS</div>
              <div className="text-white text-2xl font-bold tabular-nums">{cameraData.fps}</div>
            </div>

            {/* Objects Detected Counter */}
            {cameraData.mode !== 'none' && (
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded">
                <div className="text-white text-xs">Objects Detected</div>
                <div className="text-white text-2xl font-bold tabular-nums">{cameraData.objectsDetected}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Camera Stats */}
      <div className="space-y-4">
        {/* Resolution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Eye className="h-4 w-4" />
              Resolution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums">{cameraData.resolution}</div>
            <div className="text-sm text-muted-foreground mt-1">pixels</div>
          </CardContent>
        </Card>

        {/* FPS */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4" />
              Frame Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums">{cameraData.fps}</div>
            <div className="text-sm text-muted-foreground mt-1">frames per second</div>

            {/* FPS Bar */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>15</span>
                <span>30</span>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full transition-all duration-300 ${
                    cameraData.fps >= 25
                      ? 'bg-green-500'
                      : cameraData.fps >= 15
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${(cameraData.fps / 30) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Objects Detected */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Eye className="h-4 w-4" />
              Objects Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums">{cameraData.objectsDetected}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {cameraData.mode === 'apriltag' && 'AprilTags visible'}
              {cameraData.mode === 'color-detection' && 'Color objects found'}
              {cameraData.mode === 'none' && 'Detection inactive'}
            </div>
          </CardContent>
        </Card>

        {/* Processing Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4" />
              Processing Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums">{cameraData.processingMs}</div>
            <div className="text-sm text-muted-foreground mt-1">milliseconds</div>

            {/* Processing Time Bar */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Fast</span>
                <span>Slow</span>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full transition-all duration-300 ${
                    cameraData.processingMs <= 20
                      ? 'bg-green-500'
                      : cameraData.processingMs <= 35
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${(cameraData.processingMs / 50) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detection Mode Card */}
        <Card className={`border-2 ${getModeColor()}`}>
          <CardHeader>
            <CardTitle className="text-base">Detection Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className={`flex items-center gap-2 p-2 rounded ${
                cameraData.mode === 'apriltag' ? 'bg-blue-500/20' : ''
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  cameraData.mode === 'apriltag' ? 'bg-blue-500' : 'bg-muted'
                }`}></div>
                <span className="text-sm font-medium">AprilTag</span>
              </div>

              <div className={`flex items-center gap-2 p-2 rounded ${
                cameraData.mode === 'color-detection' ? 'bg-purple-500/20' : ''
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  cameraData.mode === 'color-detection' ? 'bg-purple-500' : 'bg-muted'
                }`}></div>
                <span className="text-sm font-medium">Color Detection</span>
              </div>

              <div className={`flex items-center gap-2 p-2 rounded ${
                cameraData.mode === 'none' ? 'bg-muted/50' : ''
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  cameraData.mode === 'none' ? 'bg-muted-foreground' : 'bg-muted'
                }`}></div>
                <span className="text-sm font-medium">None</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
