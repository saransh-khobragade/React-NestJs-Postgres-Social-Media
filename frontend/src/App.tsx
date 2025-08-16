import './App.css';
import type { ReactElement } from 'react';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { HomePage } from '@/pages/HomePage';
import { BlogDetailPage } from '@/pages/BlogDetailPage';
import { WritePage } from '@/pages/WritePage';
import { AuthPage } from '@/pages/AuthPage';
import { ChatPage } from '@/pages/ChatPage';
import { FeedPage } from '@/pages/FeedPage';
import { UploadPage } from '@/pages/UploadPage';
import { ProfilePage } from '@/pages/ProfilePage';

function Router(): ReactElement {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/auth') return <AuthPage />;
  if (path === '/chat') return <ChatPage />;
  if (path === '/insta') return <FeedPage />;
  if (path === '/insta/upload') return <UploadPage />;
  if (path === '/insta/profile') return <ProfilePage />;
  if (path === '/write') return <WritePage />;
  if (path.startsWith('/blogs/')) return <BlogDetailPage />;
  return <HomePage />;
}

function App(): ReactElement {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AuthProvider>
        <div className='min-h-screen bg-background'>
          <Router />
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
