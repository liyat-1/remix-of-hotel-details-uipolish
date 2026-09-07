# Remix of Hotel Details-uipolish

Redesign the INTERNAL HOTEL DETAILS page for a hotel management / CSM platform.

IMPORTANT:
This is an INTERNAL CSM / ADMIN page.
It is NOT the client-facing hotel experience.

The existing screenshots are the visual and content reference for the current product. Preserve all existing information and functionality, but completely improve the information architecture, UX hierarchy, layout, spacing, visual hierarchy, interaction patterns, and usability.

The primary design goal is:

1. MOST-USED ITEMS MUST BE EASY TO REACH.
2. SIMILAR INFORMATION MUST BE GROUPED TOGETHER.
3. A CSM SHOULD NOT HAVE TO HUNT THROUGH A LONG LIST OF UNRELATED CARDS.
4. The first screen should immediately answer:
   - What hotel am I looking at?
   - Is the hotel healthy?
   - Is PMS/BE syncing?
   - Who owns this hotel?
   - What actions can I take?
5. Keep all current information and CSM tools. Nothing should be removed; information should be regrouped.

Design desktop-first for an internal admin/CSM workflow.

--------------------------------------------------
CORE UX PRINCIPLES
--------------------------------------------------

Use a clean, modern enterprise SaaS interface.

The page should feel:
- organized
- operational
- trustworthy
- fast to scan
- information-dense but not cluttered
- professional
- calm
- easy to navigate
- optimized for repeated daily CSM use

Do NOT make this feel like a consumer hotel website.

Do NOT prioritize decorative visuals over usability.

Do NOT create a dashboard full of equally weighted cards.

Do NOT simply rearrange the existing cards.

The fundamental change must be INFORMATION ARCHITECTURE.

Create clear visual hierarchy between:
1. Identity
2. Daily actions
3. Health & sync
4. People
5. Legal & billing
6. Service & account
7. Links
8. Additional / lower-frequency settings

--------------------------------------------------
GLOBAL PAGE STRUCTURE
--------------------------------------------------

Create the page in this order:

1. GLOBAL HEADER
2. HOTEL IDENTITY
3. DAILY ACTIONS
4. HEALTH & SYNC
5. PEOPLE
6. LEGAL & BILLING
7. SERVICE & ACCOUNT
8. ADDITIONAL LINKS / SETTINGS

The first viewport should prioritize:
- hotel identity
- primary actions
- health
- PMS/BE sync
- key ownership information

Lower-frequency information should be below the fold or progressively disclosed.

Do not hide high-frequency CSM actions behind tabs, accordions, "Show more", or secondary pages.

--------------------------------------------------
1. GLOBAL HEADER
--------------------------------------------------

Create a compact but highly readable internal admin header.

Left:
- Hotel name
- Hotel ID / display ID

Example:
"Maritime Hotel Fort Lauderdale Airport & Cruiseport"
"#921"

Under or beside the title:
- Public hotel website URL

Right side:
- Demo mode toggle
- View as client
- Current time
- Timezone / currency
- Existing utility icons if necessary

The hotel name must be the strongest text on the page.

The hotel ID should be visually secondary but immediately identifiable.

"View as client" must be treated as a clear action because it is an important CSM workflow.

Do not make Demo Mode and View as Client visually compete with the hotel name.

--------------------------------------------------
2. HOTEL IDENTITY
--------------------------------------------------

Create a dedicated IDENTITY section.

This section establishes:
"What hotel is this?"

Use a horizontal / wide layout rather than the current oversized card.

Recommended structure:

LEFT:
Hotel image / logo

CENTER:
Hotel name
Hotel ID

METADATA GRID:
- Group
- Rooms
- Check-in
- Check-out
- Hotel ID / PMS code
- PMS
- Booking Engine
- Parent chain
- Chain
- Added on

Example:

Group
AD1 Global

Rooms
300

Check-in
4:00 PM

Check-out
11:00 AM

Hotel ID
FLLTA

PMS
Marriott GXP

Parent chain
Marriott

Chain
Marriott Hotels

Added on
Jul 29, 2026

Keep metadata compact and easy to scan.

Use labels in smaller muted text and values in stronger text.

Avoid huge text for ordinary metadata.

The section should have a clear title:
"Identity"

Include a consistent "Edit" affordance in the section header.

--------------------------------------------------
3. DAILY ACTIONS
--------------------------------------------------

Create a dedicated DAILY ACTIONS area immediately after Identity.

This should be highly visible and visually distinct.

The purpose is:
"These are the things a CSM does most often."

Actions:

[ Edit hotel ]
[ View as client ]
[ Get Last OTP ]
[ Check hotel status ]

Potential additional quick actions:
[ Copy email ]

Use one strong primary action:
"Edit hotel"

Use secondary buttons for the remaining actions.

Buttons should be large enough to click comfortably.

Do not bury these actions inside cards.

Do not put them exclusively in a right sidebar.

If the page uses a sticky action bar, it is acceptable and encouraged, provided it does not consume too much vertical space.

The action bar may remain visible while scrolling.

For onboarding hotels:
"Check hotel status" should be prominent.

For live hotels:
"Check hotel status" may become secondary or contextually hidden if not applicable.

The system should clearly communicate when an action is unavailable or unnecessary.

--------------------------------------------------
4. HEALTH & SYNC
--------------------------------------------------

This is one of the most important sections on the entire page.

Create a large HEALTH & SYNC section directly after Daily Actions.

The section should allow a CSM to answer:
"Is this hotel healthy?"
"Is PMS working?"
"Is the booking engine syncing?"
"Is there a problem I need to investigate?"

Create an overall health summary.

Example:

HEALTH & SYNC

3 / 13 healthy
Mixed health

Then show category summaries:

Services & fees       ✓ Healthy
Analytics             ✕ Needs attention
Messaging             ! Warning

Do not make every individual feature equally visually dominant.

Use a summary-first approach with progressive disclosure.

Example:

Services & fees
1 / 1 healthy

Analytics
0 / 5 healthy

Messaging
2 / 7 healthy

[ View feature details ]

When expanded, show the individual features.

Feature states must use:
- healthy
- warning
- failed / unhealthy

Use icons + text, not color alone.

Do not rely only on red/green color because users need accessible status communication.

--------------------------------------------------
PMS / BOOKING ENGINE / PROXY
--------------------------------------------------

Within the Health & Sync cluster, place:

PMS
Marriott GXP

PMS integration
Not integrated

Booking Engine
marriott.com

BE sync
Not synced

Last BE sync
Not synced

Proxy
Active / No proxy / appropriate current status

PMS type and PMS sync status MUST be visually close together.

Do not put PMS type in the header while putting PMS sync far down the page.

If PMS jobs exist:

PMS Jobs

ReservationUpdatesV2     ✓
GuestUpdates              ✓
...

[ View all jobs ]

If PMS is not integrated, make the state extremely clear.

Example:

PMS
Marriott GXP

Status
Not integrated

[ Set up PMS ]

Use the actual available action/state from the product rather than inventing new functionality.

--------------------------------------------------
ONBOARDING STATE
--------------------------------------------------

For onboarding hotels, include onboarding status inside Health & Sync.

Example:

ONBOARDING

Initial Payment Stage

Mandatory steps

Campaign Registry       ✓ Complete
PMS sync                Set up
TripAdvisor             ✓ Complete
Review settings         ✓ Complete
Booking engine           ✓ Complete
Billing & invoice        ✓ Complete

[ Check hotel status ]

The "Check hotel status" action must be easy to reach.

Do not make onboarding status a disconnected sidebar card.

--------------------------------------------------
5. PEOPLE
--------------------------------------------------

Create a dedicated PEOPLE section.

Combine:

Account Team
+
Hotel Emails

These must no longer be separated across different parts of the page.

Title:
"People"

First subsection:

ACCOUNT TEAM

CSM
Lakshay Tyagi

Sales agent
Lindsay Wenger

Referrer
Directful.com

[ Edit ]

Second subsection:

HOTEL EMAILS

Create a clean contact list/table.

Columns:

Name
Role
Email
Action

Example:

Sammie Bashirian
Hotel contact
maritimehotel...
[ Copy ]

Rosetta Herzog
PMS integration
rosetta.herzog...
[ Copy ]

Phoebe Reichel
PMS integration
phoebe.reichel...
[ Copy ]

The copy action must be obvious.

Use a clipboard icon and/or "Copy" text.

After copying:
show a small confirmation:
"Email copied"

Do not make the copy icon microscopic.

Include role chips:
Hotel contact
PMS integration
etc.

Role chips should be subtle and not visually overpower the person name.

--------------------------------------------------
6. LEGAL & BILLING
--------------------------------------------------

Create one unified LEGAL & BILLING section.

Do not separate legal and billing into unrelated cards.

Include:

LEGAL

Legal name
Hotel at Marina Bay LLC

Doing business as
DBA Maritime Hotel - Ft Lauderdale

Support email
clarissa.canaan@...

EIN
65-0955133

TCR / CAMPAIGN

TCR Brand ID
BCJMQXQ [copy]

TCR Campaign ID
CRC1GJ6 [copy]

Campaign Registry
[ View campaign registry ]

TCR status
[ Check status ]

Include the new TCR "Check status" action.

ADDRESSES

Billing address
2161 Maritime Blvd, Fort Lauderdale, FL 33312, USA

Invoice address
2161 Maritime Blvd, Fort Lauderdale, FL 33312, USA

Use a two-column layout for addresses when desktop width allows.

Keep the section compact.

Do not make every field look like an input.

These are primarily read-only details with editing accessed through the consistent Edit pattern.

--------------------------------------------------
7. SERVICE & ACCOUNT
--------------------------------------------------

Create a dedicated SERVICE & ACCOUNT section.

Include:

Service status
Active / Churned

Service started
Aug 01, 2026

Churn date
if applicable

Added on
Jul 29, 2026

Basic account

Set by
Huseyin Kartal

Set on
Aug 14, 2026

Tags
No tags

For churned hotels, visually communicate:

Service status
Churned

Churn date
[date]

Do not hide churn information.

For sparse states:

Tags
No tags

Use a clean empty state rather than a broken-looking card.

Example:
"No tags"
"Add tags"

--------------------------------------------------
8. LINKS
--------------------------------------------------

Create a dedicated Links area.

Include:

Site
TripAdvisor
Privacy
Terms
Hotline

These are useful but lower frequency than Health, Sync, People, etc.

Use compact link rows rather than large cards.

Example:

LINKS

Website                  →
TripAdvisor              →
Privacy                  →
Terms                    →
Hotline                  →

Do not allow Links to visually compete with primary operational information.

--------------------------------------------------
9. ADDITIONAL / LOWER-FREQUENCY SETTINGS
--------------------------------------------------

The following information must remain available but should not compete with the primary first-screen information:

- Plan & Billing
- Billing details
- Billing tax details
- ACH authorization
- Rate codes
- Hosted messaging
- Proxy numbers
- Guest landing page URL
- Preferences
- Loyalty program outreach
- Chatbot help messages
- Booking engine test URL
- Optional onboarding steps
- Chain exclusions
- Management Company Change
- Other low-frequency configuration information

Use progressive disclosure.

Possible pattern:

ADDITIONAL SETTINGS

▸ Plan & Billing
▸ Billing details
▸ ACH authorization
▸ Rate codes
▸ Hosted messaging
▸ Proxy numbers
▸ Guest landing page
▸ Preferences
▸ Other configuration

Do NOT delete these fields.

They simply have lower visual priority.

--------------------------------------------------
10. EDIT PATTERN
--------------------------------------------------

Use ONE consistent edit pattern across the entire page.

Preferred pattern:
Right-side drawer.

When a user clicks Edit:

Open a right-side drawer.

Drawer contains:
- section title
- editable fields
- Save
- Cancel

Example:

Edit Identity

Hotel name
[................]

Group
[................]

Rooms
[................]

[ Cancel ] [ Save changes ]

Use the same interaction pattern for:
- Identity
- People
- Legal
- Billing
- Service & Account
- Tags
- Other editable clusters

Do not mix:
- inline editing
- random modals
- tiny Edit links
- separate full-page edit experiences

unless a specific product constraint requires it.

--------------------------------------------------
11. STICKY BEHAVIOR
--------------------------------------------------

Consider a sticky top area containing:

Hotel name
+
primary actions

While scrolling, retain enough context that the CSM always knows which hotel they are viewing.

Potential sticky structure:

Maritime Hotel Fort Lauderdale Airport & Cruiseport #921

[ Edit hotel ] [ View as client ] [ Get Last OTP ]

Do not make the sticky header excessively tall.

The sticky zone should preserve workspace rather than consume it.

--------------------------------------------------
12. VISUAL DESIGN
--------------------------------------------------

Create a polished enterprise SaaS visual system.

Background:
Very light neutral gray/off-white.

Cards:
White.

Borders:
Subtle.

Shadows:
Very subtle, preferably used sparingly.

Corners:
Moderately rounded, consistent throughout.

Avoid excessive rounded "pill" UI except for:
- statuses
- role chips
- compact labels

Typography:
Use a clean modern sans-serif.

Hierarchy:

Page title:
Large / bold

Section titles:
Medium / semibold

Field labels:
Small / muted

Field values:
Medium / semibold

Status:
Semibold

Body:
Regular

Do not make everything bold.

Spacing:
Use generous whitespace between major clusters.

Use a consistent spacing system.

Suggested:
4px base grid.

Examples:
8px small gap
12px compact gap
16px standard gap
24px component gap
32px section gap
40–48px major section spacing

Avoid both:
- cramped fields
- enormous empty areas

The current page has areas where the layout feels unnecessarily sparse while other areas are overloaded. Balance the density.

--------------------------------------------------
13. CARD DESIGN
--------------------------------------------------

Do not create dozens of isolated cards.

Instead use fewer, larger semantic sections.

Each section should have:

[Section title]                         [Edit]

short description if necessary

content

Example:

HEALTH & SYNC                                  [Details]

3 / 13 healthy

Services        ✓ Healthy
Analytics      ✕ Needs attention
Messaging       ! Warning

PMS             Marriott GXP
PMS sync        Not integrated
BE sync         Not synced
Proxy           Active

Use dividers within sections instead of turning every piece of information into its own card.

--------------------------------------------------
14. STATUS DESIGN
--------------------------------------------------

Create a consistent status system.

Healthy:
check icon + "Healthy"

Warning:
warning icon + "Warning"

Failed:
X icon + "Failed"

Not integrated:
neutral status + "Not integrated"

Not synced:
appropriate warning/error state + "Not synced"

Do not communicate status using color alone.

Every status should include:
- icon
- text
- optionally color

Use status colors carefully and consistently.

Do not make the entire card red because one field failed.

Highlight the problem, not the entire interface.

--------------------------------------------------
15. EMPTY STATES
--------------------------------------------------

Design intentional empty states.

Examples:

Tags
No tags
[ Add tag ]

Hotel Emails
No hotel emails available.

Legal
Legal information has not been added.

PMS Jobs
No PMS jobs found.

Subsidiary Documents
No documents found.

Empty states should feel intentional and informative.

Do not use huge blank areas.

--------------------------------------------------
16. RESPONSIVE / TABLET
--------------------------------------------------

Primary design is desktop-first.

Also provide a tablet adaptation.

On tablet:
- reduce horizontal columns
- stack metadata intelligently
- preserve Daily Actions near the top
- preserve Health & Sync visibility
- avoid horizontal overflow
- keep important actions reachable

Do not simply shrink the desktop layout.

--------------------------------------------------
17. FIRST SCREEN REQUIREMENT
--------------------------------------------------

The first viewport is extremely important.

When a CSM opens the page, they should see:

1. Hotel identity
2. Daily actions
3. Overall health
4. PMS / BE sync
5. Basic ownership/context

WITHOUT NEEDING TO SCROLL.

At minimum, these should be immediately accessible:

- View as client
- Edit hotel
- Feature health
- PMS / BE sync
- Hotel emails
- Get Last OTP
- Check hotel status when onboarding
- Account Team

Do not place these behind "Show more".

--------------------------------------------------
18. INFORMATION HIERARCHY
--------------------------------------------------

Use this priority order:

HIGH PRIORITY

1. Hotel identity
2. Daily actions
3. Health
4. PMS sync
5. BE sync
6. Account ownership

MEDIUM PRIORITY

7. Hotel emails
8. Legal
9. TCR
10. Billing addresses
11. Service timeline
12. Churn status
13. Tags

LOWER PRIORITY

14. Plan & Billing
15. ACH
16. Rate codes
17. Hosted messaging
18. Proxy numbers
19. Guest landing page
20. Preferences
21. Other configuration

Everything remains available.

The difference is VISUAL PRIORITY, not data removal.

--------------------------------------------------
19. REQUIRED DESIGN STATES
--------------------------------------------------

Create separate Figma frames for:

FRAME 1:
Live hotel — default state

FRAME 2:
Onboarding hotel

FRAME 3:
Unhealthy / mixed health

Example:
5 / 13 healthy
PMS failed
BE not synced
Proxy state visible

FRAME 4:
Churned / service ended

Include:
Service started
Churn date
Churned status

FRAME 5:
Empty / sparse hotel

Include:
No tags
Missing emails
Missing legal/TCR
No PMS jobs

FRAME 6:
Edit interaction

Show the consistent edit drawer.

--------------------------------------------------
20. IMPORTANT CONTENT PRESERVATION
--------------------------------------------------

Do not remove any current hotel-detail information.

The redesign must retain:

- hotel name
- hotel ID
- hotel image
- website
- group
- rooms
- check-in/out
- PMS
- BE
- parent chain
- chain
- last BE sync
- proxy information
- Demo mode
- View as client
- Edit hotel
- Basic account
- Tags
- Billing address
- Invoice address
- Feature status
- Legal information
- support email
- EIN
- TCR Brand ID
- TCR Campaign ID
- Campaign Registry
- PMS sync
- PMS jobs
- Account Team
- service start date
- churn date
- hotel emails
- Get Last OTP
- Check hotel status
- TCR Check status
- Site
- TripAdvisor
- Privacy
- Terms
- Hotline
- Plan & Billing
- ACH
- billing details
- billing tax details
- rate codes
- booking engine
- guest landing page
- proxy numbers
- hosted messaging
- preferences
- loyalty outreach
- chatbot help
- management company change
- chain exclusions
- other existing lower-frequency configuration

If something is moved, it should be clearly regrouped into the correct cluster.

--------------------------------------------------
21. DO NOT DO THESE THINGS
--------------------------------------------------

Do NOT:

- redesign this as a consumer hotel page
- remove existing data
- create a giant dashboard
- keep the existing right sidebar as the primary information architecture
- scatter related information across the page
- put PMS type in one place and PMS sync somewhere unrelated
- put Account Team and Hotel Emails far apart
- bury health below the fold
- bury daily actions
- hide high-frequency actions behind accordions
- create a different Edit interaction for every card
- make every card visually equal
- use huge decorative hotel imagery
- overuse shadows
- overuse rounded containers
- make every item a pill
- rely only on color for status
- create unnecessary tabs
- introduce unapproved product functionality
- redesign the client-facing experience

--------------------------------------------------
22. FINAL UX TEST
--------------------------------------------------

Before considering the design complete, perform this mental usability test:

A CSM opens Hotel #921.

Can they answer within 5 seconds:

"What hotel is this?"

"Who owns it?"

"Is it healthy?"

"Is PMS working?"

"Is BE synced?"

"What is wrong?"

"Can I edit the hotel?"

"Can I view the client experience?"

"Can I get the latest OTP?"

"Where are the hotel contacts?"

"Where are the legal/billing details?"

If the answer to any of these requires hunting through the page, improve the hierarchy.

The final design should feel like a professional internal operations workspace rather than a collection of accumulated admin cards.

The core success criteria are:

MOST-USED ITEMS = EASY TO REACH

SIMILAR ITEMS = GROUPED TOGETHER

ALL EXISTING INFORMATION = PRESERVED

FIRST SCREEN = IDENTITY + ACTIONS + HEALTH + SYNC

LOW-FREQUENCY INFORMATION = AVAILABLE BUT QUIETER

CONSISTENT EDIT PATTERN = THROUGHOUT

DESKTOP FIRST + TABLET CONSIDERED

Create the final design in Figma with all required states and clear component hierarchy.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b1d1f9a9-509f-4d8c-bd3a-51ac931d1cf4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
