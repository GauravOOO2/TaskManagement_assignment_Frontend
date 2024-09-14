import 'tailwindcss/tailwind.css';

export const metadata = {
  title: 'Task Manager',
  description: 'A simple task manager application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {children}
      </body>
    </html>
  );
}
