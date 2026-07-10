import LegalPage from '../components/ui/LegalPage';
import content from '../content.json';

export default function AcceptableUsePage() {
  const { title, lastUpdated, intro, sections } = content.acceptableUse;
  return (
    <LegalPage
      title={title} lastUpdated={lastUpdated} intro={intro} sections={sections}
      clauses={['governingLaw', 'liability', 'modify', 'severability']}
    />
  );
}
