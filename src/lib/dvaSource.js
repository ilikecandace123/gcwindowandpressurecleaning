// Tags quote requests that start from the DVA section (/dva/...), so the
// ServiceM8 job can carry a "DVA enquiry" note. DVA work is billed to DVA at
// DVA's hourly rate, never at the website's fixed prices, so the office needs
// to know before quoting.
//
// A DVA page calls markDvaVisit() when it is viewed. The mark lives in
// sessionStorage, so it follows the visitor to /instant-quote/ in the same
// tab and is gone when they close it. Never throws: a lead must not fail
// because of this.

const KEY = "gcwp_dva_page";

function isDvaPath(pathname) {
  return /^\/dva(\/|$)/.test(String(pathname || ""));
}

export function markDvaVisit(pathname) {
  try {
    if (isDvaPath(pathname)) window.sessionStorage.setItem(KEY, String(pathname).slice(0, 200));
  } catch {
    /* storage unavailable */
  }
}

/** The DVA page this visitor is on or came from, or "" when there is none. */
export function getDvaSource() {
  try {
    const here = window.location.pathname;
    if (isDvaPath(here)) return here;
    return window.sessionStorage.getItem(KEY) || "";
  } catch {
    return "";
  }
}
