/**
 * Typed route builder.
 *
 * `route(segment, children?)` returns a node with:
 *   - `relativePath` — the segment alone (for nested router config)
 *   - `absPath`      — the full path from root (for `<Link to>` / `<Navigate>`)
 *   - `ROOT`         — alias for `absPath` to mirror the architecture-guide style
 *   - any nested children, fully-typed
 *
 * Example:
 *   const ROUTES = route('', {
 *     DESIGN_SYSTEM: route('design-system', {
 *       BUTTONS: route('buttons'),
 *     }),
 *   });
 *   ROUTES.DESIGN_SYSTEM.absPath          // '/design-system'
 *   ROUTES.DESIGN_SYSTEM.BUTTONS.absPath  // '/design-system/buttons'
 *   ROUTES.DESIGN_SYSTEM.BUTTONS.relativePath // 'buttons'
 */

interface RouteBase {
  relativePath: string;
  absPath: string;
  ROOT: string;
}

export type RouteNode<TChildren extends Record<string, RouteBase> = Record<string, never>> =
  RouteBase & TChildren;

const RESERVED_KEYS = new Set<keyof RouteBase>(['relativePath', 'absPath', 'ROOT']);

function joinPath(parent: string, segment: string): string {
  if (!segment) return parent || '/';
  const left = parent.endsWith('/') ? parent.slice(0, -1) : parent;
  const right = segment.startsWith('/') ? segment.slice(1) : segment;
  return `${left}/${right}` || '/';
}

function rebuildWithParent(node: RouteBase, parentAbsPath: string): RouteBase {
  const absPath = joinPath(parentAbsPath, node.relativePath);
  const rebuilt: RouteBase = {
    relativePath: node.relativePath,
    absPath,
    ROOT: absPath,
  };

  for (const [key, value] of Object.entries(node)) {
    if (RESERVED_KEYS.has(key as keyof RouteBase)) continue;
    if (isRouteBase(value)) {
      (rebuilt as unknown as Record<string, RouteBase>)[key] = rebuildWithParent(value, absPath);
    }
  }

  return rebuilt;
}

function isRouteBase(value: unknown): value is RouteBase {
  return (
    typeof value === 'object' &&
    value !== null &&
    'relativePath' in value &&
    'absPath' in value &&
    'ROOT' in value
  );
}

export function route<TChildren extends Record<string, RouteBase> = Record<string, never>>(
  segment: string,
  children?: TChildren,
): RouteNode<TChildren> {
  const absPath = joinPath('', segment);
  const node: RouteBase = {
    relativePath: segment,
    absPath,
    ROOT: absPath,
  };

  if (children) {
    for (const [key, child] of Object.entries(children)) {
      (node as unknown as Record<string, RouteBase>)[key] = rebuildWithParent(child, absPath);
    }
  }

  return node as RouteNode<TChildren>;
}

export const ROUTES = route('', {
  DESIGN_SYSTEM: route('design-system'),
});
