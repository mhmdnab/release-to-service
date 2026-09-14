import type { ReactNode } from "react";

export interface TableCell {
  content: ReactNode;
  /** Monospace cell (class "m"). */
  mono?: boolean;
  colSpan?: number;
}

export type CellInput = string | TableCell;

export interface TableRow {
  cells: readonly CellInput[];
  highlight?: boolean;
}

interface DataTableProps {
  head: readonly string[];
  rows: readonly TableRow[];
  /** Word shown before the first cell's value when the table stacks into cards on phones. */
  firstCellPrefix?: string;
  bodyClassName?: string;
}

export const mono = (content: ReactNode): TableCell => ({ content, mono: true });

/**
 * A regulation table. Each cell carries its column heading as data-label so the
 * table can stack into labelled cards on narrow screens (see the .stack CSS).
 */
export function DataTable({ head, rows, firstCellPrefix, bodyClassName }: DataTableProps) {
  return (
    <div className="tbl-wrap">
      <table className="stack">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className={bodyClassName}>
          {rows.map((row, r) => {
            let col = 0;
            return (
              <tr key={r} className={row.highlight ? "hl" : undefined}>
                {row.cells.map((c, i) => {
                  const cell: TableCell = typeof c === "string" ? { content: c } : c;
                  const span = cell.colSpan ?? 1;
                  const label = span > 1 ? "" : (head[col] ?? "");
                  const prefix = col === 0 ? firstCellPrefix : undefined;
                  col += span;
                  return (
                    <td
                      key={i}
                      className={cell.mono ? "m" : undefined}
                      colSpan={span > 1 ? span : undefined}
                      data-label={label}
                      data-prefix={prefix}
                    >
                      {cell.content}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
