/* =========================================================
   CarDesk US — All 50 US States + Washington D.C. Database
   Includes: Deadlines, Points Risk, Win Rates, State Tips &
   Official Municipal / County Portal Filing Guides
   ========================================================= */

window.US_STATES_DATA = [
  {
    code: "AL",
    name: "Alabama",
    deadline: "14–30 days",
    pointsRisk: "Parking: 0 pts | Camera: Usually civil (0 pts)",
    dismissalRate: "~30–40%",
    tip: "Municipal courts in Birmingham, Mobile, and Huntsville require written notice or court appearance before the date on the citation. Missing/faded curb markings and clerical plate errors are top defenses.",
    portalGuide: "Issuing Authority: City Municipal Court or Parking Authority (e.g., City of Birmingham Municipal Court / Mobile Parking). Search official .gov portal for '[City] AL Municipal Court pay or contest parking ticket' or check the court address printed on the back of your citation."
  },
  {
    code: "AK",
    name: "Alaska",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Red-light cameras prohibited",
    dismissalRate: "~35–45%",
    tip: "In Anchorage (EasyPark) and Juneau, snow-obscured signs, faded curb paint, and malfunctioning meters are widely accepted dismissal grounds with timestamped photos.",
    portalGuide: "Issuing Authority: EasyPark Anchorage (ACDA) or City & Borough Municipal Clerk. Search 'EasyPark Anchorage dispute citation' or '[City] AK parking ticket appeal' on the official municipal site."
  },
  {
    code: "AZ",
    name: "Arizona",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Photo radar: 2–3 pts if personally served",
    dismissalRate: "~35–45%",
    tip: "Arizona photo-enforcement tickets have strict service-of-process rules (ARS §28-1593). For parking tickets in Phoenix/Tucson, defective signage and wrong vehicle details work best.",
    portalGuide: "Issuing Authority: City Municipal Court (Phoenix Municipal Court, Tucson City Court, Scottsdale City Court). Search '[City] AZ Municipal Court contest parking or photo ticket' on the official .gov court portal."
  },
  {
    code: "AR",
    name: "Arkansas",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Automated cameras restricted",
    dismissalRate: "~30–40%",
    tip: "Check the exact municipal ordinance code printed on the ticket. Missing officer ID, wrong date/time, or unreadable signage photos strongly support dismissal.",
    portalGuide: "Issuing Authority: Local District Court / City Parking Enforcement (e.g., Little Rock District Court). Search '[City] AR District Court traffic parking citation dispute' on the official city/court site."
  },
  {
    code: "CA",
    name: "California",
    deadline: "21 days",
    pointsRisk: "Parking: 0 pts | Red-light camera: 1 DMV point",
    dismissalRate: "~38–48%",
    tip: "Under CVC §40215, you have 21 days to request an Initial Administrative Review. In LA and SF, first-stage reviews often auto-deny—strong photo proof + Plan B Hearing Script dramatically raises win odds.",
    portalGuide: "Issuing Authority: City Parking Violations Bureau / Processing Agency (e.g., LADOT / Los Angeles Parking Violations Bureau, SFMTA Citation Review, City of San Diego Parking Administration, or vendor portals like CitationProcessingCenter / TurboData listed on your ticket). Search '[City] CA contest parking citation online' or check the exact web address printed on the back of your ticket."
  },
  {
    code: "CO",
    name: "Colorado",
    deadline: "20–30 days",
    pointsRisk: "Parking: 0 pts | Photo radar/red-light: 0 pts (civil)",
    dismissalRate: "~35–45%",
    tip: "Denver and Boulder allow online administrative disputes. Snow-covered street-sweeping signs, broken kiosks, and clerical errors on license plates are top grounds.",
    portalGuide: "Issuing Authority: City Parking Magistrate / County Court (e.g., City and County of Denver Parking Magistrate / DenverGov.org, City of Boulder Municipal Court). Search '[City] CO dispute parking ticket online' on the official .gov portal."
  },
  {
    code: "CT",
    name: "Connecticut",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Automated camera: Civil fine (0 pts)",
    dismissalRate: "~35–45%",
    tip: "Connecticut cities (Hartford, New Haven, Stamford) require clear posting of parking restrictions at block entry. Always include a wide-angle street photo showing missing or blocked signs.",
    portalGuide: "Issuing Authority: Municipal Parking Authority / Hearing Officer (e.g., New Haven ParkNewHaven, Hartford Parking Authority, Stamford Transportation). Search '[City] CT contest parking ticket' on the official municipal website."
  },
  {
    code: "DE",
    name: "Delaware",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Red-light camera: Civil (0 pts)",
    dismissalRate: "~32–42%",
    tip: "Wilmington and beach municipalities accept written protests before the due date. Highlight meter receipt screenshots, faded zone markings, or incorrect plate state.",
    portalGuide: "Issuing Authority: City Parking Clerk / Municipal Alderman's Court (e.g., City of Wilmington Parking Ticket Appeal, Rehoboth Beach Alderman's Court). Search '[City] DE parking ticket appeal' on the official .gov site."
  },
  {
    code: "DC",
    name: "District of Columbia (Washington, D.C.)",
    deadline: "30 days (avoid penalty)",
    pointsRisk: "Parking & Photo Enforcement: 0 DMV points",
    dismissalRate: "~40–50%",
    tip: "DC DMV Adjudication Services lets you contest online with up to 4 exhibits. Under DC Code §50-2303, missing required ticket fields (make, plate state, exact block, sign code) often results in dismissal.",
    portalGuide: "Issuing Authority: DC Department of Motor Vehicles (DC DMV) — Adjudication Services. Go to the official dmv.dc.gov portal → 'Tickets' → 'Contest a Ticket' (online, by mail, or virtual hearing) and upload up to 4 exhibits."
  },
  {
    code: "FL",
    name: "Florida",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Red-light camera (NOV): 0 pts",
    dismissalRate: "~38–46%",
    tip: "In Miami, Tampa, and Orlando, Florida Statute §316.0083 governs red-light cameras (Notice of Violation carries no points). For parking, broken PayByPhone/ParkMobile zones and obscured signs are top winners.",
    portalGuide: "Issuing Authority: County Clerk of Courts or Municipal Parking Authority (e.g., Miami-Dade Clerk of Courts / Miami Parking Authority, City of Tampa Parking Division, City of Orlando Parking Bureau). Search '[City/County] FL contest parking citation' on the official .gov or Clerk portal."
  },
  {
    code: "GA",
    name: "Georgia",
    deadline: "14–30 days",
    pointsRisk: "Parking: 0 pts | School-zone/red-light camera: 0 pts",
    dismissalRate: "~32–42%",
    tip: "In Atlanta (ATLPlus) and Savannah, private/municipal operators must post visible signage and accurate location codes. Clerical errors and mobile parking payment receipts frequently get tickets voided.",
    portalGuide: "Issuing Authority: Municipal Parking Operator / Municipal Court (e.g., ATLPlus Atlanta Parking Adjudication, City of Savannah Mobility & Parking Services). Search '[City] GA dispute parking citation' on the official municipal portal."
  },
  {
    code: "HI",
    name: "Hawaii",
    deadline: "21 days",
    pointsRisk: "Parking: 0 pts | Red-light camera pilot: Civil (0 pts)",
    dismissalRate: "~30–40%",
    tip: "Hawaii District Courts allow a Written Statement contesting a notice of parking infraction within 21 days. Attach clear daylight photos of missing curb paint or blocked signs.",
    portalGuide: "Issuing Authority: Hawaii State Judiciary — District Court Traffic Violations Bureau (Honolulu / Maui / Hawaii / Kauai). Search 'Hawaii Judiciary contest parking infraction written statement' on courts.state.hi.us."
  },
  {
    code: "ID",
    name: "Idaho",
    deadline: "14–21 days",
    pointsRisk: "Parking: 0 pts | Automated traffic cameras banned",
    dismissalRate: "~35–45%",
    tip: "Boise (ParkBOI) and other Idaho cities review written appeals online. First-time courtesy reductions and defective meter/signage evidence have high success rates.",
    portalGuide: "Issuing Authority: City Parking Services / Magistrate Court (e.g., City of Boise Parking Services / ParkBOI). Search '[City] ID appeal parking citation' on the official .gov site."
  },
  {
    code: "IL",
    name: "Illinois",
    deadline: "7–21 days",
    pointsRisk: "Parking & Camera (Chicago): 0 pts (civil)",
    dismissalRate: "~38–46%",
    tip: "In Chicago, Illinois law permits contesting by mail or online on 7 statutory grounds, including missing/obscured signs, factual error on the ticket, or vehicle compliance proof.",
    portalGuide: "Issuing Authority: City Department of Finance / Administrative Hearings (e.g., City of Chicago Department of Finance — chicago.gov 'Contest a Ticket' online or by mail; Evanston/Naperville Municipal Hearing). Search '[City] IL contest parking ticket online'."
  },
  {
    code: "IN",
    name: "Indiana",
    deadline: "14–30 days",
    pointsRisk: "Parking: 0 pts | Automated cameras limited",
    dismissalRate: "~32–40%",
    tip: "Indianapolis (ParkIndy) accepts online disputes with photographic proof. Show receipt timestamps from ParkMobile/kiosk or obstructed signage within 14 days to avoid late fees.",
    portalGuide: "Issuing Authority: City Parking Enforcement / Ordinance Violations Bureau (e.g., ParkIndy Indianapolis, Bloomington Parking Services). Search '[City] IN contest parking citation' on the official city portal."
  },
  {
    code: "IA",
    name: "Iowa",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | ATE Camera: Civil (0 pts)",
    dismissalRate: "~35–42%",
    tip: "Iowa municipalities require clear posted hours and calibrated camera signage under state DOT rules. Written appeals citing missing advance warning signs or clerical errors are effective.",
    portalGuide: "Issuing Authority: City Clerk / Traffic & Parking Division (e.g., City of Des Moines Parking, Iowa City Parking & Transportation, Cedar Rapids). Search '[City] IA appeal parking or automated traffic citation'."
  },
  {
    code: "KS",
    name: "Kansas",
    deadline: "14–30 days",
    pointsRisk: "Parking: 0 pts | Automated cameras rarely used",
    dismissalRate: "~32–40%",
    tip: "Wichita, Overland Park, and Lawrence municipal courts review written disputes or clerk protests. Verify exact street address, plate characters, and ordinance code.",
    portalGuide: "Issuing Authority: Municipal Court Clerk (e.g., Wichita Municipal Court, Lawrence Municipal Court, Overland Park). Search '[City] KS Municipal Court contest parking ticket' on the official .gov portal."
  },
  {
    code: "KY",
    name: "Kentucky",
    deadline: "7–14 days",
    pointsRisk: "Parking: 0 pts | Automated red-light cameras banned",
    dismissalRate: "~35–44%",
    tip: "Louisville (PARC) and Lexington (LEXPARK) enforce strict 7-to-14-day appeal windows. Submit meter error proof, loading-zone evidence, or signage obstruction photos immediately.",
    portalGuide: "Issuing Authority: Municipal Parking Authority (e.g., Louisville PARC Parking Authority of River City, Lexington LEXPARK). Search '[City] KY PARC or LEXPARK appeal parking citation' immediately (7–14 day window)."
  },
  {
    code: "LA",
    name: "Louisiana",
    deadline: "15–30 days",
    pointsRisk: "Parking & Photo Safety Cameras: 0 pts (civil)",
    dismissalRate: "~38–48%",
    tip: "New Orleans and Baton Rouge allow administrative hearings for parking and school-zone camera tickets. Verify camera calibration notice, school-zone flashing beacon proof, and sign visibility.",
    portalGuide: "Issuing Authority: City Department of Public Works / Parking Adjudication (e.g., City of New Orleans NOLA.gov Parking & Photo Safety Hearings, Baton Rouge City Court). Search '[City] LA contest parking or photo safety ticket'."
  },
  {
    code: "ME",
    name: "Maine",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Automated traffic cameras banned",
    dismissalRate: "~35–45%",
    tip: "Portland and Bangor accept online/written parking appeals. Winter snow-covered curb markings, malfunctioning meters, and wrong vehicle make/plate are strong grounds.",
    portalGuide: "Issuing Authority: City Parking Division / Treasury (e.g., City of Portland Maine Parking Division). Search '[City] ME appeal parking ticket online' on the official municipal site."
  },
  {
    code: "MD",
    name: "Maryland",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Speed & Red-light cameras: 0 pts",
    dismissalRate: "~36–46%",
    tip: "In Baltimore, Montgomery, and Prince George's counties, Maryland Transportation Article requires proper calibration certificates for camera tickets and accurate statutory descriptions on parking citations.",
    portalGuide: "Issuing Authority: County Department of Transportation / District Court of Maryland (e.g., Baltimore City Dept. of Finance, Montgomery County Parking Management, or District Court trial request). Check the exact agency/court box on your citation."
  },
  {
    code: "MA",
    name: "Massachusetts",
    deadline: "21 days",
    pointsRisk: "Parking: 0 pts | Automated cameras limited",
    dismissalRate: "~40–50%",
    tip: "Under M.G.L. c. 90 §20A½, Boston and Massachusetts cities give 21 days to appeal online or by mail. Faded resident-only signs, obstructed street-cleaning signs, and valid app receipts win frequently.",
    portalGuide: "Issuing Authority: Municipal Parking Clerk (e.g., City of Boston Office of the Parking Clerk — boston.gov, City of Cambridge Traffic & Parking, Somerville). Search '[City] MA Office of the Parking Clerk appeal ticket'."
  },
  {
    code: "MI",
    name: "Michigan",
    deadline: "14–21 days",
    pointsRisk: "Parking: 0 pts | Red-light cameras generally prohibited",
    dismissalRate: "~35–44%",
    tip: "Detroit (ParkDetroit) and Ann Arbor allow online contests. Check for mismatched plate state, missing officer badge, or broken ParkDetroit kiosk proof.",
    portalGuide: "Issuing Authority: Municipal Parking Department / District Court (e.g., City of Detroit Municipal Parking Dept. / ParkDetroit, Ann Arbor 15th District Court). Search '[City] MI contest parking ticket'."
  },
  {
    code: "MN",
    name: "Minnesota",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Camera pilot: Civil (0 pts)",
    dismissalRate: "~35–45%",
    tip: "Minneapolis and St. Paul handle appeals through Hennepin/Ramsey County Violations Bureau. Snow-emergency signage ambiguity and valid meter receipts are leading dismissal reasons.",
    portalGuide: "Issuing Authority: Minnesota Court Payment Center / County Violations Bureau (Hennepin County / Ramsey County). Search 'Minnesota Court Payment Center contest parking citation' on mncourts.gov."
  },
  {
    code: "MS",
    name: "Mississippi",
    deadline: "14–30 days",
    pointsRisk: "Parking: 0 pts | Automated cameras banned",
    dismissalRate: "~30–38%",
    tip: "Request a clerk review or municipal court hearing before the citation date. Document missing posted restriction signs or factual mistakes on the vehicle description.",
    portalGuide: "Issuing Authority: Municipal Court Clerk / City Parking Enforcement (e.g., Jackson, Gulfport, Oxford Municipal Court). Search '[City] MS Municipal Court contest parking ticket'."
  },
  {
    code: "MO",
    name: "Missouri",
    deadline: "14–30 days",
    pointsRisk: "Parking: 0 pts | Automated cameras restricted",
    dismissalRate: "~34–42%",
    tip: "St. Louis and Kansas City allow online/written parking disputes. Verify the exact block number, posted enforcement hours, and payment app timestamp.",
    portalGuide: "Issuing Authority: City Treasurer Parking Violations Bureau / Municipal Court (e.g., City of St. Louis Parking Violations Bureau, Kansas City Municipal Court). Search '[City] MO contest parking citation'."
  },
  {
    code: "MT",
    name: "Montana",
    deadline: "10–15 days",
    pointsRisk: "Parking: 0 pts | Automated traffic cameras banned",
    dismissalRate: "~35–45%",
    tip: "Missoula, Bozeman, and Billings parking commissions accept written appeals online. Clear photos of snow-covered lines, broken meters, or first-time visitor confusion often succeed.",
    portalGuide: "Issuing Authority: City Parking Commission / Municipal Court (e.g., Missoula Parking Commission, City of Bozeman Parking, Billings). Search '[City] MT appeal parking ticket' on the official city website."
  },
  {
    code: "NE",
    name: "Nebraska",
    deadline: "14–30 days",
    pointsRisk: "Parking: 0 pts | Automated cameras not used",
    dismissalRate: "~32–42%",
    tip: "Omaha (ParkOmaha) and Lincoln allow online administrative appeals. Include payment confirmation screenshots or photos proving signage wasn't visible from your parking spot.",
    portalGuide: "Issuing Authority: City Parking Division (e.g., ParkOmaha / City of Omaha Public Works, City of Lincoln Parking Services). Search '[City] NE ParkOmaha or Lincoln appeal parking citation'."
  },
  {
    code: "NV",
    name: "Nevada",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Automated cameras restricted",
    dismissalRate: "~35–45%",
    tip: "City of Las Vegas and Reno permit online administrative protests within 15–30 days. Faded red curbs, incorrect plate/VIN details, and broken pay-stations are strong defenses.",
    portalGuide: "Issuing Authority: City Parking Services / Municipal Court (e.g., City of Las Vegas Parking Services — lasvegasnevada.gov, City of Reno Parking Enforcement). Search '[City] NV dispute parking citation online'."
  },
  {
    code: "NH",
    name: "New Hampshire",
    deadline: "10–15 days",
    pointsRisk: "Parking: 0 pts | Automated cameras banned",
    dismissalRate: "~34–44%",
    tip: "Manchester, Portsmouth, and Concord require prompt written appeals (often 10–15 days). Attach ParkMobile receipts or wide-angle photos showing unreadable winter signage.",
    portalGuide: "Issuing Authority: City Parking Division / Tax Collector (e.g., City of Portsmouth Parking, Manchester Parking Division, Concord). Search '[City] NH appeal parking ticket' on the official .gov portal."
  },
  {
    code: "NJ",
    name: "New Jersey",
    deadline: "14–30 days",
    pointsRisk: "Parking: 0 pts | Red-light cameras banned statewide",
    dismissalRate: "~36–46%",
    tip: "New Jersey Municipal Courts (NJMCdirect) allow online plea/dispute submissions in Newark, Jersey City, and Hoboken. Obstructed street-sweeping signs and clerical ticket errors carry strong weight.",
    portalGuide: "Issuing Authority: New Jersey Municipal Court (NJMCdirect / Online Municipal Case Resolution — e.g., Newark, Jersey City, Hoboken Municipal Court). Go to njcourts.gov / NJMCdirect or search '[City] NJ Municipal Court dispute parking ticket'."
  },
  {
    code: "NM",
    name: "New Mexico",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Speed camera: Civil (0 pts)",
    dismissalRate: "~34–42%",
    tip: "Albuquerque and Santa Fe accept written appeals before the due date. For automated speed citations, check owner-driver identification and required statutory signage.",
    portalGuide: "Issuing Authority: City Municipal Parking / Metropolitan Court (e.g., City of Albuquerque Parking Division, City of Santa Fe Parking Division). Search '[City] NM appeal parking or automated speed citation'."
  },
  {
    code: "NY",
    name: "New York",
    deadline: "30 days",
    pointsRisk: "Parking, Red-Light & Speed Camera: 0 DMV points",
    dismissalRate: "~45–55%",
    tip: "NYC Department of Finance dismisses roughly half of contested tickets. Under NY VTL §238, any missing or inaccurate required element (plate, state, expiration, body type, make, exact place) is grounds for mandatory dismissal.",
    portalGuide: "Issuing Authority: NYC Department of Finance (NYC.gov — 'Pay or Dispute' Parking & Camera Violations, or NYC Pay or Dispute mobile app) or local City/Village Court (Buffalo, Rochester, Syracuse, Albany). Search 'NYC Department of Finance dispute parking ticket' or '[City] NY Parking Violations Bureau'."
  },
  {
    code: "NC",
    name: "North Carolina",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Red-light camera: Civil (0 pts)",
    dismissalRate: "~35–44%",
    tip: "Charlotte (ParkIt), Raleigh, and Durham allow online appeals. Show ParkMobile receipt screenshots, faded curb markings, or missing block signage within 15 days.",
    portalGuide: "Issuing Authority: Municipal Parking Program (e.g., ParkIt Charlotte, City of Raleigh Parking, ParkDurham). Search '[City] NC contest parking citation online' on the official municipal portal."
  },
  {
    code: "ND",
    name: "North Dakota",
    deadline: "14 days",
    pointsRisk: "Parking: 0 pts | Automated cameras not used",
    dismissalRate: "~32–40%",
    tip: "Fargo and Bismarck accept written parking appeals quickly. Weather-obscured markings, meter malfunctions, and clerical citation errors are the most persuasive points.",
    portalGuide: "Issuing Authority: Municipal Court / City Parking Enforcement (e.g., City of Fargo Municipal Court, Bismarck). Search '[City] ND contest parking ticket' on the official city website."
  },
  {
    code: "OH",
    name: "Ohio",
    deadline: "14–30 days",
    pointsRisk: "Parking: 0 pts | Traffic camera: Civil (0 pts)",
    dismissalRate: "~36–45%",
    tip: "Columbus, Cleveland, and Cincinnati allow administrative hearings. Under Ohio law, camera citations require strict municipal compliance and clear notice; parking appeals win on signage and meter proof.",
    portalGuide: "Issuing Authority: City Parking Violations Bureau / Municipal Court (e.g., City of Columbus Parking Violations Bureau, Cleveland Parking Violations Bureau, Cincinnati). Search '[City] OH contest parking citation' on the official .gov portal."
  },
  {
    code: "OK",
    name: "Oklahoma",
    deadline: "10–20 days",
    pointsRisk: "Parking: 0 pts | Automated cameras not used",
    dismissalRate: "~32–40%",
    tip: "Oklahoma City and Tulsa accept online or written contests. Verify exact zone numbers, broken meters, or missing curb restriction paint with clear photos.",
    portalGuide: "Issuing Authority: Municipal Court / City Parking Authority (e.g., OKC Municipal Court / EMBARK Parking, City of Tulsa Municipal Court). Search '[City] OK contest parking ticket'."
  },
  {
    code: "OR",
    name: "Oregon",
    deadline: "30 days",
    pointsRisk: "Parking: 0 pts | Photo radar/red-light: Moving violation risk",
    dismissalRate: "~38–48%",
    tip: "Portland (Multnomah County) allows written explanations by mail or online. Under ORS §810.439, photo citations have strict mailing/driver-ID rules; parking tickets frequently dismiss on Parking Kitty receipt proof.",
    portalGuide: "Issuing Authority: County Circuit Court / Municipal Court (e.g., Multnomah County Circuit Court — Portland Parking & Photo Citations, City of Eugene Municipal Court). Search '[City/County] OR contest parking citation' on courts.oregon.gov."
  },
  {
    code: "PA",
    name: "Pennsylvania",
    deadline: "15–30 days",
    pointsRisk: "Parking & Automated Camera (Philly): 0 pts",
    dismissalRate: "~40–50%",
    tip: "Philadelphia Parking Authority (PPA) and Pittsburgh allow online disputes. Faded/missing street signs, wrong vehicle make/plate, and active meterUP app receipts are top dismissal winners.",
    portalGuide: "Issuing Authority: Philadelphia Parking Authority (PPA — philapark.org 'Dispute a Ticket') or Pittsburgh Parking Court / Municipal Magisterial District Judge. Search 'Philadelphia Parking Authority dispute ticket' or '[City] PA contest parking ticket'."
  },
  {
    code: "RI",
    name: "Rhode Island",
    deadline: "14–30 days",
    pointsRisk: "Parking: 0 pts | School-zone/red-light camera: Civil (0 pts)",
    dismissalRate: "~36–45%",
    tip: "Providence and Newport Municipal Courts review written disputes and evidence photos. Verify school-zone operational hours on camera citations and posted sign visibility for parking.",
    portalGuide: "Issuing Authority: Municipal Court (e.g., Providence Municipal Court, Newport Municipal Court). Search '[City] RI Municipal Court dispute parking or camera ticket' on the official city website."
  },
  {
    code: "SC",
    name: "South Carolina",
    deadline: "14–30 days",
    pointsRisk: "Parking: 0 pts | Automated cameras banned",
    dismissalRate: "~34–42%",
    tip: "Charleston, Columbia, and Greenville allow online parking appeals. Document unreadable signs, broken pay stations, or clerical errors in plate/location.",
    portalGuide: "Issuing Authority: City Parking Services / Municipal Court (e.g., City of Charleston Parking Services, City of Columbia Parking Services, Greenville). Search '[City] SC appeal parking citation'."
  },
  {
    code: "SD",
    name: "South Dakota",
    deadline: "10–15 days",
    pointsRisk: "Parking: 0 pts | Automated cameras prohibited",
    dismissalRate: "~32–40%",
    tip: "Sioux Falls and Rapid City accept written appeals before the due date. Snow-covered markings, meter errors, and wrong vehicle descriptions are best supported with photos.",
    portalGuide: "Issuing Authority: City Parking Enforcement / Magistrate Court (e.g., City of Sioux Falls Parking, Rapid City). Search '[City] SD appeal parking ticket' on the official municipal portal."
  },
  {
    code: "TN",
    name: "Tennessee",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Red-light/speed camera: 0 pts (civil)",
    dismissalRate: "~38–48%",
    tip: "Under TN Code §55-8-198, automated traffic camera citations carry zero points and cannot affect insurance. In Nashville and Memphis, parking appeals win with ParkMobile receipts and signage proof.",
    portalGuide: "Issuing Authority: Metro / City Parking Enforcement or Traffic Violations Bureau (e.g., ParkIt! Downtown Nashville / Metro Nashville General Sessions Traffic Bureau, City of Memphis). Search '[City] TN contest parking citation'."
  },
  {
    code: "TX",
    name: "Texas",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Red-light cameras banned statewide",
    dismissalRate: "~38–46%",
    tip: "Texas banned red-light cameras statewide (HB 1631). For parking citations in Austin, Houston, and Dallas, online adjudication hearings readily dismiss tickets with meter app proof or obscured sign photos.",
    portalGuide: "Issuing Authority: Municipal Court / Parking Adjudication (e.g., Austin Municipal Court, City of Houston Municipal Courts / ParkHouston, City of Dallas Municipal Court). Search '[City] TX Municipal Court contest parking citation' on the official .gov portal."
  },
  {
    code: "UT",
    name: "Utah",
    deadline: "20 days",
    pointsRisk: "Parking: 0 pts | Automated cameras tightly restricted",
    dismissalRate: "~36–45%",
    tip: "Salt Lake City allows online appeals within 20 days to freeze late fees. Wrong plate/color, snow-obscured signs, and broken ParkSLC meters are high-success grounds.",
    portalGuide: "Issuing Authority: City Justice Court / Compliance (e.g., Salt Lake City Justice Court — slc.gov 'Resolve a Parking Ticket', Provo, Park City). Search '[City] UT resolve or dispute parking ticket'."
  },
  {
    code: "VT",
    name: "Vermont",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Automated cameras not used",
    dismissalRate: "~35–44%",
    tip: "Burlington and Montpelier accept written/online parking appeals. ParkMobile transaction proof, winter sign obstruction, and clerical errors are the strongest defenses.",
    portalGuide: "Issuing Authority: City Clerk / Parking Enforcement (e.g., City of Burlington Department of Public Works / ParkBurlington, Montpelier). Search '[City] VT appeal parking ticket' on the official city portal."
  },
  {
    code: "VA",
    name: "Virginia",
    deadline: "15–30 days",
    pointsRisk: "Parking: 0 pts | Red-light/work-zone camera: 0 pts (civil)",
    dismissalRate: "~36–46%",
    tip: "Arlington, Alexandria, and Richmond review written parking protests. Under VA Code §15.2-968.1, photo-monitoring violations carry no DMV points and no insurance impact.",
    portalGuide: "Issuing Authority: County/City Treasurer or General District Court (e.g., Arlington County Treasurer Parking Ticket Dispute, City of Alexandria, Richmond). Search '[City/County] VA dispute parking citation' on the official .gov site."
  },
  {
    code: "WA",
    name: "Washington",
    deadline: "15–30 days",
    pointsRisk: "Parking & Automated Traffic Camera: 0 pts (like parking)",
    dismissalRate: "~40–50%",
    tip: "Seattle Municipal Court lets you contest by mail or online. Under RCW 46.63.170, camera tickets are treated like parking infractions (0 points, no insurance hike) and can be contested if another person was driving or signage was missing.",
    portalGuide: "Issuing Authority: Municipal Court (e.g., Seattle Municipal Court — seattle.gov/courts 'Contest a Ticket' online or by mail, Bellevue, Tacoma). Search '[City] WA Municipal Court contest parking or camera ticket'."
  },
  {
    code: "WV",
    name: "West Virginia",
    deadline: "14–21 days",
    pointsRisk: "Parking: 0 pts | Automated cameras banned",
    dismissalRate: "~32–40%",
    tip: "Charleston and Morgantown allow written protests before the due date. Focus on broken meters, faded curb lines, and factual citation mistakes.",
    portalGuide: "Issuing Authority: Municipal Court / City Parking Authority (e.g., Charleston Municipal Court, Morgantown Parking Authority). Search '[City] WV contest parking ticket' on the official city site."
  },
  {
    code: "WI",
    name: "Wisconsin",
    deadline: "10–28 days",
    pointsRisk: "Parking: 0 pts | Automated traffic cameras banned",
    dismissalRate: "~35–45%",
    tip: "Milwaukee and Madison permit online parking appeals. Document winter alternate-side signage confusion, ParkMilwaukee/MKE Park receipts, or clerical ticket errors.",
    portalGuide: "Issuing Authority: City Violations Bureau / Municipal Court (e.g., City of Milwaukee Violations Bureau — milwaukee.gov, City of Madison Parking Enforcement). Search '[City] WI contest parking citation online'."
  },
  {
    code: "WY",
    name: "Wyoming",
    deadline: "14–30 days",
    pointsRisk: "Parking: 0 pts | Automated cameras banned",
    dismissalRate: "~32–42%",
    tip: "Cheyenne, Laramie, and Jackson allow written parking appeals to the municipal clerk. Clear photos of obstructed signs, broken meters, or incorrect plate info work best.",
    portalGuide: "Issuing Authority: Municipal Court Clerk (e.g., Cheyenne Municipal Court, Laramie, Jackson). Search '[City] WY Municipal Court contest parking ticket' on the official .gov portal."
  }
];
