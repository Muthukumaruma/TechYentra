import LegalPage from '../components/ui/LegalPage';
import content from '../content.json';

export default function SLAPage() {
  const { title, lastUpdated, intro, sections } = content.sla;
  return (
    <LegalPage
      title={title} lastUpdated={lastUpdated} intro={intro} sections={sections}
      clauses={['liability', 'modify', 'severability']}
    />
  );
}
