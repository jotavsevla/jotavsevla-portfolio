import { useEffect } from 'react';
import { profileData } from '../data/profile';

export interface WorkItem {
  title: string;
  code: string;
  kind: string;
  stack: string;
  year: number;
}

interface WorkDrawerProps {
  work: WorkItem | null;
  onClose: () => void;
  // copy
  labelView: string;
  labelClose: string;
  labelStack: string;
  labelRepo: string;
  labelYear: string;
}

export function WorkDrawer({
  work,
  onClose,
  labelView,
  labelClose,
  labelStack,
  labelRepo,
  labelYear,
}: WorkDrawerProps) {
  const open = work !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div className={`work-drawer ${open ? 'work-drawer--open' : ''}`} aria-hidden={!open}>
      <div className="work-drawer__backdrop" onClick={onClose} />
      <aside
        className="work-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-drawer-title"
      >
        {work && (
          <>
            <header className="work-drawer__head">
              <span className="work-drawer__num">{work.year}</span>
              <button
                type="button"
                className="work-drawer__close"
                onClick={onClose}
                aria-label={labelClose}
              >
                {labelClose} <span aria-hidden="true">×</span>
              </button>
            </header>

            <h2 id="work-drawer-title" className="work-drawer__title">
              {work.title}
            </h2>

            <p className="work-drawer__kind">{work.kind}</p>

            <dl className="work-drawer__meta">
              <div>
                <dt>{labelStack}</dt>
                <dd>{work.stack}</dd>
              </div>
              <div>
                <dt>{labelRepo}</dt>
                <dd>
                  <code>{work.code}</code>
                </dd>
              </div>
              <div>
                <dt>{labelYear}</dt>
                <dd>{work.year}</dd>
              </div>
            </dl>

            {/* NOTA (2026-07): repos privados (ex.: agua-viva-oop, produto) fazem
                este CTA cair em 404 no GitHub. Ideia registrada para o futuro:
                mapear codigos privados para uma URL de preview/demo (hardcoded ou
                rota filtrada que so lista sistemas privados) e apontar o CTA para
                la em vez do repositorio. Decidimos nao gastar tempo com essa
                logica agora; o texto do card ja avisa que o codigo e privado. */}
            <a
              className="work-drawer__cta"
              href={`https://github.com/${profileData.githubUsername}/${work.code}`}
              target="_blank"
              rel="noreferrer"
            >
              {labelView} <span aria-hidden="true">↗</span>
            </a>
          </>
        )}
      </aside>
    </div>
  );
}
