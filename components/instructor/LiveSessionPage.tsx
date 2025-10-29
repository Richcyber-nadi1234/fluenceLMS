import React, { useState, useEffect, useRef } from 'react';
import type { DashboardStudent } from '../../types';
import { UserCircleIcon, VideoCameraIcon, VideoCameraSlashIcon, MicrophoneIcon, MicrophoneSlashIcon, PhoneXMarkIcon, UsersIcon } from '../icons';

interface LiveSessionPageProps {
  students: DashboardStudent[];
  onEndSession: () => void;
}

export const LiveSessionPage: React.FC<LiveSessionPageProps> = ({ students, onEndSession }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setError("Could not access camera and microphone. Please check your browser permissions.");
      }
    };

    startStream();

    return () => {
      // Cleanup: stop all tracks when the component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const ControlButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className = '' }) => (
    <button
      onClick={onClick}
      className={`w-14 h-14 flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-white ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-neutral-900 text-white flex flex-col">
      {/* Main Content: Video Feed + Student List */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main video area */}
        <main className="flex-1 relative flex items-center justify-center bg-black">
          {error ? (
            <div className="text-center p-8">
                <h2 className="text-xl font-semibold text-red-400">Error</h2>
                <p className="mt-2 text-neutral-300">{error}</p>
            </div>
          ) : (
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          )}
           <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-md text-sm font-bold flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                LIVE
            </div>
        </main>

        {/* Student list sidebar */}
        <aside className="w-80 bg-neutral-800/50 backdrop-blur-sm border-l border-neutral-700 flex flex-col">
          <div className="p-4 border-b border-neutral-700">
            <h2 className="text-lg font-semibold flex items-center gap-2">
                <UsersIcon className="w-6 h-6" />
                Participants ({students.length})
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {students.map(student => (
              <div key={student.id} className="flex items-center gap-3">
                <UserCircleIcon className="w-8 h-8 text-neutral-400" />
                <span className="font-medium">{student.name}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Control Bar */}
      <footer className="bg-neutral-800/80 backdrop-blur-sm p-4 flex justify-center items-center">
        <div className="flex items-center gap-4">
          <ControlButton onClick={toggleMute} className={isMuted ? 'bg-red-600' : 'bg-neutral-600 hover:bg-neutral-500'}>
            {isMuted ? <MicrophoneSlashIcon className="w-7 h-7" /> : <MicrophoneIcon className="w-7 h-7" />}
          </ControlButton>
          <ControlButton onClick={toggleVideo} className={isVideoOff ? 'bg-red-600' : 'bg-neutral-600 hover:bg-neutral-500'}>
            {isVideoOff ? <VideoCameraSlashIcon className="w-7 h-7" /> : <VideoCameraIcon className="w-7 h-7" />}
          </ControlButton>
          <ControlButton onClick={onEndSession} className="bg-red-600 hover:bg-red-500">
            <PhoneXMarkIcon className="w-7 h-7" />
          </ControlButton>
        </div>
      </footer>
    </div>
  );
};