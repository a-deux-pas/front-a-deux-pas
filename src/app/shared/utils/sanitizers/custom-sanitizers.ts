export function escapeHtml(str: string): string {
  if (!str) {
    return '';
  }
  return str.replace(/&/g, '&amp;') // Replace all & characters with &amp; (HTML entity for &)
            .replace(/</g, '&lt;')  // Replace all < characters with &lt; (HTML entity for <)
            .replace(/>/g, '&gt;')  // Replace all > characters with &gt; (HTML entity for >)
            .replace(/"/g, '&quot;') // Replace all " characters with &quot; (HTML entity for ")
            .replace(/'/g, '&#39;'); // Replace all ' characters with &#39; (HTML entity for ')
}

export function formatText(input: string): string {
  const trimmedInput = input.trim();
  // Capitalize the first letter and convert the rest to lowercase
  const formattedText = trimmedInput.charAt(0).toUpperCase() + trimmedInput.slice(1).toLowerCase();
  return formattedText;
}
