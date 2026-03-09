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

function getRowText(row: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = toText(row[k]).trim();
    if (v) return v;
  }
  return '';
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
  return '';
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
  const testPrompt = getRowText(row, ['Test Prompt', 'Test prompt', 'TestPrompt']);
  const functionRaw = normalizeWhitespace(toText(row['Function']));
  const category = groupFunctionCategory(functionRaw);

  const name = usage || truncate(descriptionLong, 72) || `Prompt ${index + 1}`;
  const description =
    truncate(descriptionLong || usage || normalizeWhitespace(toText(row['Target Group'])), 160) ||
    '—';

  const dataRequirement = getRowText(row, ['Data Requirement', 'Data requirement', 'DataRequirement']);
  const sourceOutputs = getRowText(row, [
    'Sources/ Outputs',
    'Sources/Outputs',
    'Sources / Outputs',
    'Source Outputs',
    'sourceOutputs',
  ]);

  const industryRaw = normalizeWhitespace(toText(row['Industry']));
  const industry = industryRaw ? industryRaw.split(/[,;]/).map(s => s.trim()).filter(Boolean) : [];

  const promptType = normalizeWhitespace(toText(row['Prompt Type']));
  const tool = normalizeWhitespace(toText(row['Type Of Tool']));
  const complexity = normalizeWhitespace(toText(row['Complexity']));
  const targetGroup = normalizeWhitespace(toText(row['Target Group']));
  const targetCategory = normalizeWhitespace(toText(row['Target Category']));

  const tags = Array.from(
    new Set(
      [functionRaw, industryRaw, promptType, tool, complexity, targetGroup, targetCategory]
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
    testPrompt: truncate(testPrompt, 4000),
    dataRequirement: truncate(dataRequirement, 2400),
    sourceOutputs: truncate(sourceOutputs, 2400),
    icon: pickIcon(category, industryRaw),
    tags,
    industry,
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
    .filter(p => {
      if (p.name === '—') return false;
      const fields = [p.description, p.testPrompt, p.dataRequirement, p.sourceOutputs];
      return fields.some(s => s.trim().length > 0 && s.trim() !== '—');
    });

  cache = { mtimeMs: stat.mtimeMs, prompts };
  return prompts;
}

