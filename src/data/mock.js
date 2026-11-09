// Centralised demonstration data. Swap these objects for API responses later.
const U = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  hero: U("photo-1461896836934-ffe607ba8211", 1800),
  stadium: U("photo-1461896836934-ffe607ba8211", 1200),
  classroom: U("photo-1503676260728-1c00da094a0b", 1200),
  graduation: U("photo-1541339907198-e08756dedf3f", 1200),
  library: U("photo-1427504494785-3a9ca7044f45", 1200),
  basketball: U("photo-1546519638-68e109498ffc", 1200),
  court: U("photo-1519861531473-9200262188bf", 1200),
  soccer: U("photo-1517649763962-0c623066013b", 1200),
  kids: U("photo-1580582932707-520aed937b7b", 1200),
  fitness: U("photo-1571019613454-1cb2f99b2d8b", 1200),
  science: U("photo-1532094349884-543bc11b234d", 1200),
  product: U("photo-1587049352846-4a222e784d38", 1200),
};

export const LOGO = "https://media.base44.com/images/public/user_6aede056a5b418f3b0e6f0e9/8c869db80_WhatsAppImage2026-11-06at74047PM.jpeg";

export const impactStats = [
  { label: "Raised by schools", value: "$8.4M", note: "demonstration total" },
  { label: "Campaigns funded", value: "1,240", note: "across 38 states" },
  { label: "Supporters engaged", value: "96,400", note: "donors & buyers" },
  { label: "Avg. goal reached", value: "112%", note: "of target" },
];

export const campaigns = [
  {
    id: "c1",
    slug: "northgate-track-nationals",
    title: "Send Northgate Track to Nationals",
    school: "Northgate High School",
    schoolSlug: "northgate-high",
    category: "Sports",
    goal: 45000,
    raised: 31750,
    supporters: 412,
    cover: IMAGES.stadium,
    status: "Active",
    deadline: "Dec 14, 2026",
    featured: true,
    summary:
      "Twenty-two student-athletes qualified for the national meet. Help cover travel, lodging and entry fees so every runner can compete.",
    story:
      "For the first time in school history, Northgate's track program qualified a full squad for the national championships. The team has trained through the winter, six mornings a week, on a track that is older than most of its athletes.\n\nQualifying was the easy part. Getting everyone to the start line is not. Travel, lodging, entry fees and uniforms for twenty-two athletes add up quickly, and our district budget does not cover post-season competition.\n\nEvery dollar raised goes directly to athlete travel. Any funds beyond our goal will seed next season's travel fund so the next qualifying class does not have to start from zero.",
    updates: [
      { date: "Nov 02, 2026", title: "Team bus secured", body: "Thanks to 412 supporters we booked the charter bus this morning. Next milestone: lodging." },
      { date: "Oct 21, 2026", title: "72% of goal in three weeks", body: "Alumni families matched the first $5,000 — the response has been incredible." },
    ],
    teamIds: ["t1"],
  },
  {
    id: "c2",
    slug: "riverside-stem-lab",
    title: "Build Riverside's New STEM Lab",
    school: "Riverside Academy",
    schoolSlug: "riverside-academy",
    category: "Schools",
    goal: 60000,
    raised: 38700,
    supporters: 289,
    cover: IMAGES.science,
    status: "Active",
    deadline: "Jan 30, 2027",
    featured: true,
    summary:
      "A modern lab with robotics benches, 3D printers and safety stations for 640 students across grades 6–12.",
    story:
      "Our current lab runs on equipment from 2009. Students share eight workstations between classes of thirty.\n\nA renovated lab means every student gets hands-on time with the tools their coursework requires, and our robotics team finally has a permanent build space.",
    updates: [{ date: "Oct 28, 2026", title: "Equipment vendor selected", body: "Three quotes reviewed; the committee chose the vendor with the strongest service plan." }],
    teamIds: ["t2"],
  },
  {
    id: "c3",
    slug: "lakeview-weight-room",
    title: "Lakeview Athletics Weight Room",
    school: "Lakeview Prep",
    schoolSlug: "lakeview-prep",
    category: "Athletics",
    goal: 80000,
    raised: 61200,
    supporters: 534,
    cover: IMAGES.fitness,
    status: "Active",
    deadline: "Feb 08, 2027",
    featured: true,
    summary:
      "Strength equipment, flooring and safety upgrades for 14 athletic programs sharing one facility.",
    story:
      "Fourteen programs, one weight room, and forty-year-old racks. This campaign rebuilds the floor, replaces the racks and adds a trainer station so every athlete trains safely.",
    updates: [{ date: "Nov 04, 2026", title: "Flooring funded", body: "The first $40,000 unlocked the flooring package. Equipment is next." }],
    teamIds: ["t3"],
  },
  {
    id: "c4",
    slug: "summit-ridge-marching-band",
    title: "Summit Ridge Marching Band Season",
    school: "Summit Ridge High",
    schoolSlug: "summit-ridge-high",
    category: "Clubs",
    goal: 25000,
    raised: 18900,
    supporters: 203,
    cover: IMAGES.kids,
    status: "Active",
    deadline: "Dec 01, 2026",
    summary: "Instruments, uniforms and transportation for a 96-member marching band competing statewide.",
    story: "Our band doubled in size in two years. Uniforms and instrument repair are the two things standing between this group and a full competition season.",
    updates: [],
    teamIds: ["t4"],
  },
  {
    id: "c5",
    slug: "harbor-point-library",
    title: "Renovate the Harbor Point Library",
    school: "Harbor Point School",
    schoolSlug: "harbor-point-school",
    category: "Schools",
    goal: 35000,
    raised: 34210,
    supporters: 618,
    cover: IMAGES.library,
    status: "Almost funded",
    deadline: "Nov 30, 2026",
    summary: "New shelving, study pods and a quiet reading room for the school's most-used space.",
    story: "The library serves 900 visits a week. New shelving and study pods will let us open the mezzanine for the first time in a decade.",
    updates: [{ date: "Nov 05, 2026", title: "98% there", body: "Only $790 to go before the mezzanine build begins." }],
    teamIds: ["t5"],
  },
  {
    id: "c6",
    slug: "cedar-falls-girls-soccer",
    title: "Cedar Falls Girls Soccer Travel Fund",
    school: "Cedar Falls Academy",
    schoolSlug: "cedar-falls-academy",
    category: "Sports",
    goal: 20000,
    raised: 12450,
    supporters: 178,
    cover: IMAGES.soccer,
    status: "Active",
    deadline: "Jan 12, 2027",
    summary: "Fuel the season: travel, tournament fees and gear for 24 players and three coaches.",
    story: "Twelve away games, four tournaments and one very old minibus. Support keeps the season affordable for every family.",
    updates: [],
    teamIds: ["t6"],
  },
  {
    id: "c7",
    slug: "northgate-robotics-worlds",
    title: "Northgate Robotics to Worlds",
    school: "Northgate High School",
    schoolSlug: "northgate-high",
    category: "Clubs",
    goal: 30000,
    raised: 9850,
    supporters: 96,
    cover: IMAGES.science,
    status: "Active",
    deadline: "Feb 20, 2027",
    summary: "Registration, parts and travel for a team that qualified for the world championship in its second year.",
    story: "Eight students, one robot, and a shot at the world stage. Help us get the crate and the crew to Houston.",
    updates: [],
    teamIds: [],
  },
  {
    id: "c8",
    slug: "riverside-playground",
    title: "Riverside Community Playground",
    school: "Riverside Academy",
    schoolSlug: "riverside-academy",
    category: "Community",
    goal: 50000,
    raised: 22750,
    supporters: 254,
    cover: IMAGES.graduation,
    status: "Active",
    deadline: "Mar 15, 2027",
    summary: "An accessible playground open to the whole neighbourhood, built with inclusive equipment.",
    story: "This playground is a shared community asset. Inclusive surfacing, ramp access and sensory equipment are the priority.",
    updates: [],
    teamIds: [],
  },
];

export const schools = [
  { id: "s1", slug: "northgate-high", name: "Northgate High School", city: "Portland, OR", type: "Public High School", students: 1420, campaigns: 4, raised: 184500, status: "Verified" },
  { id: "s2", slug: "riverside-academy", name: "Riverside Academy", city: "Austin, TX", type: "Private Academy", students: 860, campaigns: 3, raised: 132900, status: "Verified" },
  { id: "s3", slug: "lakeview-prep", name: "Lakeview Prep", city: "Denver, CO", type: "Private Prep", students: 640, campaigns: 2, raised: 198400, status: "Verified" },
  { id: "s4", slug: "summit-ridge-high", name: "Summit Ridge High", city: "Boise, ID", type: "Public High School", students: 1180, campaigns: 3, raised: 96700, status: "Verified" },
  { id: "s5", slug: "harbor-point-school", name: "Harbor Point School", city: "Boston, MA", type: "K-12 School", students: 720, campaigns: 2, raised: 141200, status: "Verified" },
  { id: "s6", slug: "cedar-falls-academy", name: "Cedar Falls Academy", city: "Nashville, TN", type: "Private Academy", students: 540, campaigns: 1, raised: 62450, status: "Pending review" },
];

export const teams = [
  { id: "t1", slug: "northgate-track", name: "Northgate Track & Field", campaignSlug: "northgate-track-nationals", campaign: "Send Northgate Track to Nationals", school: "Northgate High School", image: IMAGES.stadium, goal: 45000, raised: 31750, participants: 22, coach: "Coach Diane Reyes", description: "Twenty-two athletes, six mornings a week, one shot at the national meet." },
  { id: "t2", slug: "riverside-robotics", name: "Riverside Robotics", campaignSlug: "riverside-stem-lab", campaign: "Build Riverside's New STEM Lab", school: "Riverside Academy", image: IMAGES.science, goal: 20000, raised: 14300, participants: 16, coach: "Mr. Alan Whitfield", description: "The build team behind the lab — and the robots that will live in it." },
  { id: "t3", slug: "lakeview-football", name: "Lakeview Varsity Football", campaignSlug: "lakeview-weight-room", campaign: "Lakeview Athletics Weight Room", school: "Lakeview Prep", image: IMAGES.fitness, goal: 30000, raised: 24800, participants: 48, coach: "Coach Marcus Hale", description: "Fourteen programs share this room. The football squad leads the rebuild." },
  { id: "t4", slug: "summit-ridge-band", name: "Summit Ridge Marching Band", campaignSlug: "summit-ridge-marching-band", campaign: "Summit Ridge Marching Band Season", school: "Summit Ridge High", image: IMAGES.kids, goal: 25000, raised: 18900, participants: 96, coach: "Ms. Priya Raman", description: "Ninety-six musicians, one halftime show, a full competition season." },
  { id: "t5", slug: "harbor-point-library-crew", name: "Harbor Point Library Crew", campaignSlug: "harbor-point-library", campaign: "Renovate the Harbor Point Library", school: "Harbor Point School", image: IMAGES.library, goal: 35000, raised: 34210, participants: 34, coach: "Ms. Ellen Cho", description: "Student volunteers leading the library renovation effort." },
  { id: "t6", slug: "cedar-falls-soccer", name: "Cedar Falls Girls Soccer", campaignSlug: "cedar-falls-girls-soccer", campaign: "Cedar Falls Girls Soccer Travel Fund", school: "Cedar Falls Academy", image: IMAGES.soccer, goal: 20000, raised: 12450, participants: 24, coach: "Coach Lena Ortiz", description: "Twelve away games and four tournaments — powered by this squad." },
];

export const participants = [
  { id: "p1", slug: "maya-ellis", name: "Maya Ellis", initials: "ME", teamSlug: "northgate-track", team: "Northgate Track & Field", school: "Northgate High School", campaignSlug: "northgate-track-nationals", campaign: "Send Northgate Track to Nationals", image: IMAGES.stadium, goal: 2500, raised: 2180, supporters: 46, role: "Team captain · 800m", message: "I've run on this track since sixth grade. Nationals would be the first time our squad competes at that level — and your support gets me to the start line." },
  { id: "p2", slug: "andre-walsh", name: "Andre Walsh", initials: "AW", teamSlug: "northgate-track", team: "Northgate Track & Field", school: "Northgate High School", campaignSlug: "northgate-track-nationals", campaign: "Send Northgate Track to Nationals", image: IMAGES.stadium, goal: 2000, raised: 1640, supporters: 31, role: "4x400 relay", message: "Our relay team has been chasing a qualifying time all season. Help us finish the job." },
  { id: "p3", slug: "priya-nair", name: "Priya Nair", initials: "PN", teamSlug: "riverside-robotics", team: "Riverside Robotics", school: "Riverside Academy", campaignSlug: "riverside-stem-lab", campaign: "Build Riverside's New STEM Lab", image: IMAGES.science, goal: 3000, raised: 2455, supporters: 58, role: "Build lead", message: "I want the next class to build robots with tools that actually work. That's what this lab is about." },
  { id: "p4", slug: "jordan-okafor", name: "Jordan Okafor", initials: "JO", teamSlug: "lakeview-football", team: "Lakeview Varsity Football", school: "Lakeview Prep", campaignSlug: "lakeview-weight-room", campaign: "Lakeview Athletics Weight Room", image: IMAGES.fitness, goal: 4000, raised: 3120, supporters: 74, role: "Defensive line", message: "Three sports share one rack. Help us build a room the whole school can train in." },
  { id: "p5", slug: "sofia-marquez", name: "Sofia Marquez", initials: "SM", teamSlug: "summit-ridge-band", team: "Summit Ridge Marching Band", school: "Summit Ridge High", campaignSlug: "summit-ridge-marching-band", campaign: "Summit Ridge Marching Band Season", image: IMAGES.kids, goal: 1500, raised: 890, supporters: 22, role: "Drumline", message: "My section has three working drums between eight of us. Every gift gets us closer to a full set." },
  { id: "p6", slug: "ellis-cho", name: "Ellis Cho", initials: "EC", teamSlug: "harbor-point-library-crew", team: "Harbor Point Library Crew", school: "Harbor Point School", campaignSlug: "harbor-point-library", campaign: "Renovate the Harbor Point Library", image: IMAGES.library, goal: 2000, raised: 1980, supporters: 63, role: "Library volunteer", message: "I spend two afternoons a week reshelving. Imagine what a renovated room would mean." },
];

export const donations = [
  { id: "d1", donor: "The Alvarez Family", campaign: "Send Northgate Track to Nationals", amount: 250, date: "2026-11-05", anonymous: false, message: "Go get them, Maya!", method: "Card" },
  { id: "d2", donor: "Anonymous", campaign: "Build Riverside's New STEM Lab", amount: 1000, date: "2026-11-05", anonymous: true, message: "", method: "Card" },
  { id: "d3", donor: "Marcus Reed", campaign: "Lakeview Athletics Weight Room", amount: 500, date: "2026-11-04", anonymous: false, message: "Alumni match — proud of this program.", method: "Card" },
  { id: "d4", donor: "Hannah Park", campaign: "Renovate the Harbor Point Library", amount: 100, date: "2026-11-04", anonymous: false, message: "", method: "Bank transfer" },
  { id: "d5", donor: "Nguyen Family", campaign: "Summit Ridge Marching Band Season", amount: 75, date: "2026-11-03", anonymous: false, message: "For the drumline!", method: "Card" },
  { id: "d6", donor: "Anonymous", campaign: "Cedar Falls Girls Soccer Travel Fund", amount: 250, date: "2026-11-03", anonymous: true, message: "", method: "Card" },
  { id: "d7", donor: "Priyanka Sethi", campaign: "Send Northgate Track to Nationals", amount: 50, date: "2026-11-02", anonymous: false, message: "", method: "Card" },
  { id: "d8", donor: "Thomas Bell", campaign: "Lakeview Athletics Weight Room", amount: 1200, date: "2026-11-02", anonymous: false, message: "Happy to help the whole department.", method: "Bank transfer" },
  { id: "d9", donor: "The Osei Family", campaign: "Build Riverside's New STEM Lab", amount: 300, date: "2026-11-01", anonymous: false, message: "", method: "Card" },
  { id: "d10", donor: "Grace Lin", campaign: "Renovate the Harbor Point Library", amount: 25, date: "2026-11-01", anonymous: false, message: "Thank you for the quiet room.", method: "Card" },
];

export const products = [
  { id: "pr1", slug: "northgate-spirit-card", name: "Northgate Spirit Discount Card", category: "Discount Cards", school: "Northgate High School", price: 20, goal: 15000, raised: 11460, cover: IMAGES.court, description: "Ten local partners, one card, a full year of savings. Sellers keep 70% of every card sold.", sellerShare: "70%", items: 12 },
  { id: "pr2", slug: "lakeview-coffee-drive", name: "Lakeview Coffee Fundraiser", category: "Food Products", school: "Lakeview Prep", price: 18, goal: 12000, raised: 7380, cover: IMAGES.product, description: "Locally roasted whole-bean coffee in three roasts, delivered to the school in one shipment.", sellerShare: "45%", items: 8 },
  { id: "pr3", slug: "riverside-team-hoodie", name: "Riverside Team Hoodie", category: "School Merchandise", school: "Riverside Academy", price: 45, goal: 9000, raised: 5625, cover: IMAGES.kids, description: "Heavyweight fleece hoodie in school colors with the athletics crest embroidered on the chest.", sellerShare: "38%", items: 5 },
  { id: "pr4", slug: "summit-ridge-snack-box", name: "Summit Ridge Snack Box", category: "Food Products", school: "Summit Ridge High", price: 32, goal: 6000, raised: 4150, cover: IMAGES.product, description: "A curated box of locally made snacks, packed by the band boosters and delivered to your door.", sellerShare: "50%", items: 9 },
  { id: "pr5", slug: "cedar-falls-water-bottle", name: "Cedar Falls Steel Bottle", category: "Merchandise", school: "Cedar Falls Academy", price: 24, goal: 5000, raised: 2180, cover: IMAGES.court, description: "Insulated 24oz steel bottle with laser-engraved academy mark. Ships in two weeks.", sellerShare: "42%", items: 4 },
];

export const successStories = [
  { id: "ss1", slug: "northgate-track", school: "Northgate High School", title: "A full squad to nationals", raised: 45000, goal: 45000, image: IMAGES.stadium, excerpt: "Twenty-two athletes, one community, and a goal met eleven days early after an alumni match unlocked the final stretch." },
  { id: "ss2", slug: "lakeview-weight-room", school: "Lakeview Prep", title: "One room, fourteen programs", raised: 80000, goal: 80000, image: IMAGES.fitness, excerpt: "A department-wide campaign replaced forty-year-old equipment and gave every team a safe place to train." },
  { id: "ss3", slug: "harbor-point-library", school: "Harbor Point School", title: "The library reopens its mezzanine", raised: 35000, goal: 35000, image: IMAGES.library, excerpt: "Student volunteers ran the peer-to-peer side of the campaign and brought in 618 supporters." },
  { id: "ss4", slug: "riverside-stem-lab", school: "Riverside Academy", title: "Robotics finds a permanent home", raised: 60000, goal: 60000, image: IMAGES.science, excerpt: "Corporate matches plus a product fundraiser covered the lab build in a single semester." },
];

export const testimonials = [
  { id: "tm1", quote: "We stopped chasing paper order forms. Teams share one link, families track their own progress, and I can see every dollar move in real time.", name: "Diane R.", role: "Athletic Director", school: "Northgate High School" },
  { id: "tm2", quote: "The participant pages changed everything. Kids felt ownership, parents shared without being asked twice, and our goal was covered in three weeks.", name: "Marcus H.", role: "Head Coach", school: "Lakeview Prep" },
  { id: "tm3", quote: "Reports that used to take a weekend now take a minute. Payouts are clear, donors are thanked automatically, and our board finally trusts the numbers.", name: "Ellen C.", role: "Development Director", school: "Harbor Point School" },
];

export const solutions = [
  { slug: "school-fundraising", title: "School Fundraising", image: IMAGES.classroom, description: "Whole-school campaigns for facilities, programs and annual funds — with one dashboard for every grade and department." },
  { slug: "sports-team-fundraising", title: "Sports Team Fundraising", image: IMAGES.soccer, description: "Team pages, individual athlete pages and travel funds that update live as supporters give." },
  { slug: "athletic-department-fundraising", title: "Athletic Department Fundraising", image: IMAGES.fitness, description: "Run every program under one roof with shared goals, departmental reporting and clean payouts." },
  { slug: "club-fundraising", title: "Club Fundraising", image: IMAGES.kids, description: "Band, robotics, debate, dance — give every club a professional campaign without the spreadsheet." },
  { slug: "student-organization-fundraising", title: "Student Organization Fundraising", image: IMAGES.library, description: "Student-led campaigns with approval workflows so advisors stay in control and students stay motivated." },
  { slug: "product-fundraising", title: "Product Fundraising", image: IMAGES.product, description: "Discount cards, food, merchandise and seasonal catalogues with per-seller tracking built in." },
  { slug: "direct-donation-fundraising", title: "Direct Donation Fundraising", image: IMAGES.graduation, description: "Give today. Simple, single-page donation campaigns for the moments that cannot wait." },
];

export const howItWorks = [
  { step: "01", title: "Create Your Fundraiser", body: "Set a goal, add your story and photos, and publish a campaign page in minutes. No paperwork, no spreadsheets.", icon: "flag" },
  { step: "02", title: "Build Your Team", body: "Add coaches, captains and participants. Each person gets a personal page with their own goal and progress.", icon: "users" },
  { step: "03", title: "Share With Supporters", body: "One link per participant, plus email, text and social share kits. Supporters give in under a minute.", icon: "share" },
  { step: "04", title: "Reach Your Goal", body: "Watch progress live, thank donors automatically and receive a clear payout when the campaign closes.", icon: "target" },
];

export const whyChoose = [
  { title: "Built for schools, not adapted for them", body: "Approval workflows, advisor permissions and district-friendly reporting from day one." },
  { title: "Team and participant pages included", body: "Every athlete, club member and seller gets their own page with a goal and a live leaderboard." },
  { title: "Direct donations and products in one place", body: "Run a donation campaign and a product drive side by side without juggling tools." },
  { title: "Transparent reporting", body: "Live totals, donor detail, exportable reports and a clean audit trail for your board." },
  { title: "No donor fees at checkout", body: "Supporters see the amount they choose. Platform fees are shown up front, never pulled from gifts." },
  { title: "Real people when you need them", body: "A campaign coach reviews every fundraiser before launch and stays reachable through the season." },
];

export const growthSeries = [
  { month: "Jun", raised: 42000, donations: 180 },
  { month: "Jul", raised: 58000, donations: 240 },
  { month: "Aug", raised: 51000, donations: 212 },
  { month: "Sep", raised: 74000, donations: 318 },
  { month: "Oct", raised: 96000, donations: 402 },
  { month: "Nov", raised: 118000, donations: 486 },
];

export const trendSeries = [
  { day: "Mon", amount: 4200 },
  { day: "Tue", amount: 6100 },
  { day: "Wed", amount: 5400 },
  { day: "Thu", amount: 8300 },
  { day: "Fri", amount: 9600 },
  { day: "Sat", amount: 7400 },
  { day: "Sun", amount: 5800 },
];

export const categoryPerformance = [
  { name: "Sports", raised: 148000, target: 120000 },
  { name: "Schools", raised: 121000, target: 140000 },
  { name: "Athletics", raised: 112000, target: 100000 },
  { name: "Clubs", raised: 64000, target: 80000 },
  { name: "Community", raised: 38000, target: 60000 },
];

export const activity = [
  { id: "a1", type: "donation", text: "The Alvarez Family gave $250 to Send Northgate Track to Nationals", time: "8 minutes ago" },
  { id: "a2", type: "campaign", text: "Cedar Falls Academy submitted Cedar Falls Girls Soccer Travel Fund for review", time: "42 minutes ago" },
  { id: "a3", type: "team", text: "Riverside Robotics added 4 participants", time: "2 hours ago" },
  { id: "a4", type: "payout", text: "Payout of $18,420 sent to Lakeview Prep", time: "5 hours ago" },
  { id: "a5", type: "school", text: "Harbor Point School completed verification", time: "Yesterday" },
  { id: "a6", type: "donation", text: "Anonymous gave $1,000 to Build Riverside's New STEM Lab", time: "Yesterday" },
];

export const inquiries = [
  { id: "q1", name: "Sandra Whitlock", school: "Fairmont Middle School", email: "s.whitlock@fairmont.edu", phone: "(503) 555-0142", type: "Start a campaign", date: "2026-11-05", status: "New" },
  { id: "q2", name: "Devon Marsh", school: "Eastbrook Athletics", email: "dmarsh@eastbrook.org", phone: "(512) 555-0118", type: "Sports teams", date: "2026-11-04", status: "In review" },
  { id: "q3", name: "Alicia Fontaine", school: "St. Brigid Academy", email: "afontaine@stbrigid.org", phone: "(617) 555-0193", type: "Product fundraising", date: "2026-11-02", status: "Answered" },
  { id: "q4", name: "Ravi Chandra", school: "Mesa Ridge High", email: "rchandra@mesaridge.edu", phone: "(303) 555-0177", type: "General question", date: "2026-10-30", status: "Answered" },
];

export const transactions = [
  { id: "TX-40912", donor: "The Alvarez Family", campaign: "Send Northgate Track to Nationals", amount: 250, fee: 7.25, net: 242.75, method: "Card", status: "Settled", date: "2026-11-05" },
  { id: "TX-40911", donor: "Anonymous", campaign: "Build Riverside's New STEM Lab", amount: 1000, fee: 29, net: 971, method: "Card", status: "Settled", date: "2026-11-05" },
  { id: "TX-40908", donor: "Marcus Reed", campaign: "Lakeview Athletics Weight Room", amount: 500, fee: 14.5, net: 485.5, method: "Card", status: "Settled", date: "2026-11-04" },
  { id: "TX-40902", donor: "Hannah Park", campaign: "Renovate the Harbor Point Library", amount: 100, fee: 0, net: 100, method: "Bank transfer", status: "Settled", date: "2026-11-04" },
  { id: "TX-40897", donor: "Nguyen Family", campaign: "Summit Ridge Marching Band Season", amount: 75, fee: 2.18, net: 72.82, method: "Card", status: "Settled", date: "2026-11-03" },
  { id: "TX-40882", donor: "Thomas Bell", campaign: "Lakeview Athletics Weight Room", amount: 1200, fee: 0, net: 1200, method: "Bank transfer", status: "Pending", date: "2026-11-02" },
];

export const payouts = [
  { id: "PO-2214", school: "Lakeview Prep", amount: 18420, period: "Oct 1 – Oct 31", status: "Paid", date: "2026-11-01" },
  { id: "PO-2213", school: "Northgate High School", amount: 11280, period: "Oct 1 – Oct 31", status: "Paid", date: "2026-11-01" },
  { id: "PO-2212", school: "Harbor Point School", amount: 9640, period: "Oct 1 – Oct 31", status: "Processing", date: "2026-10-31" },
  { id: "PO-2211", school: "Riverside Academy", amount: 14210, period: "Sep 1 – Sep 30", status: "Paid", date: "2026-10-02" },
];

export const users = [
  { id: "u1", name: "Diane Reyes", email: "d.reyes@northgate.edu", role: "School admin", school: "Northgate High School", status: "Active", joined: "2026-02-14" },
  { id: "u2", name: "Alan Whitfield", email: "a.whitfield@riverside.org", role: "Campaign manager", school: "Riverside Academy", status: "Active", joined: "2026-03-02" },
  { id: "u3", name: "Marcus Hale", email: "m.hale@lakeviewprep.org", role: "Coach", school: "Lakeview Prep", status: "Active", joined: "2026-04-19" },
  { id: "u4", name: "Maya Ellis", email: "maya.ellis@student.northgate.edu", role: "Participant", school: "Northgate High School", status: "Active", joined: "2026-09-08" },
  { id: "u5", name: "Priya Nair", email: "priya.nair@student.riverside.org", role: "Participant", school: "Riverside Academy", status: "Active", joined: "2026-09-11" },
  { id: "u6", name: "Ellen Cho", email: "e.cho@harborpoint.org", role: "Advisor", school: "Harbor Point School", status: "Invited", joined: "2026-10-27" },
];

export const invitations = [
  { id: "i1", name: "Sofia Marquez", email: "sofia.m@student.summitridge.edu", team: "Summit Ridge Marching Band", status: "Accepted", sent: "2026-10-28" },
  { id: "i2", name: "Jordan Okafor", email: "j.okafor@student.lakeviewprep.org", team: "Lakeview Varsity Football", status: "Accepted", sent: "2026-10-26" },
  { id: "i3", name: "Andre Walsh", email: "a.walsh@student.northgate.edu", team: "Northgate Track & Field", status: "Pending", sent: "2026-11-03" },
  { id: "i4", name: "Nina Patel", email: "n.patel@student.cedarfalls.org", team: "Cedar Falls Girls Soccer", status: "Pending", sent: "2026-11-04" },
];

export const notifications = [
  { id: "n1", title: "Goal milestone reached", body: "Renovate the Harbor Point Library passed 95% of its goal.", time: "22 minutes ago", unread: true, type: "milestone" },
  { id: "n2", title: "New donation", body: "$250 from The Alvarez Family to Send Northgate Track to Nationals.", time: "1 hour ago", unread: true, type: "donation" },
  { id: "n3", title: "Invitation accepted", body: "Jordan Okafor joined Lakeview Varsity Football.", time: "Yesterday", unread: false, type: "team" },
  { id: "n4", title: "Payout sent", body: "October payout of $11,280 is on its way.", time: "2 days ago", unread: false, type: "payout" },
];

export const donorHistory = [
  { id: "dh1", campaign: "Send Northgate Track to Nationals", school: "Northgate High School", amount: 250, date: "2026-11-05", receipt: "RCPT-1042" },
  { id: "dh2", campaign: "Renovate the Harbor Point Library", school: "Harbor Point School", amount: 100, date: "2026-10-12", receipt: "RCPT-0987" },
  { id: "dh3", campaign: "Build Riverside's New STEM Lab", school: "Riverside Academy", amount: 300, date: "2026-09-28", receipt: "RCPT-0912" },
  { id: "dh4", campaign: "Cedar Falls Girls Soccer Travel Fund", school: "Cedar Falls Academy", amount: 50, date: "2026-08-19", receipt: "RCPT-0844" },
];

export const tips = [
  "Personalise your message — pages with a short personal note raise on average 2.3× more.",
  "Share on the day your team plays. Supporters are most engaged after a game.",
  "Ask for the gift, not the amount. \"Would you support my season?\" outperforms \"Please give $50.\"",
  "Send a follow-up two days before your deadline with your current progress.",
];

export const donationPresets = [10, 25, 50, 100, 250];

export const navLinks = [
  { label: "Fundraising Solutions", to: "/solutions" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Explore Campaigns", to: "/campaigns" },
];

// Grouped under the "Resources" dropdown in the header.
export const resourceLinks = [
  { label: "About Us", to: "/about" },
  { label: "Success Stories", to: "/success-stories" },
  { label: "Contact", to: "/contact" },
];

export const campaignCategories = ["All", "Schools", "Sports", "Athletics", "Clubs", "Community", "Product Fundraising"];