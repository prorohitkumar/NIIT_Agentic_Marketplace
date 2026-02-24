import fs from 'node:fs/promises';
import path from 'node:path';
import * as xlsx from 'xlsx';
import type { Prompt } from '@/lib/types/prompt';

type Cache = { mtimeMs: number; prompts: Prompt[] };

let cache: Cache | null = null;

function toText(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function normalizeWhitespace(s: string): string {
  return s.replace(/\s+/g, ' ').trim();
}

function truncate(s: string, maxLen: number): string {
  if (s.length <= maxLen) return s;
  return `${s.slice(0, Math.max(0, maxLen - 1)).trimEnd()}…`;
}

function slugifyTag(s: string): string {
  const t = normalizeWhitespace(s).toLowerCase();
  if (!t) return '';
  return t
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function pickIcon(fn: string, industry: string): string {
  const f = fn.toLowerCase();
  const i = industry.toLowerCase();
  if (f.includes('marketing')) return '📣';
  if (f.includes('sales')) return '🧾';
  if (f.includes('finance') || f.includes('account')) return '💰';
  if (f.includes('hr') || f.includes('human')) return '🧑‍💼';
  if (f.includes('legal')) return '⚖️';
  if (f.includes('ops') || f.includes('operation')) return '⚙️';
  if (f.includes('support') || f.includes('service')) return '🎧';
  if (f.includes('engineering') || f.includes('it')) return '🛠️';
  if (f.includes('product')) return '🧩';
  if (i.includes('health')) return '🩺';
  if (i.includes('education')) return '🎓';
  return '🧠';
}

function groupFunctionCategory(raw: string): string {
  const f = normalizeWhitespace(raw).toLowerCase();
  if (!f) return 'General';

  if (/(marketing|marcomm|brand|content|copy)/.test(f)) return 'Marketing';
  if (/(sales|channel sales|commercial)/.test(f)) return 'Sales';
  if (/(customer|support|service|cx|call)/.test(f)) return 'Customer Support';
  if (/(hr|human|recruit|talent|resume|learning|training|l\&d)/.test(f)) return 'HR & Learning';
  if (/(finance|account|tax|indas|invoice)/.test(f)) return 'Finance';
  if (/(legal|contract|compliance|audit|risk|safety)/.test(f)) return 'Compliance & Legal';
  if (/(supply chain|scm|logistics|operations|ops|manufacturing|production|inventory)/.test(f)) return 'Operations';
  if (/(data|analytics|mis|dashboard|reporting|biw|strategy)/.test(f)) return 'Analytics';
  if (/(it|engineering|cyber|security|technology|digital)/.test(f)) return 'Engineering';
  return 'General';
}

function rowToPrompt(row: Record<string, unknown>, index: number): Prompt {
  const usage = normalizeWhitespace(toText(row['Usage']));
  const descriptionLong = normalizeWhitespace(toText(row['Description']));
  const testPrompt = toText(row['Test Prompt']).trim();
  const functionRaw = normalizeWhitespace(toText(row['Function']));
  const category = groupFunctionCategory(functionRaw);

  const name = usage || truncate(descriptionLong, 72) || `Prompt ${index + 1}`;
  const description =
    truncate(descriptionLong || usage || normalizeWhitespace(toText(row['Target Group'])), 160) ||
    '—';

  const detailedDescription = [
    descriptionLong || usage,
    testPrompt ? `Test Prompt:\n${truncate(testPrompt, 900)}` : '',
    normalizeWhitespace(toText(row['Data Requirement']))
      ? `Data requirement:\n${toText(row['Data Requirement']).trim()}`
      : '',
    normalizeWhitespace(toText(row['Sources/ Outputs']))
      ? `Sources / outputs:\n${toText(row['Sources/ Outputs']).trim()}`
      : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  const industry = normalizeWhitespace(toText(row['Industry']));
  const promptType = normalizeWhitespace(toText(row['Prompt Type']));
  const tool = normalizeWhitespace(toText(row['Type Of Tool']));
  const complexity = normalizeWhitespace(toText(row['Complexity']));
  const targetGroup = normalizeWhitespace(toText(row['Target Group']));
  const targetCategory = normalizeWhitespace(toText(row['Target Category']));

  const tags = Array.from(
    new Set(
      [functionRaw, industry, promptType, tool, complexity, targetGroup, targetCategory]
        .map(slugifyTag)
        .filter(Boolean)
    )
  ).slice(0, 8);

  const author = normalizeWhitespace(toText(row['Owner'])) || normalizeWhitespace(toText(row['Validated by'])) || 'NIIT';

  return {
    id: index + 1,
    name,
    category,
    description,
    detailedDescription: truncate(detailedDescription, 2400),
    icon: pickIcon(category, industry),
    tags,
    author,
    rating: 0,
    uses: 0,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
}

export async function getPromptsFromXlsx(): Promise<Prompt[]> {
  const xlsxPath = path.join(process.cwd(), 'public', 'prompt_repo.xlsx');
  const stat = await fs.stat(xlsxPath);

  if (cache?.mtimeMs === stat.mtimeMs) return cache.prompts;

  // Avoid `xlsx.readFile()` (which relies on its own fs access) and read the file ourselves.
  const file = await fs.readFile(xlsxPath);
  const wb = xlsx.read(file, { type: 'buffer', cellDates: true });
  const sheetName = wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

  const prompts = rows
    .map((row, idx) => rowToPrompt(row, idx))
    .filter(p => p.name !== '—' && p.detailedDescription.trim().length > 0);

  cache = { mtimeMs: stat.mtimeMs, prompts };
  return prompts;
}

