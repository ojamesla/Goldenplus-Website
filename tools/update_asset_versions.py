#!/usr/bin/env python3
"""Refresh local CSS/JavaScript query versions from their file contents."""

import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSET_URL = re.compile(r'(?P<prefix>\b(?:href|src)=["\'])(?P<path>assets/(?:css|js)/[^"\'?]+\.(?:css|js))(?:\?[^"\']*)?(?P<quote>["\'])')


def update_versions():
    changed = 0
    for page in sorted(ROOT.glob('*.html')):
        source = page.read_text(encoding='utf-8')

        def version(match):
            asset = ROOT / match.group('path')
            digest = hashlib.sha256(asset.read_bytes()).hexdigest()[:12]
            return '{}{}?v={}{}'.format(match.group('prefix'), match.group('path'), digest, match.group('quote'))

        updated = ASSET_URL.sub(version, source)
        if updated != source:
            page.write_text(updated, encoding='utf-8')
            changed += 1
    print('Updated asset versions in {} HTML files.'.format(changed))


if __name__ == '__main__':
    update_versions()
