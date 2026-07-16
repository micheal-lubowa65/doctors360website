import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

export const articles = [
  {
    slug: 'malaria-prevention-south-sudan',
    category: 'Community Health',
    title: 'Malaria Prevention: What Every Family in South Sudan Needs to Know',
    excerpt:
      'Malaria remains one of the leading causes of illness and death in South Sudan. Here is what Doctors360 recommends every household does to protect themselves and their children.',
    date: '2025-06-20',
    readTime: '5 min read',
    image: '/images/news-1.png',
    author: 'Dr. Amina Wek',
    content: `
Malaria is caused by Plasmodium parasites transmitted through the bites of infected female Anopheles mosquitoes. In South Sudan, it is responsible for a significant proportion of all outpatient visits, hospital admissions, and deaths, particularly among children under 5 and pregnant women.

## Prevention Starts at Home

The most effective preventive measures are simple and affordable:

**1. Sleep under an insecticide-treated mosquito net (ITN)**
Every member of your household should sleep under a treated net every night, not just children. Nets should be re-treated every six months.

**2. Eliminate standing water around your home**
Mosquitoes breed in still water. Empty containers, pots, and tyres after rain. Keep gutters clean and unblocked.

**3. Use indoor residual spraying (IRS)**
If your home is included in a government or NGO spraying programme, do not block access. IRS has been shown to reduce malaria transmission by up to 80%.

**4. Wear long-sleeved clothing at dusk and dawn**
Anopheles mosquitoes are most active during the early morning and evening hours.

**5. Seek early testing and treatment**
If you or a family member develops fever, chills, or headache, visit a health facility immediately. Early diagnosis and treatment with artemisinin-based combination therapy (ACT) is life-saving.

## What Doctors360 is Doing

Our community health workers conduct door-to-door malaria education in 6 counties. We distribute free ITNs through our outreach clinics and partner with the Ministry of Health on IRS campaigns.

If you are experiencing symptoms, visit our Emergency Care or General Medicine departments immediately.
    `,
  },
  {
    slug: 'maternal-health-tips',
    category: 'Maternal Health',
    title: 'Safe Pregnancy in South Sudan: Your Antenatal Care Guide',
    excerpt:
      'Antenatal care visits save lives. Our obstetrics team explains what to expect during pregnancy, when to seek help, and how Doctors360 supports mothers every step of the way.',
    date: '2025-05-14',
    readTime: '7 min read',
    image: '/images/news-2.png',
    author: 'Dr. Sarah Machar',
    content: `
Maternal mortality in South Sudan remains among the highest in the world. Yet the vast majority of maternal deaths are preventable with timely, quality antenatal care (ANC) and skilled birth attendance.

## Why Antenatal Care Visits Matter

The WHO recommends a minimum of 8 ANC contacts during pregnancy. These visits allow healthcare providers to:
- Monitor mother and baby's health
- Screen for pre-eclampsia, anaemia, and gestational diabetes
- Administer iron supplements and vaccines
- Identify and manage HIV, malaria, and syphilis
- Prepare a birth plan and identify danger signs

## When to Start

You should attend your first ANC visit as soon as you confirm your pregnancy — ideally before 12 weeks. Do not wait until you feel unwell.

## Danger Signs to Watch For

Seek emergency care immediately if you experience:
- Heavy vaginal bleeding
- Severe headache with visual disturbance
- High fever
- Difficulty breathing
- No fetal movement for 12+ hours after 28 weeks

## Doctors360 Obstetrics & Gynecology Services

Our dedicated obstetrics team provides full antenatal care, skilled birth attendance, postnatal support, and emergency obstetric care. We offer a safe, compassionate environment for all mothers.

Book your first ANC appointment today — call +211 927 702 808.
    `,
  },
  {
    slug: 'mental-health-in-africa',
    category: 'Mental Health',
    title: "Breaking the Silence: Mental Health in Africa's Healthcare System",
    excerpt:
      'Mental health disorders affect hundreds of millions across Africa, yet remain severely under-resourced. Doctors360 is committed to changing that — here is how.',
    date: '2025-04-03',
    readTime: '6 min read',
    image: '/images/news-3.png',
    author: 'Dr. Emmanuel Lado',
    content: `
According to the WHO, 1 in 4 people globally will be affected by a mental health condition at some point in their lives. Yet in sub-Saharan Africa, more than 90% of people who need mental health care do not receive it.

## The Treatment Gap

The reasons are complex: shortage of trained mental health professionals, deep-seated stigma, lack of funding, and integration failures within primary healthcare systems.

## How Doctors360 is Responding

We have integrated mental health services directly into our general medicine consultations. Our team includes counsellors, clinical psychologists, and a consulting psychiatrist who provide:

- Individual and group counselling
- Trauma-informed care (particularly important in post-conflict contexts like South Sudan)
- Medication management for severe disorders
- Community mental health education

## Reducing Stigma Through Education

Our community outreach programs include specific mental health awareness sessions that use storytelling, drama, and peer-led discussions to normalise help-seeking behaviour.

## Reach Out

If you or someone you know is struggling, please reach out to our Mental Health Department. There is no shame in asking for help. That is what we are here for.
    `,
  },
  {
    slug: 'doctors360-expands-emergency-department',
    category: 'Organisational Update',
    title: 'Doctors360 Expands Emergency Department Capacity',
    excerpt:
      'Our Emergency Department has completed a major expansion, doubling capacity and adding a dedicated trauma bay. Read what this means for patients across Juba.',
    date: '2025-03-10',
    readTime: '3 min read',
    image: '/images/news-4.png',
    author: 'James Deng',
    content: `
Doctors360 is pleased to announce the completion of the Emergency Department expansion project, funded through a combination of donor contributions and operational revenue.

## What Has Changed

- **Doubled bed capacity**: The ED now has 20 emergency bays, up from 10
- **Dedicated trauma bay**: A fully equipped trauma resuscitation room with advanced life support equipment
- **Triage system upgrade**: A new triage protocol aligned with international Emergency Severity Index (ESI) standards
- **Generator backup**: A new high-capacity generator ensures zero interruptions to critical equipment

## 24/7 Emergency Services

Our Emergency Department operates around the clock, every day of the year. Our team includes emergency medicine physicians, critical care nurses, and paramedics.

## Our Commitment

This expansion reflects our commitment to the community of Juba and beyond. No one should be turned away from emergency care due to capacity constraints.

For emergencies, call +211 927 702 808 or arrive directly at our facility in Juba.
    `,
  },
  {
    slug: 'community-health-worker-graduation',
    category: 'Community Stories',
    title: '40 New Community Health Workers Graduate from Doctors360 Training Program',
    excerpt:
      'Forty community health workers from across South Sudan completed their three-month training with Doctors360 this week — each returning to their villages with the skills to save lives.',
    date: '2025-02-18',
    readTime: '4 min read',
    image: '/images/programs-2.png',
    author: 'Grace Akol',
    content: `
This week, Doctors360 celebrated the graduation of 40 community health workers (CHWs) from our flagship training program — bringing our total number of trained CHWs to over 200.

## About the Program

The 12-week curriculum covers:
- Basic clinical assessment and vital signs
- Recognition of danger signs and referral criteria
- Malaria rapid testing and treatment
- Maternal and newborn health protocols
- Community health education and communication
- Data collection and reporting

## Who Are These CHWs?

The graduates come from 6 different counties across South Sudan. They were selected by their communities and will return to work within walking distance of the households they serve.

## A Word from a Graduate

"Before this training, I did not know how to recognise when a child was seriously sick. Now I know the danger signs, and I know when to refer. I feel confident to help my community." — Mary, CHW, Yei

## What Happens Next

Each graduate receives a health kit, a supervisor assignment, and monthly refresher training visits from our outreach team. They will see patients, conduct home visits, and report data back to us monthly.

Want to support the CHW program? Visit our Donate page.
    `,
  },
  {
    slug: 'nutrition-and-child-health',
    category: 'Child Health',
    title: 'Tackling Child Malnutrition: Doctors360 Launches Nutrition Program',
    excerpt:
      'Child malnutrition remains a critical challenge across South Sudan. Our new community nutrition program aims to screen, treat, and prevent malnutrition in children under 5.',
    date: '2025-01-25',
    readTime: '5 min read',
    image: '/images/news-5.png',
    author: 'Dr. Amina Wek',
    content: `
Malnutrition is one of the most significant drivers of child mortality in South Sudan. It weakens immune systems, stunts development, and makes children far more vulnerable to infectious diseases.

## The Scale of the Problem

According to recent UNICEF data, more than 1 in 3 children under 5 in South Sudan suffers from chronic malnutrition (stunting). Acute malnutrition (wasting) affects a further 1 in 7 children.

## Doctors360's Response

We have launched a community-based nutrition program that includes:

**Screening**: Community health workers conduct mid-upper arm circumference (MUAC) screening during home visits to identify children at risk.

**Treatment**: Children identified with moderate or severe acute malnutrition are referred to our Pediatrics department for therapeutic feeding and medical management.

**Prevention**: Mothers and caregivers receive nutrition counselling, including breastfeeding support, complementary feeding guidance, and micronutrient supplementation.

## Partner Support

This program is delivered in partnership with UNICEF South Sudan, which supplies ready-to-use therapeutic food (RUTF) and other nutritional supplies.

## How You Can Help

Donations to this program directly fund MUAC tapes for community health workers, therapeutic food for malnourished children, and training for nutritional counsellors.

Visit our Donate page to contribute.
    `,
  },
];

const categories = ['All', 'Community Health', 'Maternal Health', 'Mental Health', 'Child Health', 'Organisational Update', 'Community Stories'];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function NewsPage() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = articles.filter((a) => {
    const matchCat = filter === 'All' || a.category === filter;
    const matchQ = query === '' || a.title.toLowerCase().includes(query.toLowerCase()) || a.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-to-br from-primary-500 via-teal-deep to-primary-700 relative overflow-hidden noise-overlay">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-seafoam-300/10 rounded-full blur-3xl animate-float" />
        <div className="container-x relative text-center">
          <ScrollReveal animation="fade-up">
            <span className="section-eyebrow text-seafoam-300">News & Blog</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mt-4">
              Stories, insights &amp;<br />
              <span className="gradient-text-seafoam">health knowledge</span>
            </h1>
            <p className="mt-6 text-seafoam-100 text-lg max-w-xl mx-auto leading-relaxed">
              Medical articles, community stories, organisational updates, and health education from the Doctors360 team.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-seafoam-50 shadow-sm py-4">
        <div className="container-x flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-seafoam-100 text-sm focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all"
            />
          </div>
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${filter === c ? 'bg-primary-500 text-white shadow-md' : 'bg-seafoam-50 text-primary-500 hover:bg-seafoam-100'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          {filtered.length === 0 ? (
            <p className="text-center text-slate-brand py-20">No articles found matching your search.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article, i) => (
                <ScrollReveal key={article.slug} animation="fade-up" delay={i * 80}>
                  <Link
                    to={`/news/${article.slug}`}
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-seafoam-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 flex flex-col p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-3.5 h-3.5 text-teal-deep" />
                        <span className="text-xs font-semibold text-teal-deep uppercase tracking-wider">{article.category}</span>
                      </div>
                      <h2 className="text-lg font-bold text-primary-500 leading-snug group-hover:text-teal-deep transition-colors flex-1">{article.title}</h2>
                      <p className="mt-3 text-sm text-slate-brand leading-relaxed line-clamp-3">{article.excerpt}</p>
                      <div className="mt-5 flex items-center justify-between text-xs text-slate-brand">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(article.date)}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
                        </div>
                        <span className="flex items-center gap-1 text-teal-deep font-medium">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
