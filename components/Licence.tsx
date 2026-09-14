"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cx } from "@/lib/cx";
import {
  CATEGORIES,
  CATEGORY_INFO,
  COURSE_HOURS,
  DEFAULT_HOURS_NOTE,
  MATRIX_COLS,
  MAX_COURSE_HOURS,
  MODULES,
  MODULE_SETS,
  NNBSP,
  PARTLY_REQUIRED,
  STANDARD_EXPERIENCE_NOTE,
  formatHours,
  formatYears,
  moduleKey,
  theoryLabel,
  type Category,
} from "@/lib/licence";

interface LicenceState {
  cat: Category;
  sub: string;
}

interface LicenceContextValue {
  state: LicenceState;
  select: (cat: Category, sub?: string) => void;
}

const LicenceContext = createContext<LicenceContextValue | null>(null);

/** Shares the chosen licence category between the explorer and the module matrix. */
export function LicenceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LicenceState>({ cat: "B1", sub: "B1.1" });
  const select = useCallback((cat: Category, sub?: string) => {
    setState({ cat, sub: sub ?? CATEGORY_INFO[cat].defaultSub });
  }, []);
  const value = useMemo(() => ({ state, select }), [state, select]);
  return <LicenceContext.Provider value={value}>{children}</LicenceContext.Provider>;
}

function useLicence(): LicenceContextValue {
  const value = useContext(LicenceContext);
  if (!value) throw new Error("useLicence must be used inside <LicenceProvider>");
  return value;
}

interface MeterRowProps {
  label: string;
  /** Bar width in percent. */
  width: number;
  value: string;
  primer?: boolean;
}

/** A labelled bar that grows from zero when it mounts. */
function MeterRow({ label, width, value, primer }: MeterRowProps) {
  const [w, setW] = useState(0);
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setW(width));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [width]);
  return (
    <div className="meter-row">
      <span className="lab">{label}</span>
      <div className={cx("track", primer && "p")}>
        <i style={{ width: `${w}%` }} />
      </div>
      <b>{value}</b>
    </div>
  );
}

/** Interactive comparison of licence categories: privileges, experience, course hours and modules. */
export function LicenceExplorer() {
  const { state, select } = useLicence();
  const info = CATEGORY_INFO[state.cat];
  const key = moduleKey(state.cat, state.sub);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onTabKeyDown = (index: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (d === 0) return;
    e.preventDefault();
    const n = (index + d + CATEGORIES.length) % CATEGORIES.length;
    tabRefs.current[n]?.focus();
    select(CATEGORIES[n]);
  };

  const routes = info.experience(state.sub);
  const course = key ? COURSE_HOURS[key] : null;
  const required = key ? MODULE_SETS[key] : [];
  const partly = key ? (PARTLY_REQUIRED[key] ?? []) : [];
  /* Rows are keyed on the selection so the bars re-animate on every change. */
  const selectionKey = `${state.cat}:${state.sub}`;

  return (
    <div className="explorer" id="explorer">
      <div className="ex-tabs" role="tablist" aria-label="Licence categories">
        {CATEGORIES.map((c, i) => (
          <button
            key={c}
            type="button"
            role="tab"
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            aria-selected={c === state.cat}
            tabIndex={c === state.cat ? 0 : -1}
            onClick={() => select(c)}
            onKeyDown={onTabKeyDown(i)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="ex-body" role="tabpanel" aria-live="polite">
        <div className="ex-id">
          <div className="big">{info.selectable ? state.sub : state.cat}</div>
          <p className="role">{info.role}</p>
          <div>
            <p className="eyebrow">{info.subsLabel}</p>
            <div className="chips">
              {info.subs.map((s) =>
                info.selectable ? (
                  <button
                    key={s.code}
                    type="button"
                    className="chip"
                    aria-pressed={s.code === state.sub}
                    onClick={() => select(state.cat, s.code)}
                  >
                    {s.code}
                    <small>{s.desc}</small>
                  </button>
                ) : (
                  <span key={s.code} className="chip">
                    {s.code}
                    <small>{s.desc}</small>
                  </span>
                ),
              )}
            </div>
          </div>
          <div>
            <p className="eyebrow">Privileges</p>
            <ul className="checklist">
              {info.privileges.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <p className="note">{info.rating}</p>
        </div>
        <div className="ex-side">
          <div className="meter">
            <p className="eyebrow">Minimum practical experience, years</p>
            <div className="meter">
              {routes.map((r, i) => (
                <MeterRow
                  key={`${selectionKey}:${i}`}
                  label={r.label}
                  width={(r.years / 5) * 100}
                  value={formatYears(r.years)}
                />
              ))}
            </div>
            <div className="scale" aria-hidden="true">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
            <p className="note">{info.experienceNote ?? STANDARD_EXPERIENCE_NOTE}</p>
          </div>
          <div className="meter">
            <p className="eyebrow">Part-147 basic course</p>
            <div className="meter">
              {course && (
                <>
                  <MeterRow
                    key={selectionKey}
                    label={`Minimum total, of which ${theoryLabel(course)} theory`}
                    width={(course.hours / MAX_COURSE_HOURS) * 100}
                    value={formatHours(course.hours)}
                    primer
                  />
                  <div className="scale" aria-hidden="true">
                    <span>0</span>
                    <span>1{NNBSP}200</span>
                    <span>2{NNBSP}400 h</span>
                  </div>
                </>
              )}
            </div>
            <p className="note">{course ? (info.hoursNote ?? DEFAULT_HOURS_NOTE) : info.hoursNote}</p>
          </div>
        </div>
        <div className={cx("modstrip", !key && "na")}>
          <p className="eyebrow">Basic knowledge modules</p>
          <ol>
            {MODULES.map((m) => {
              const isPart = partly.includes(m.n);
              const isOn = !isPart && required.includes(m.n);
              return (
                <li key={m.n} className={cx(isOn && "on", isPart && "part")} title={`Module ${m.n}: ${m.name}`}>
                  <b>{m.n}</b>
                  <span>{m.short}</span>
                </li>
              );
            })}
          </ol>
          <div className="legend">
            <span>
              <i className="k-on" />
              Required
            </span>
            <span>
              <i className="k-part" />
              Partly required
            </span>
          </div>
          <p className="note">
            {info.modulesNote ??
              `Highlighted: the ${required.length} modules required for ${key}. The knowledge level for each module depends on the category.`}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Module-by-category matrix; the column of the explorer's selection is highlighted. */
export function ModuleMatrix() {
  const { state } = useLicence();
  const key = moduleKey(state.cat, state.sub);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setOverflowing(el.scrollWidth > el.clientWidth + 1);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <p className="scroll-hint" hidden={!overflowing}>
        Scroll sideways to see every category
      </p>
      <div className="tbl-wrap" ref={wrapRef}>
        <table className="mx">
          <thead>
            <tr>
              <th>Module</th>
              {MATRIX_COLS.map((c) => (
                <th key={c} className={c === key ? "col-on" : undefined}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODULES.map((m) => (
              <tr key={m.n}>
                <td>
                  <b>{m.n}</b>
                  {m.name}
                </td>
                {MATRIX_COLS.map((c) => {
                  const partly = PARTLY_REQUIRED[c]?.includes(m.n) ?? false;
                  const required = MODULE_SETS[c].includes(m.n);
                  return (
                    <td key={c} className={c === key ? "col-on" : undefined}>
                      {partly ? (
                        <span className="p" aria-label="partly required">
                          ◐
                        </span>
                      ) : required ? (
                        <span className="y" aria-label="required">
                          ●
                        </span>
                      ) : (
                        <span className="n" aria-label="not required">
                          ·
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
