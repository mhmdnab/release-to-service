/** Plan-view airliner drawing for the cover, with ATA chapter callouts. */
export function Blueprint() {
  return (
    <svg viewBox="0 0 520 470" role="img" aria-labelledby="bp-title">
      <title id="bp-title">
        Plan view of a twin-engine airliner with ATA chapter callouts for navigation, engine, flight controls, fuel,
        landing gear and APU
      </title>
      <path
        className="bp-line"
        style={{ strokeWidth: 1 }}
        d="M4 20V440M4 20h7M4 62h4M4 104h7M4 146h4M4 188h7M4 230h4M4 272h7M4 314h4M4 356h7M4 398h4M4 440h7"
      />
      <g className="bp-small">
        <text x="14" y="23">0</text>
        <text x="14" y="107">200</text>
        <text x="14" y="191">400</text>
        <text x="14" y="275">600</text>
        <text x="14" y="359">800</text>
        <text x="14" y="443">1000</text>
      </g>
      <line className="bp-fine" x1="260" y1="6" x2="260" y2="462" />
      <path className="bp-fill draw" d="M236 182 L40 292 L44 312 L236 264 Z" />
      <path className="bp-fill draw" d="M284 182 L480 292 L476 312 L284 264 Z" />
      <path className="bp-fine" d="M228 257 L150 276 M140 279 L58 299 M292 257 L370 276 M380 279 L462 299" />
      <path className="bp-fill draw" d="M240 372 L160 418 L163 432 L240 410 Z" />
      <path className="bp-fill draw" d="M280 372 L360 418 L357 432 L280 410 Z" />
      <rect className="bp-fill" x="133" y="204" width="28" height="64" rx="9" />
      <rect className="bp-fill" x="359" y="204" width="28" height="64" rx="9" />
      <path className="bp-line" d="M137 214h20M363 214h20" />
      <path
        className="bp-fill draw"
        d="M260 18 C274 20 284 44 285 78 L285 382 C285 406 273 426 260 444 C247 426 235 406 235 382 L235 78 C236 44 246 20 260 18 Z"
      />
      <path className="bp-line" d="M249 50 L255 43 H265 L271 50" />
      <rect className="bp-primer" x="233" y="92" width="4" height="12" />
      <rect className="bp-primer" x="283" y="92" width="4" height="12" />
      <rect className="bp-primer" x="233" y="352" width="4" height="12" />
      <rect className="bp-primer" x="283" y="352" width="4" height="12" />
      <rect className="bp-line" x="256" y="86" width="8" height="14" />
      <rect className="bp-line" x="240" y="250" width="12" height="20" />
      <rect className="bp-line" x="268" y="250" width="12" height="20" />
      <path className="bp-fill" d="M257 350 H263 L262 444 H258 Z" />

      <path className="bp-call" d="M263 26 H330" />
      <circle className="bp-dot" cx="260" cy="26" r="3.5" />
      <text className="bp-label" x="336" y="30">
        <tspan className="bp-code">ATA 34</tspan>
        <tspan className="bp-txt">{" NAVIGATION"}</tspan>
      </text>
      <path className="bp-call" d="M147 208 V160 H40" />
      <circle className="bp-dot" cx="147" cy="212" r="3.5" />
      <text className="bp-label" x="40" y="153">
        <tspan className="bp-code">ATA 72</tspan>
        <tspan className="bp-txt">{" ENGINE"}</tspan>
      </text>
      <path className="bp-call" d="M430 292 V180 H330" />
      <circle className="bp-dot" cx="430" cy="296" r="3.5" />
      <text className="bp-label" x="330" y="173">
        <tspan className="bp-code">ATA 27</tspan>
        <tspan className="bp-txt">{" FLIGHT CONTROLS"}</tspan>
      </text>
      <path className="bp-call" d="M330 244 V340 H512" />
      <circle className="bp-dot" cx="330" cy="240" r="3.5" />
      <text className="bp-label" x="512" y="333" textAnchor="end">
        <tspan className="bp-code">ATA 28</tspan>
        <tspan className="bp-txt">{" FUEL"}</tspan>
      </text>
      <path className="bp-call" d="M243 265 L120 372 H40" />
      <circle className="bp-dot" cx="246" cy="262" r="3.5" />
      <text className="bp-label" x="40" y="388">
        <tspan className="bp-code">ATA 32</tspan>
        <tspan className="bp-txt">{" LANDING GEAR"}</tspan>
      </text>
      <path className="bp-call" d="M263 442 L276 454 H512" />
      <circle className="bp-dot" cx="260" cy="440" r="3.5" />
      <text className="bp-label" x="512" y="448" textAnchor="end">
        <tspan className="bp-code">ATA 49</tspan>
        <tspan className="bp-txt">{" APU"}</tspan>
      </text>
      <text className="bp-small" x="40" y="466">
        PLAN VIEW · NOT TO SCALE · FS STATIONS
      </text>
    </svg>
  );
}
