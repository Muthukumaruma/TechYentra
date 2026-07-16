const HOST = 'www.techyenthra.com';
const KEY = 'd9e0b298d89a4073b871fff86714597d';

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/services`,
  `https://${HOST}/projects`,
  `https://${HOST}/contact`,
  `https://${HOST}/legal`,
  `https://${HOST}/privacy`,
  `https://${HOST}/terms`,
  `https://${HOST}/cookies`,
  `https://${HOST}/refund`,
  `https://${HOST}/acceptable-use`,
  `https://${HOST}/sla`,
  `https://${HOST}/security`,
  `https://${HOST}/data-protection`,
  `https://${HOST}/disclosure`,
  `https://${HOST}/business-continuity`,
  `https://${HOST}/brochure`,
];

const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: URLS,
  };

  const results = await Promise.allSettled(
    ENDPOINTS.map(endpoint =>
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
      }).then(r => ({ endpoint, status: r.status }))
    )
  );

  const summary = results.map(r =>
    r.status === 'fulfilled' ? r.value : { endpoint: 'unknown', status: 'error', reason: r.reason?.message }
  );

  return res.status(200).json({ submitted: URLS.length, results: summary });
}
