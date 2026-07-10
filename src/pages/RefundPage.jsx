import LegalPage from '../components/ui/LegalPage';
import content from '../content.json';

export default function RefundPage() {
  const { title, lastUpdated, intro, sections } = content.refund;
  return (
    <LegalPage
      title={title} lastUpdated={lastUpdated} intro={intro} sections={sections}
      clauses={['governingLaw', 'modify', 'severability']}
    />
  );
}
