import LegalPage from '../components/ui/LegalPage';
import content from '../content.json';

export default function SecurityPage() {
  const { title, lastUpdated, intro, sections } = content.security;
  return <LegalPage title={title} lastUpdated={lastUpdated} intro={intro} sections={sections} />;
}
