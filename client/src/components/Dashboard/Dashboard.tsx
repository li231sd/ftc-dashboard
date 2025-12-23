import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LayoutPreset, { LayoutPresetType } from '@/enums/LayoutPreset';
import { saveLayoutPreset, getLayoutPreset } from '@/store/actions/settings';
import { RootState } from '@/store/reducers';
import { startSocketWatcher } from '@/store/middleware/socketMiddleware';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Activity,
  Battery,
  Wifi,
  WifiOff,
  Menu,
  Zap
} from "lucide-react";
import SettingsModal from './SettingsModal';

// Import view components
import DrivetrainView from './views/DrivetrainView';
import IntakeView from './views/IntakeView';
import CameraView from './views/CameraView';
import DepositView from './views/DepositView';
import TelemetryView from './views/TelemetryView';

export default function Dashboard() {
  const socket = useSelector((state: RootState) => state.socket);
  const layoutPreset = useSelector((state: RootState) => state.settings.layoutPreset);
  const enabled = useSelector((state: RootState) => state.status.enabled);
  const batteryVoltage = useSelector((state: RootState) => state.status.batteryVoltage);
  const dispatch = useDispatch();

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    dispatch(getLayoutPreset());
    startSocketWatcher(dispatch);
  }, [dispatch]);

  // Get all available layout presets
  const layoutPresets = [
    { id: 'DRIVETRAIN' as LayoutPresetType, name: 'Drivetrain' },
    { id: 'INTAKE' as LayoutPresetType, name: 'Intake' },
    { id: 'CAMERA' as LayoutPresetType, name: 'Camera' },
    { id: 'DEPOSIT' as LayoutPresetType, name: 'Deposit' },
    { id: 'TELEMETRY' as LayoutPresetType, name: 'Telemetry' },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <Sidebar collapsible="none" className={sidebarOpen ? '' : 'hidden'}>
        <SidebarContent>
            {/* FTC Dashboard Header */}
            <div className="flex items-center gap-2 px-4 py-4 border-b">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-primary-foreground">
                <Zap className="h-4 w-4 text-yellow-500" />
              </div>
              <span className="font-semibold group-data-[collapsible=icon]:hidden">Voltage Vanguard</span>
            </div>

            {/* Layout Presets */}
            <SidebarGroup>
              <SidebarGroupLabel>Layout Presets</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {layoutPresets.map((preset) => (
                    <SidebarMenuItem key={preset.id}>
                      <SidebarMenuButton
                        onClick={() => dispatch(saveLayoutPreset(preset.id))}
                        isActive={layoutPreset === preset.id}
                        tooltip={preset.name}
                      >
                        <div className="flex h-4 w-4 items-center justify-center rounded bg-primary/10 text-primary text-xs font-bold">
                          {preset.name.charAt(0)}
                        </div>
                        <span>{preset.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>


      {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="border-b bg-card px-6 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold tracking-tight text-foreground">FTC Dashboard</h1>
              <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${socket.isConnected ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {socket.isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>

            <Button variant="ghost" size="icon" onClick={() => setIsSettingsModalOpen(true)}>
              <Settings className="h-5 w-5" />
            </Button>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6 space-y-6 overflow-auto min-h-0">
            {/* Quick Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Battery Voltage</CardTitle>
                  <Battery className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {batteryVoltage > 0 ? `${batteryVoltage.toFixed(2)}V` : "---"}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Latency (Ping)</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{socket.isConnected ? `${socket.pingTime}ms` : "N/A"}</div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Connection</CardTitle>
                  {socket.isConnected ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{socket.isConnected ? "Active" : "Offline"}</div>
                </CardContent>
              </Card>
            </div>

            {/* Your Custom Content Area */}
            <div className="w-full flex-1 min-h-0">
              {socket.isConnected && !enabled ? (
                <Card className="flex flex-col items-center justify-center h-64 p-10">
                  <h2 className="text-xl font-semibold text-foreground">Dashboard is Disabled</h2>
                  <p className="text-sm text-muted-foreground">Enable via the RC menu or an Op Mode.</p>
                </Card>
              ) : (
                <div className="h-full">
                  {layoutPreset === 'DRIVETRAIN' && <DrivetrainView />}
                  {layoutPreset === 'INTAKE' && <IntakeView />}
                  {layoutPreset === 'CAMERA' && <CameraView />}
                  {layoutPreset === 'DEPOSIT' && <DepositView />}
                  {layoutPreset === 'TELEMETRY' && <TelemetryView />}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
    </SidebarProvider>
  );
}
