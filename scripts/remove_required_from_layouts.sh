#!/usr/bin/env bash
# Remove invalid <required> tags from Salesforce layout metadata files.
set -e
# Find all .layout-meta.xml files and remove <required> tags within them
find force-app -name '*.layout-meta.xml' -print0 | while IFS= read -r -d '' file; do
  perl -i -0pe 's/\r?\n\s*<required>[^<]*<\/required>//g' "$file"
done
