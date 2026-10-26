// Settings shared by the build scripts. Change values here only.
import { CONTACT } from "../assets/js/data.js";

// Public address of the site (no trailing slash). The bare domain redirects here.
export const SITE_URL = "https://www.senxdev.com";

// Booking page used by the booking buttons on the /ideas pages (set in assets/js/data.js).
// Name and notes are added as ?name=...&notes=... automatically.
export const CAL_URL = CONTACT.booking;

// Call length shown on those buttons.
export const CALL_MINUTES = 15;
