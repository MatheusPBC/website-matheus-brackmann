export function ThemeScript() {
  const script = `
    (() => {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', stored ? stored === 'dark' : prefersDark);
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
