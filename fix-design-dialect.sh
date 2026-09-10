#!/bin/bash

# Replace "Design Dialects" with "Design Dialect" in all TypeScript files

FILES=(
  "app/(site)/build-right/page-clean.tsx"
  "app/(site)/build-right/page.tsx"
  "app/(site)/insights/page.tsx"
  "app/(site)/insights/why-architecture-events-matter-2027/page.tsx"
  "app/(site)/page.tsx"
  "app/(site)/register/page.tsx"
  "app/(site)/work/page.tsx"
  "app/admin/gallery/bulk-upload/page.tsx"
  "lib/content.ts"
  "components/site/EventPopup.tsx"
  "components/site/FAQSection.tsx"
  "components/site/OurFirms.tsx"
  "components/site/SiteHeader.tsx"
  "components/site/VerticalSwitcher.tsx"
)

count=0

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # Use sed to replace "Design Dialects" with "Design Dialect"
    sed -i 's/Design Dialects/Design Dialect/g' "$file"
    echo "✅ Updated: $file"
    ((count++))
  else
    echo "⚠️  Not found: $file"
  fi
done

echo ""
echo "🎉 Replaced 'Design Dialects' with 'Design Dialect' in $count files!"
