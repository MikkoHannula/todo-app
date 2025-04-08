import './styles.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>TODO App</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}