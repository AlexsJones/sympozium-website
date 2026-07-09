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

# Palette v2 — data-plate revision (brand sheet 2026-07-09)
CHARCOAL2 = "#16130f"  # warmer deep charcoal
CREAM2    = "#ede6da"  # cream
ORANGE2   = "#e8502a"  # orange
SLATE2    = "#8fa3b0"  # slate — secondary labels only

# Palette v3 — light data-plate revision (brand sheet v2, 2026-07-09)
ORANGE3 = "#c24a1a"
SAND3   = "#cbb89a"
BROWN3  = "#2b1e17"
INK3    = "#111111"
PAPER3  = "#f2eee6"


# ── Type engine: JetBrains Mono outlined to paths (no font dependency in
#    the emitted SVGs; fonts vendored under fonts/ with their OFL licence).
#    Regenerate inside a venv with `pip install fonttools`.
_FONTS = {}

def _font(name):
    """name: bare weight = JetBrainsMono-<w>; otherwise a full file stem."""
    if name not in _FONTS:
        from fontTools.ttLib import TTFont
        stem = f"JetBrainsMono-{name}" if "-" not in name else name
        _FONTS[name] = TTFont(os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts", stem + ".ttf"))
    return _FONTS[name]


def text_path(text, size, weight="ExtraBold", tracking=0.045):
    """Outline text to a single SVG path d-string at cap-height-aligned
    baseline y=0. Returns (d, width). tracking is em-fraction added per gap."""
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.pens.transformPen import TransformPen
    from fontTools.misc.transform import Transform
    f = _font(weight)
    glyph_set = f.getGlyphSet()
    cmap = f.getBestCmap()
    scale = size / f["head"].unitsPerEm
    ds, x = [], 0.0
    for i, ch in enumerate(text):
        gname = cmap[ord(ch)]
        pen = SVGPathPen(glyph_set)
        glyph_set[gname].draw(TransformPen(pen, Transform(scale, 0, 0, -scale, x, 0)))
        if pen.getCommands():
            ds.append(pen.getCommands())
        x += f["hmtx"][gname][0] * scale
        if i < len(text) - 1:
            x += tracking * size
    return " ".join(ds), x


def cap_height(size, weight="ExtraBold"):
    f = _font(weight)
    return f["OS/2"].sCapHeight * size / f["head"].unitsPerEm


def type_svg(text, size, fill, weight="ExtraBold", tracking=0.045):
    d, w = text_path(text, size, weight, tracking)
    return f'  <path d="{d}" fill="{fill}"/>', w


# ── Blocky stencil letterset (legacy, kept for riffing — no longer emitted) ────────────────────────────────────────────────
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

    # horizontal lockups: mark + SYMPOZIUM (JetBrains Mono ExtraBold, outlined)
    for variant, primary, accent in (
        ("dark", BONE, EMBER),
        ("light", PANEL, RUST),
    ):
        size = 40 / (cap_height(1.0))  # cap height = 40
        wpath, wwidth = type_svg("SYMPOZIUM", size, primary)[0], text_path("SYMPOZIUM", size)[1]
        mark_size, pad = 88, 30
        baseline = (88 + 40) / 2
        total_w = mark_size + pad + wwidth + 6
        body = f'''  <g transform="scale({88/120:.4f})">
{fn(primary, accent)}
  </g>
  <g transform="translate({mark_size + pad} {baseline:g})">
{wpath}
  </g>'''
        write(f"{name}/logo-horizontal-{variant}.svg", svg(round(total_w), 88, body))

    # social card 1280×640
    wm_size = 64 / cap_height(1.0)              # wordmark cap height 64
    wm_path, _ = type_svg("SYMPOZIUM", wm_size, BONE)[0], 0
    tag_path = type_svg("THE COORDINATION LAYER FOR MULTI-AGENT AI", 21, OLIVE, weight="Medium", tracking=0.10)[0]
    tick_path = type_svg("AGENTS ARE PODS — POLICY IS CRDS — MODELS ARE CLAIMED", 17, OLIVE, weight="Medium", tracking=0.08)[0]
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
  <g transform="translate(392 300)">
{wm_path}
  </g>
  <g transform="translate(394 352)">
{tag_path}
  </g>
  <rect x="60" y="540" width="1160" height="1" fill="{LINE}"/>
  <g transform="translate(60 578)">
{tick_path}
  </g>'''
    write(f"{name}/social-card.svg", svg(1280, 640, card, background=CHARCOAL))


def emit_wordmark():
    for variant, primary, accent in (("dark", BONE, EMBER), ("light", PANEL, RUST)):
        size = 48 / cap_height(1.0)             # cap height 48
        base, pad = 48 + 4, 2
        wpath, wwidth = type_svg("SYMPOZIUM", size, primary)
        body = f'  <g transform="translate({pad} {base})">\n{wpath}\n  </g>'
        write(f"wordmark/wordmark-{variant}.svg", svg(round(wwidth + pad * 2), 60, body))

        # .AI suffix variant, ember accent (echoes the navbar treatment)
        d1, w1 = text_path("SYMPOZIUM", size)
        d2, w2 = text_path(".AI", size)
        gap = 0.045 * size
        body = (f'  <g transform="translate({pad} {base})">\n'
                f'  <path d="{d1}" fill="{primary}"/>\n'
                f'  <g transform="translate({w1 + gap} 0)"><path d="{d2}" fill="{accent}"/></g>\n'
                f'  </g>')
        write(f"wordmark/wordmark-ai-{variant}.svg", svg(round(w1 + gap + w2 + pad * 2), 60, body))


# ── Direction 4 — the Plate (v2 — classic interlock S, brand sheet v2) ─────

def mark_plate(primary, accent=None):
    """Slab-built S with the classic '5-shape' topology — upper-LEFT and
    lower-RIGHT connectors (the v1 enclosed slot + side dash read as a G) —
    plus one interlock notch per slab, 180° rotationally symmetric. Mono by
    design; orange lives in labels, never in the mark."""
    rects = [
        (8, 6, 104, 26),    # top slab
        (8, 32, 50, 16),    # upper-left connector
        (58, 32, 16, 8),    # stepped tooth off the connector
        (8, 48, 104, 24),   # middle bar
        (62, 72, 50, 16),   # lower-right connector
        (46, 80, 16, 8),    # stepped tooth — exact 180° twin
        (8, 88, 104, 26),   # bottom slab
    ]
    return "\n".join(
        f'  <rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{primary}" '
        f'stroke="{primary}" stroke-width="0.8"/>'
        for (x, y, w, h) in rects
    )


def emit_plate():
    name = "plate"
    write(f"{name}/mark-light.svg", svg(120, 120, mark_plate(BROWN3)))
    write(f"{name}/mark-dark.svg", svg(120, 120, mark_plate(PAPER3)))
    write(f"{name}/mark-mono.svg", svg(120, 120, mark_plate("currentColor")))

    # github avatar tile — paper data-plate chip
    inner = f'''  <rect x="5" y="5" width="230" height="230" fill="none" stroke="{SAND3}" stroke-width="2"/>
  <g transform="translate(42 42) scale(1.3)">
{mark_plate(BROWN3)}
  </g>'''
    write(f"{name}/github-avatar.svg", svg(240, 240, inner, background=PAPER3))

    # primary lockup: mark | SYMPOZIUM / AGENTIC CONTROL PLANE / ( K8S-NATIVE )
    for variant, fg in (("light", BROWN3), ("dark", PAPER3)):
        wm_size = 46 / cap_height(1.0, "ChakraPetch-Bold")
        wm, wm_w = type_svg("SYMPOZIUM", wm_size, fg, weight="ChakraPetch-Bold", tracking=0.02)
        l1, l1_w = type_svg("AGENTIC CONTROL PLANE", 14.5, fg, weight="IBMPlexMono-Medium", tracking=0.14)
        l2, l2_w = type_svg("( K8S-NATIVE )", 14.5, ORANGE3, weight="IBMPlexMono-Medium", tracking=0.14)
        mark_h, pad = 96, 26
        total_w = mark_h + pad + 14 + max(wm_w, l1_w) + 8
        body = f'''  <g transform="scale({mark_h/120:.4f})">
{mark_plate(fg)}
  </g>
  <rect x="{mark_h + pad - 14:g}" y="8" width="2" height="{mark_h - 16}" fill="{fg}" opacity="0.35"/>
  <g transform="translate({mark_h + pad} 46)">
{wm}
  </g>
  <g transform="translate({mark_h + pad + 2} 70)">
{l1}
  </g>
  <g transform="translate({mark_h + pad + 2} 90)">
{l2}
  </g>'''
        write(f"{name}/logo-horizontal-{variant}.svg", svg(round(total_w), mark_h, body))

    # wordmarks
    for variant, fg in (("light", BROWN3), ("dark", PAPER3)):
        size = 48 / cap_height(1.0, "ChakraPetch-Bold")
        wpath, wwidth = type_svg("SYMPOZIUM", size, fg, weight="ChakraPetch-Bold", tracking=0.02)
        write(f"{name}/wordmark-{variant}.svg", svg(round(wwidth + 4), 60,
              f'  <g transform="translate(2 52)">\n{wpath}\n  </g>'))

    # social card 1280×640 — light data-plate with spec footer
    wm_size = 66 / cap_height(1.0, "ChakraPetch-Bold")
    wm, _ = type_svg("SYMPOZIUM", wm_size, BROWN3, weight="ChakraPetch-Bold", tracking=0.02)
    tag, _ = type_svg("AGENTIC CONTROL PLANE", 22, BROWN3, weight="IBMPlexMono-Medium", tracking=0.16)
    k8s, _ = type_svg("( K8S-NATIVE )", 22, ORANGE3, weight="IBMPlexMono-Medium", tracking=0.16)
    cells = [("APPLICATION:", "CONTROL PLANE"), ("CLASS:", "MULTI-AGENT"),
             ("STATUS:", "ACTIVE"), ("SPEC REF:", "SYM-BRAND-001"), ("REV:", "A")]
    xw = 1160 / len(cells)
    footer = []
    for i, (k, v) in enumerate(cells):
        x = 60 + i * xw
        kp, _ = type_svg(k, 13, "#8a7a64", weight="IBMPlexMono-Regular", tracking=0.10)
        vp, _ = type_svg(v, 16, ORANGE3 if k == "STATUS:" else BROWN3, weight="IBMPlexMono-Medium", tracking=0.06)
        footer.append(f'  <rect x="{x:g}" y="548" width="{xw:g}" height="62" fill="none" stroke="{SAND3}" stroke-width="1"/>')
        footer.append(f'  <g transform="translate({x + 14:g} 574)">\n{kp}\n  </g>')
        footer.append(f'  <g transform="translate({x + 14:g} 598)">\n{vp}\n  </g>')
    card = f'''  <rect x="10" y="10" width="1260" height="620" fill="none" stroke="{SAND3}" stroke-width="1"/>
  <rect x="1150" y="10" width="120" height="90" fill="{ORANGE3}"/>
  <g transform="translate(1180 72)">
{type_svg("01", 42, PAPER3, weight="ChakraPetch-Bold")[0]}
  </g>
  <g transform="translate(110 180) scale(2.1)">
{mark_plate(BROWN3)}
  </g>
  <g transform="translate(440 330)">
{wm}
  </g>
  <g transform="translate(444 384)">
{tag}
  </g>
  <g transform="translate(444 424)">
{k8s}
  </g>
{chr(10).join(footer)}'''
    write(f"{name}/social-card.svg", svg(1280, 640, card, background=PAPER3))


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    for name, fn in MARKS.items():
        emit_direction(name, fn)
    emit_wordmark()
    emit_plate()
