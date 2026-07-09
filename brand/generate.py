#!/usr/bin/env python3
"""Sympozium next-gen identity generator — neo-industrial palette.

Everything is emitted as SVG from geometry defined here, so the identity can
be riffed on by editing numbers, not paths. Three mark directions:

  table — agents round a shared hub (the symposium as a round table; 7 nodes
          as a quiet Kubernetes nod)
  sigma — angular Σ/S letterform, stencil-cut
  claim — agents inside a chamfered boundary with a gate (claimed, not placed)

Wordmark: SYMPOZIUM in a bespoke blocky stencil letterset (paths, no fonts).

Usage: python3 generate.py   (writes ./<direction>/*.svg and ./wordmark/*.svg)
"""

import os

# ── Palette (neo-industrial) ────────────────────────────────────────────────
CHARCOAL = "#111110"   # deep background tile
PANEL    = "#1a1a18"   # raised panel
LINE     = "#333330"   # hairline borders
BONE     = "#f0ece4"   # primary on dark
OLIVE    = "#8a8c82"   # secondary text
RUST     = "#c4532a"   # accent on light
EMBER    = "#e8562a"   # accent on dark
BONE_BG  = "#eae6de"   # light-mode background

# ── Blocky stencil letterset ────────────────────────────────────────────────
# Each glyph: (width, [(x, y, w, h), ...]) on a 20-high grid, 4px bar unit.
GLYPHS = {
    "S": (16, [(0, 0, 16, 4), (0, 4, 4, 4), (0, 8, 16, 4), (12, 12, 4, 4), (0, 16, 16, 4)]),
    "Y": (16, [(0, 0, 4, 8), (12, 0, 4, 8), (4, 8, 8, 4), (6, 12, 4, 8)]),
    "M": (20, [(0, 0, 4, 20), (16, 0, 4, 20), (4, 0, 12, 4), (8, 4, 4, 8)]),
    "P": (16, [(0, 0, 4, 20), (4, 0, 12, 4), (12, 4, 4, 4), (4, 8, 12, 4)]),
    "O": (16, [(0, 0, 16, 4), (0, 16, 16, 4), (0, 4, 4, 12), (12, 4, 4, 12)]),
    "Z": (16, [(0, 0, 16, 4), (0, 16, 16, 4), (10, 4, 4, 4), (6, 8, 4, 4), (2, 12, 4, 4)]),
    "I": (8,  [(0, 0, 8, 4), (2, 4, 4, 12), (0, 16, 8, 4)]),
    "U": (16, [(0, 0, 4, 16), (12, 0, 4, 16), (0, 16, 16, 4)]),
    "A": (16, [(0, 4, 4, 16), (12, 4, 4, 16), (4, 0, 8, 4), (4, 8, 8, 4)]),
    "B": (16, [(0, 0, 4, 20), (4, 0, 12, 4), (12, 4, 4, 4), (4, 8, 12, 4), (12, 12, 4, 4), (4, 16, 12, 4)]),
    "C": (16, [(0, 0, 16, 4), (0, 4, 4, 12), (0, 16, 16, 4)]),
    "D": (16, [(0, 0, 4, 20), (4, 0, 8, 4), (12, 4, 4, 12), (4, 16, 8, 4)]),
    "E": (16, [(0, 0, 4, 20), (4, 0, 12, 4), (4, 8, 8, 4), (4, 16, 12, 4)]),
    "F": (16, [(0, 0, 4, 20), (4, 0, 12, 4), (4, 8, 8, 4)]),
    "G": (16, [(0, 0, 16, 4), (0, 4, 4, 12), (0, 16, 16, 4), (12, 12, 4, 4), (8, 8, 8, 4)]),
    "H": (16, [(0, 0, 4, 20), (12, 0, 4, 20), (4, 8, 8, 4)]),
    "K": (16, [(0, 0, 4, 20), (4, 8, 4, 4), (8, 4, 4, 4), (12, 0, 4, 4), (8, 12, 4, 4), (12, 16, 4, 4)]),
    "L": (16, [(0, 0, 4, 20), (4, 16, 12, 4)]),
    "N": (16, [(0, 0, 4, 20), (12, 0, 4, 20), (4, 4, 4, 6), (8, 10, 4, 6)]),
    "R": (16, [(0, 0, 4, 20), (4, 0, 12, 4), (12, 4, 4, 4), (4, 8, 12, 4), (8, 12, 4, 4), (12, 16, 4, 4)]),
    "T": (16, [(0, 0, 16, 4), (6, 4, 4, 16)]),
    "J": (16, [(12, 0, 4, 16), (0, 16, 16, 4), (0, 12, 4, 4)]),
    "-": (12, [(0, 8, 12, 4)]),
    ".": (8,  [(2, 16, 4, 4)]),
    " ": (10, []),
}
LETTER_SPACE = 6


def word_rects(text, x=0, y=0, scale=1.0, accent_chars=""):
    """Lay out text; returns (rects, accents, total_width)."""
    rects, accents = [], []
    cx = x
    for ch in text:
        w, parts = GLYPHS[ch]
        target = accents if ch in accent_chars else rects
        for (gx, gy, gw, gh) in parts:
            target.append((cx + gx * scale, y + gy * scale, gw * scale, gh * scale))
        cx += (w + LETTER_SPACE) * scale
    return rects, accents, cx - LETTER_SPACE * scale - x


def rects_svg(rects, fill):
    return "\n".join(
        f'  <rect x="{x:g}" y="{y:g}" width="{w:g}" height="{h:g}" fill="{fill}"/>'
        for (x, y, w, h) in rects
    )


def svg(width, height, body, background=None):
    bg = f'  <rect width="{width}" height="{height}" fill="{background}"/>\n' if background else ""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'width="{width}" height="{height}">\n{bg}{body}\n</svg>\n'
    )


# ── Marks (120×120 viewBox, transparent) ────────────────────────────────────

def mark_table(primary, accent):
    """Seven square nodes round a shared hub."""
    import math
    parts = []
    n, r, size = 7, 41, 14
    for i in range(n):
        a = -90 + i * 360 / n
        px = 60 + r * math.cos(math.radians(a))
        py = 60 + r * math.sin(math.radians(a))
        parts.append(f'  <rect x="{px - size/2:.1f}" y="{py - size/2:.1f}" width="{size}" height="{size}" fill="{primary}"/>')
    # hub: bone frame + ember core
    parts.append(f'  <rect x="44" y="44" width="32" height="32" fill="none" stroke="{primary}" stroke-width="5"/>')
    parts.append(f'  <rect x="54" y="54" width="12" height="12" fill="{accent}"/>')
    return "\n".join(parts)


def mark_sigma(primary, accent):
    """Angular Σ with stencil cuts and an ember rivet at the vertex."""
    parts = [
        f'  <path d="M97 23 H29 L67 60 L29 97 H97" fill="none" stroke="{primary}" '
        f'stroke-width="15" stroke-linejoin="miter" stroke-linecap="butt"/>',
        # the agent inside the sum: an ember node in the sigma's open notch
        f'  <rect x="79" y="53" width="14" height="14" fill="{accent}"/>',
    ]
    return "\n".join(parts)


def mark_claim(primary, accent):
    """Chamfered boundary with a gate; four agents inside, one at the gate."""
    parts = [
        # boundary drawn as two open paths leaving a gate on the right side
        f'  <path d="M110 46 V28 L92 10 H28 L10 28 V92 L28 110 H92 L110 92 V74" '
        f'fill="none" stroke="{primary}" stroke-width="7" stroke-linejoin="miter"/>',
        # gate ticks
        f'  <rect x="102" y="46" width="16" height="6" fill="{accent}"/>',
        f'  <rect x="102" y="68" width="16" height="6" fill="{accent}"/>',
        # agents
        f'  <rect x="36" y="36" width="17" height="17" fill="{primary}"/>',
        f'  <rect x="36" y="66" width="17" height="17" fill="{primary}"/>',
        f'  <rect x="66" y="66" width="17" height="17" fill="{primary}"/>',
        f'  <rect x="66" y="36" width="17" height="17" fill="{accent}"/>',
    ]
    return "\n".join(parts)


MARKS = {"table": mark_table, "sigma": mark_sigma, "claim": mark_claim}


# ── Assemblies ──────────────────────────────────────────────────────────────

def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)
    print(path)


def emit_direction(name, fn):
    # pure marks
    write(f"{name}/mark-dark.svg", svg(120, 120, fn(BONE, EMBER)))
    write(f"{name}/mark-light.svg", svg(120, 120, fn(PANEL, RUST)))
    write(f"{name}/mark-mono.svg", svg(120, 120, fn("currentColor", "currentColor")))

    # github avatar tile (square, framed)
    inner = f'''  <rect x="6" y="6" width="228" height="228" fill="none" stroke="{LINE}" stroke-width="2"/>
  <g transform="translate(42 42) scale(1.3)">
{fn(BONE, EMBER)}
  </g>'''
    write(f"{name}/github-avatar.svg", svg(240, 240, inner, background=CHARCOAL))

    # horizontal lockups: mark + SYMPOZIUM
    for variant, primary, accent, bg in (
        ("dark", BONE, EMBER, None),
        ("light", PANEL, RUST, None),
    ):
        wrects, warc, wwidth = word_rects("SYMPOZIUM", 0, 0, 2.2, accent_chars="Z")
        mark_size, pad = 88, 34
        total_w = mark_size + pad + wwidth + 8
        body = f'''  <g transform="translate(0 {(88-88)/2:g}) scale({88/120:.4f})">
{fn(primary, accent)}
  </g>
  <g transform="translate({mark_size + pad} {(88 - 44) / 2:g})">
{rects_svg(wrects, primary)}
{rects_svg(warc, accent)}
  </g>'''
        write(f"{name}/logo-horizontal-{variant}.svg", svg(int(total_w), 88, body))

    # social card 1280×640
    wrects, warc, wwidth = word_rects("SYMPOZIUM", 0, 0, 3.6, accent_chars="Z")
    trects, tarc, twidth = word_rects("THE COORDINATION LAYER FOR MULTI-AGENT AI", 0, 0, 0.95)
    card = f'''  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <rect x="23" y="23" width="2" height="2" fill="{LINE}"/>
    </pattern>
  </defs>
  <rect width="1280" height="640" fill="url(#grid)"/>
  <rect x="10" y="10" width="1260" height="620" fill="none" stroke="{LINE}" stroke-width="1"/>
  <path d="M18 58 V18 h40" fill="none" stroke="{EMBER}" stroke-width="3"/>
  <path d="M1262 58 V18 h-40" fill="none" stroke="{EMBER}" stroke-width="3"/>
  <path d="M18 582 v40 h40" fill="none" stroke="{EMBER}" stroke-width="3"/>
  <path d="M1262 582 v40 h-40" fill="none" stroke="{EMBER}" stroke-width="3"/>
  <g transform="translate(120 172) scale(1.9)">
{fn(BONE, EMBER)}
  </g>
  <g transform="translate(392 244)">
{rects_svg(wrects, BONE)}
{rects_svg(warc, EMBER)}
  </g>
  <g transform="translate(394 344)">
{rects_svg(trects, OLIVE)}
  </g>
  <rect x="60" y="540" width="1160" height="1" fill="{LINE}"/>
  <g transform="translate(60 556)">
{rects_svg(word_rects("AGENTS ARE PODS - POLICY IS CRDS - MODELS ARE CLAIMED", 0, 0, 0.9)[0], OLIVE)}
  </g>'''
    write(f"{name}/social-card.svg", svg(1280, 640, card, background=CHARCOAL))


def emit_wordmark():
    for variant, primary, accent in (("dark", BONE, EMBER), ("light", PANEL, RUST)):
        wrects, warc, wwidth = word_rects("SYMPOZIUM", 0, 0, 2.6, accent_chars="Z")
        body = rects_svg(wrects, primary) + "\n" + rects_svg(warc, accent)
        write(f"wordmark/wordmark-{variant}.svg", svg(int(wwidth), 52, body))


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    for name, fn in MARKS.items():
        emit_direction(name, fn)
    emit_wordmark()
