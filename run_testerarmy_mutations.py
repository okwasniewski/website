import json
import pathlib
import re
import subprocess
import time
from glob import glob

repo = pathlib.Path('/Users/openclaw/.openclaw/workspace/website')
header = repo / 'src' / 'components' / 'Header.tsx'
base = header.read_text()

mutations = [
    ("baseline", lambda t: t),
    ("home_label_changed", lambda t: t.replace('okwasniewski', 'Oskar Site')),
    ("blog_typo", lambda t: t.replace('href="/blog"', 'href="/blgo"')),
    ("portfolio_typo", lambda t: t.replace('href="/portfolio"', 'href="/portfoloi"')),
    ("videos_typo", lambda t: t.replace('href="/videos"', 'href="/vidoes"')),
    ("contact_typo", lambda t: t.replace('href="/contact"', 'href="/contcat"')),
    ("blog_removed", lambda t: re.sub(r'\n\s*<Link\n\s*href="/blog"[\s\S]*?<\/Link>\n', '\n', t, count=1)),
    ("contact_not_clickable", lambda t: t.replace('<Link\n          href="/contact"\n          className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"\n        >\n          contact\n        </Link>', '<span className="text-gray-600 dark:text-gray-400">contact</span>')),
    ("swapped_blog_portfolio", lambda t: t.replace('href="/blog"', 'href="/__tmp__"').replace('href="/portfolio"', 'href="/blog"').replace('href="/__tmp__"', 'href="/portfolio"')),
    ("nav_pointer_events_none", lambda t: t.replace('className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"', 'className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pointer-events-none"')),
]

prompt = (
    "On http://localhost:3002 use mobile viewport 375x812. "
    "Verify header has Home (brand okwasniewski), Blog, Portfolio, Videos, Contact and each routes to / /blog /portfolio /videos /contact. "
    "Click each link and validate navigation. "
    "Report missing, unclickable, or wrong-route links. Ignore analytics/config console warnings."
)

rows = []

for idx, (name, mutate) in enumerate(mutations, 1):
    header.write_text(mutate(base))
    print(f"RUN {idx}: {name}", flush=True)
    subprocess.run([
        'testerarmy', 'run', prompt
    ], cwd=repo, check=False, timeout=600)

    result_files = sorted(glob(str(repo / '.testerarmy' / '*' / 'result.json')), key=lambda p: pathlib.Path(p).stat().st_mtime)
    latest = pathlib.Path(result_files[-1])
    data = json.loads(latest.read_text())
    issues = data.get('issues') or []
    rows.append({
        'id': idx,
        'mutation': name,
        'result': data.get('result'),
        'issues': len(issues),
        'description': (data.get('description') or '').replace('\n', ' '),
        'result_file': str(latest),
    })
    print(f"  => {data.get('result')} | issues={len(issues)}", flush=True)
    time.sleep(1)

header.write_text(base)

out = repo / 'testerarmy-cli-evaluation.json'
out.write_text(json.dumps(rows, indent=2, ensure_ascii=False))

md = repo / 'testerarmy-cli-evaluation.md'
lines = [
    '# TesterArmy CLI mutation evaluation',
    '',
    '| # | Mutation | Result | Issues | Notes |',
    '|---|---|---|---:|---|',
]
for r in rows:
    notes = r['description'].replace('|', '-').strip()[:220]
    lines.append(f"| {r['id']} | {r['mutation']} | {r['result']} | {r['issues']} | {notes} |")
md.write_text('\n'.join(lines) + '\n')

print('DONE')
