"use client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900">
        {/* No Header, No Footer */}
        {children}
      </body>
    </html>
  );
}
