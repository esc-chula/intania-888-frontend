"use client";
import { Settings as SettingsIcon, Coins, Info } from "lucide-react";

export default function SettingsPage() {

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Configure system settings and rewards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Coins className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-white">Daily Reward</h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border border-yellow-700/50 rounded-lg text-center">
              <p className="text-4xl font-bold text-yellow-400 mb-2">300 ₿</p>
              <p className="text-sm text-gray-300">Fixed Daily Check-in Reward</p>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-300">
                <p className="font-medium text-blue-300 mb-1">Hardcoded in Backend</p>
                <p>This reward amount is set in the backend code and cannot be changed through the admin panel. To modify it, update the backend source code.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <SettingsIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-white">System Information</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Platform</p>
              <p className="text-white font-medium">Intania 888 Betting System</p>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Version</p>
              <p className="text-white font-medium">1.0.0</p>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Environment</p>
              <p className="text-white font-medium">Production</p>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Last Updated</p>
              <p className="text-white font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Slot Machine Settings</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Bet Amount</p>
            <p className="text-2xl font-bold text-white">50 ₿</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Bet Amount</p>
            <p className="text-2xl font-bold text-white">100 ₿</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Bet Amount</p>
            <p className="text-2xl font-bold text-white">500 ₿</p>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Slot machine betting amounts are configured in the backend
        </p>
      </div>
    </div>
  );
}
