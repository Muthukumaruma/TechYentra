import LegalPage from '../components/ui/LegalPage';
import content from '../content.json';

export default function TermsPage() {
  const { title, lastUpdated, intro, sections } = content.terms;
  return (
    <LegalPage
      title={title} lastUpdated={lastUpdated} intro={intro} sections={sections}
      clauses={['governingLaw', 'liability', 'ip', 'indemnification', 'modify', 'severability']}
    />
  );
}
