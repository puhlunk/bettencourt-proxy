{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 // api/printify.js\
\
export default async function handler(req, res) \{\
  const PRINTIFY_TOKEN = 'your_real_printify_token_here';\
\
  const \{ endpoint, method = 'GET', body = null \} = req.query;\
\
  if (!endpoint) \{\
    return res.status(400).json(\{ error: 'Missing endpoint' \});\
  \}\
\
  const fetchOptions = \{\
    method,\
    headers: \{\
      'Authorization': `Bearer $\{PRINTIFY_TOKEN\}`,\
      'Content-Type': 'application/json'\
    \}\
  \};\
\
  if (body && method !== 'GET') \{\
    fetchOptions.body = body;\
  \}\
\
  try \{\
    const response = await fetch(`https://api.printify.com/v1/$\{endpoint\}`, fetchOptions);\
    const data = await response.json();\
    res.status(response.status).json(data);\
  \} catch (error) \{\
    console.error('Proxy error:', error);\
    res.status(500).json(\{ error: 'Proxy failed' \});\
  \}\
\}\
}