export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  const PRINTIFY_TOKEN = process.env.PRINTIFY_TOKEN;

  if (!PRINTIFY_TOKEN) {
    console.error('PRINTIFY_TOKEN is missing in environment variables.');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const { endpoint, method = 'GET', body = null } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: 'Missing endpoint' });
  }

  const fetchOptions = {
    method,
    headers: {
      'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  if (body && method !== 'GET') {
    fetchOptions.body = body;
  }

  try {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    const response = await fetch(`https://api.printify.com/v1/${cleanEndpoint}`, fetchOptions);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed' });
  }
}
