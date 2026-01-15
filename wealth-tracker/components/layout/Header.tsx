// components/layout/Header.tsx
'use client';

import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { data: session } = useSession();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 backdrop-blur">
      <div>
        <h2 className="text-lg font-semibold text-white">
          Bienvenido, {session?.user?.name}
        </h2>
        <p className="text-sm text-slate-400">
          {new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notificaciones */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-slate-400" />
          <span className="absolute right-1 top-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
        </Button>

        {/* Avatar */}
        <Avatar className="h-9 w-9 border-2 border-slate-700">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
            {session?.user?.name ? getInitials(session.user.name) : 'U'}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}