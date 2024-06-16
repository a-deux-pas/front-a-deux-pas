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
