/**
 * PokeAPI GitHub CSV에서 언어별 포켓몬 이름 → 영어 slug 매핑 JSON을 생성합니다.
 * 실행: npx tsx scripts/generate-pokemon-ko.ts
 * 출력: public/data/pokemon-ko.json, public/data/pokemon-ja.json
 */
import * as fs from 'fs'
import * as path from 'path'

const SPECIES_CSV =
  'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species.csv'
const NAMES_CSV =
  'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species_names.csv'

const LANGS = [
  { id: '3', file: 'pokemon-ko.json', label: '한국어' },
  { id: '1', file: 'pokemon-ja.json', label: '日本語 (ja-Hrkt)' },
] as const

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  return res.text()
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false
  for (const ch of line) {
    if (ch === '"') {
      inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      fields.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  fields.push(current)
  return fields
}

async function main() {
  console.log('📥 Fetching species CSV...')
  const speciesCsv = await fetchText(SPECIES_CSV)

  const idToSlug = new Map<string, string>()
  for (const line of speciesCsv.split('\n').slice(1)) {
    if (!line.trim()) continue
    const parts = parseCSVLine(line)
    if (parts[0] && parts[1]) idToSlug.set(parts[0], parts[1])
  }
  console.log(`✅ Loaded ${idToSlug.size} species slugs`)

  console.log('📥 Fetching species names CSV...')
  const namesCsv = await fetchText(NAMES_CSV)
  const nameLines = namesCsv.split('\n').slice(1)

  const outDir = path.join(process.cwd(), 'public', 'data')
  fs.mkdirSync(outDir, { recursive: true })

  for (const { id, file, label } of LANGS) {
    const map: Record<string, string> = {}
    for (const line of nameLines) {
      if (!line.trim()) continue
      const parts = parseCSVLine(line)
      if (parts[1] !== id) continue
      const name = parts[2]
      const slug = idToSlug.get(parts[0])
      if (name && slug) map[name] = slug
    }
    const outPath = path.join(outDir, file)
    fs.writeFileSync(outPath, JSON.stringify(map, null, 2), 'utf-8')
    console.log(`🎉 [${label}] ${Object.keys(map).length}개 → ${outPath}`)
  }
}

main().catch((e) => {
  console.error('❌', e)
  process.exit(1)
})
