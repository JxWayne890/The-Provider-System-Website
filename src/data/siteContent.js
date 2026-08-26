export const serviceGroups = [
    {
        id: 'visibility',
        number: '01',
        name: 'Websites & local visibility',
        description:
            'Give West Texas customers a clear service, credible local proof, and a direct path to call or inquire.',
        serviceSlugs: ['websites', 'local-seo', 'lead-generation'],
        tier: 'primary',
    },
    {
        id: 'operations',
        number: '02',
        name: 'Lead management & follow-up',
        description:
            'Connect inquiries, CRM records, estimates, owners, and next actions so fewer opportunities disappear between tools.',
        serviceSlugs: ['crm-jobber-alternatives', 'lead-follow-up'],
        tier: 'primary',
    },
    {
        id: 'customer-experience',
        number: '03',
        name: 'Automation & customer response',
        description:
            'Connect repeatable handoffs and use practical AI only where approved knowledge, limits, and human escalation are clear.',
        serviceSlugs: ['automation', 'ai-receptionist', 'ai-chatbots', 'ai-customer-support'],
        tier: 'secondary',
    },
    {
        id: 'growth',
        number: '04',
        name: 'Knowledge, growth & custom tools',
        description:
            'Organize approved knowledge, content, reporting, and software around an operating need that has earned a custom layer.',
        serviceSlugs: ['ai-knowledge-bases', 'ai-content-video', 'ai-growth-systems', 'custom-systems'],
        tier: 'secondary',
    },
];

export const services = [
    {
        slug: 'websites',
        name: 'West Texas service-business websites',
        shortName: 'Website design',
        group: 'visibility',
        kicker: 'The customer-facing system',
        seoTitle: 'West Texas Web Design for Service Businesses',
        seoDescription:
            'Clear, fast websites for West Texas service businesses, with local proof, useful lead capture, and a direct path to call or request work.',
        summary:
            'Clear, fast websites for West Texas service businesses that need local relevance, credible proof, and useful lead capture.',
        promise:
            'Build the website customers see and connect it to the first lead handoff the team needs to manage.',
        problem:
            'A brochure site can look polished and still leave visitors unsure about services, coverage, credibility, or the next step. The work starts with those decisions—not with a template.',
        includes: [
            'Message and page architecture',
            'Service and service-area planning',
            'Responsive design and accessible components',
            'Quote, contact, booking, or call routing',
            'Technical SEO, metadata, schema, sitemap, and redirects',
            'Documented ownership and handoff terms',
        ],
        goodFit: [
            'The current site no longer matches the business',
            'Important services are hard to find or understand',
            'Mobile visitors struggle to call or request work',
            'The team needs a site that can grow without page clutter',
        ],
        deliverables: [
            ['Structure', 'A page map tied to real services, audiences, proof, and search intent.'],
            ['Experience', 'Responsive pages with clear hierarchy, readable copy, and accessible interactions.'],
            ['Connection', 'Forms and calls routed into the operating workflow that will actually handle them.'],
        ],
        faqs: [
            {
                q: 'Do you build from a template?',
                a: 'The structure and visual system are designed around the business. Reusable components keep the build consistent, but the content model and customer path are specific to the project.',
            },
            {
                q: 'Can an existing domain and content be preserved?',
                a: 'Usually. We inventory important URLs, content, analytics, and ownership before deciding what should be kept, improved, merged, or redirected.',
            },
            {
                q: 'Is local SEO included?',
                a: 'Technical foundations and search-aware structure are part of the website work. Ongoing local visibility, editorial work, and Google Business Profile support are scoped separately when needed.',
            },
        ],
        relatedProjects: ['total-quality-plumbing', 'weathersbee-electric', 'adrians-custom-services'],
        relatedPlaybooks: ['blue-collar-homepage-checklist', 'contractor-website-pricing-one-time-vs-monthly'],
    },
    {
        slug: 'local-seo',
        name: 'Local SEO & Google visibility',
        shortName: 'Local visibility',
        group: 'visibility',
        kicker: 'Earn local relevance without page spam',
        seoTitle: 'West Texas Local SEO for Service Businesses',
        seoDescription:
            'Proof-led local SEO for West Texas service businesses, connecting service pages, regional pages, Google Business Profile, and qualified-inquiry measurement.',
        summary:
            'A proof-led search structure that connects real services, West Texas markets, useful pages, and Google Business Profile information.',
        promise:
            'Help search engines and customers understand what you do, where you do it, and why each page exists.',
        problem:
            'Publishing a city-by-service matrix is easy; maintaining useful, distinct pages is not. Thin location pages create clutter and can compete with one another instead of building authority.',
        includes: [
            'Search Console, analytics, and content inventory',
            'Service, industry, and regional topic map',
            'Page-quality and local-proof gates',
            'Internal linking, canonicals, redirects, and sitemap plan',
            'Google Business Profile and website handoff checklist',
            'Measurement plan for qualified inquiries—not page count',
        ],
        goodFit: [
            'The business serves multiple West Texas markets',
            'Existing pages overlap or target the same intent',
            'Local proof is scattered across the site',
            'The team needs an editorial plan grounded in customer questions',
        ],
        deliverables: [
            ['Evidence map', 'A record of current demand, indexed pages, proof, and content gaps.'],
            ['Hub plan', 'A deliberate relationship between services, industries, regions, work, and guidance.'],
            ['Publishing rules', 'Clear criteria for when a new local page is useful enough to exist.'],
        ],
        faqs: [
            {
                q: 'Do you create a page for every city and service?',
                a: 'No. A dedicated page must answer a distinct need and contain meaningful local detail or proof. Otherwise the topic belongs on a broader service or regional hub.',
            },
            {
                q: 'Can you guarantee rankings?',
                a: 'No. We can improve the site’s relevance, technical quality, usefulness, and measurement, but search placement is controlled by search engines and changes over time.',
            },
            {
                q: 'Do you work with Google Business Profile?',
                a: 'We can align business information, landing pages, services, and tracking with the profile. Account access and any profile changes are handled explicitly with the owner.',
            },
        ],
        relatedProjects: ['total-quality-plumbing', 'abilene-commercial', 'master-commercial-clean'],
        relatedPlaybooks: ['service-area-page-strategy-without-spam', 'google-business-profile-website-connection'],
    },
    {
        slug: 'lead-generation',
        name: 'Lead capture & routing',
        shortName: 'Lead capture & routing',
        group: 'visibility',
        kicker: 'From attention to a handled opportunity',
        seoTitle: 'Lead Capture & Routing for West Texas Businesses',
        seoDescription:
            'Landing pages, forms, source tracking, lead routing, and CRM handoffs for West Texas service businesses.',
        summary:
            'Connected landing pages, intake, source tracking, routing, and follow-up designed around the offers a business can actually fulfill.',
        promise:
            'Create a measurable path from the first click or call to a lead record with an owner.',
        problem:
            'More traffic is not useful when inquiries arrive in disconnected inboxes, the source is lost, or nobody knows what happened next.',
        includes: [
            'Offer and landing-page strategy',
            'Calls, forms, chat, and referral intake map',
            'Source and campaign field design',
            'Lead routing and ownership rules',
            'CRM connection and follow-up triggers',
            'Consent-aware conversion measurement',
        ],
        goodFit: [
            'The business has multiple lead sources',
            'Marketing and sales results are hard to connect',
            'Inquiries need qualification before scheduling',
            'The team wants to improve the system before increasing spend',
        ],
        deliverables: [
            ['Acquisition path', 'A focused message, landing experience, and next action for each priority offer.'],
            ['Intake model', 'Consistent fields and routing across calls, forms, referrals, and chat.'],
            ['Feedback loop', 'Reporting that connects source, response, qualification, and outcome when the data exists.'],
        ],
        faqs: [
            {
                q: 'Do you run paid ads?',
                a: 'Paid-ad management is not presented as a core service here. The work focuses on the website, intake, tracking, and follow-up infrastructure that paid or organic campaigns depend on.',
            },
            {
                q: 'Can you guarantee a number of leads?',
                a: 'No. Lead volume depends on market demand, offer, reputation, budget, competition, and other factors outside a website or workflow build.',
            },
            {
                q: 'Can existing marketing tools stay in place?',
                a: 'Yes, when they fit the workflow and access is available. The first step is to map what each tool does and where information is being lost.',
            },
        ],
        relatedProjects: ['abilene-commercial', 'total-quality-plumbing', 'roller-rink-usa'],
        relatedPlaybooks: ['missed-call-follow-up-system-contractors', 'service-area-page-strategy-without-spam'],
    },
    {
        slug: 'crm-jobber-alternatives',
        name: 'CRM & lead management',
        shortName: 'CRM & lead management',
        group: 'operations',
        kicker: 'Fit the system to the operation',
        seoTitle: 'CRM & Lead Management for Service Businesses',
        seoDescription:
            'CRM, estimating, scheduling, lead, customer, and job workflows configured around how a service business actually operates.',
        summary:
            'CRM, estimating, scheduling, customer, and job workflows—configured off the shelf or custom-built when the operating model truly requires it.',
        promise:
            'Choose the lightest system that can reliably support the way the team sells and delivers work.',
        problem:
            'Replacing field-service software without understanding the current workflow can trade one frustrating system for another. A custom build also creates maintenance responsibility, so it should earn its complexity.',
        includes: [
            'Current-state workflow and data audit',
            'Jobber/off-the-shelf fit assessment',
            'Pipeline, customer, job, task, and activity model',
            'Migration and data-cleanup plan',
            'Dashboard, permissions, and notification requirements',
            'Phased build or configuration recommendation',
        ],
        goodFit: [
            'The team works around its current software every day',
            'Important job stages or records do not fit generic tools',
            'Data is split across spreadsheets, texts, and inboxes',
            'The owner needs a clear buy-versus-build decision',
        ],
        deliverables: [
            ['Decision map', 'An honest comparison of keeping, configuring, integrating, or replacing the current tools.'],
            ['Operating model', 'The records, stages, responsibilities, and rules the system needs to support.'],
            ['Transition plan', 'A staged path that protects data and keeps essential work moving.'],
        ],
        faqs: [
            {
                q: 'Is a custom CRM always better than Jobber?',
                a: 'No. Established field-service products can be the better choice when their workflows fit. Custom software is most useful when a repeatable, valuable operating process cannot be supported cleanly by available tools.',
            },
            {
                q: 'Can you integrate with an existing CRM?',
                a: 'Often, depending on available APIs, permissions, and data quality. Integration feasibility is checked before it is promised.',
            },
            {
                q: 'How do you handle migration?',
                a: 'We identify source systems, field mappings, duplicates, required history, validation rules, and a rollback or coexistence plan before moving production data.',
            },
        ],
        relatedProjects: ['flowos', 'the-offer-hero'],
        relatedPlaybooks: ['jobber-alternative-crm-service-business', 'simple-crm-pipeline-home-service-business'],
    },
    {
        slug: 'lead-follow-up',
        name: 'Lead follow-up systems',
        shortName: 'Lead follow-up',
        group: 'operations',
        kicker: 'Make the next action visible',
        seoTitle: 'Lead Follow-Up Systems for Service Businesses',
        seoDescription:
            'Confirmation, assignment, reminder, estimate, and re-engagement workflows with clear stop conditions and human ownership.',
        summary:
            'Practical confirmation, assignment, reminder, estimate, and re-engagement workflows with stop conditions and human ownership.',
        promise:
            'Reduce the number of opportunities that disappear simply because nobody knew the next step.',
        problem:
            'Automation can send messages, but it cannot repair unclear responsibility. Effective follow-up begins with status, ownership, timing, and a rule for when a person should take over.',
        includes: [
            'Lead-source and response map',
            'Statuses, owners, tasks, and service-level expectations',
            'Confirmation and internal-notification templates',
            'Estimate and no-response sequences',
            'Consent, opt-out, and quiet-hour requirements',
            'Exception queue and reporting',
        ],
        goodFit: [
            'Form leads receive inconsistent responses',
            'Missed calls and voicemails are handled manually',
            'Open estimates have no reliable next action',
            'The CRM contains leads without owners or tasks',
        ],
        deliverables: [
            ['Response design', 'The first useful action for each lead source and urgency level.'],
            ['Sequence logic', 'Timing, channels, stop rules, and escalation without message overload.'],
            ['Exception view', 'A simple place for the team to see what automation could not resolve.'],
        ],
        faqs: [
            {
                q: 'Does follow-up require text messaging?',
                a: 'No. Email, tasks, call queues, and internal notifications may be enough. SMS is used only when the business has the right provider, consent, and compliance process.',
            },
            {
                q: 'Will automation replace the sales team?',
                a: 'The goal is to handle consistent administrative steps and surface the conversations that need a person—not to remove accountable human ownership.',
            },
            {
                q: 'Can the sequence stop when someone replies?',
                a: 'That depends on the connected channels and platform capabilities. Reply detection and stop conditions are tested as part of implementation.',
            },
        ],
        relatedProjects: ['flowos', 'the-offer-hero'],
        relatedPlaybooks: ['missed-call-follow-up-system-contractors', 'building-ai-customer-support'],
    },
    {
        slug: 'automation',
        name: 'Automation & integrations',
        shortName: 'Automation',
        group: 'operations',
        kicker: 'Connect repeatable work',
        summary:
            'Reliable workflows that move approved data between the tools a team already uses, with logs, ownership, and recovery paths.',
        promise:
            'Remove repetitive handoffs without turning the operation into an invisible chain of fragile steps.',
        problem:
            'A demo that moves one record is not a production workflow. Real automations need validation, duplicate protection, error handling, permissions, monitoring, and a person who owns exceptions.',
        includes: [
            'Process and system boundary map',
            'Trigger, action, field, and permission design',
            'Validation and duplicate protection',
            'Error handling, retries, and exception queue',
            'Testing with representative scenarios',
            'Documentation and ownership handoff',
        ],
        goodFit: [
            'The same information is copied between systems',
            'Routine handoffs depend on one person remembering',
            'Existing integrations fail silently',
            'The process is stable enough to describe and test',
        ],
        deliverables: [
            ['Workflow contract', 'A clear definition of triggers, inputs, outputs, owners, and failure behavior.'],
            ['Tested connection', 'A staged implementation verified against normal and edge-case scenarios.'],
            ['Runbook', 'Plain-language instructions for monitoring, troubleshooting, and changing the workflow.'],
        ],
        faqs: [
            {
                q: 'Which automation platform do you use?',
                a: 'The choice depends on the systems, volume, permissions, maintainability, and client ownership requirements. The workflow is defined before the tool is selected.',
            },
            {
                q: 'Can every tool be integrated?',
                a: 'No. Some products have limited APIs, restrictive plans, or data policies. Feasibility is verified against current documentation and access.',
            },
            {
                q: 'What happens when an automation fails?',
                a: 'The design should make failure visible through logs, alerts, retries, and an exception path rather than assuming every run will succeed.',
            },
        ],
        relatedProjects: ['flowos', 'the-offer-hero'],
        relatedPlaybooks: ['workflows-every-small-business-should-automate', 'ai-growth-system-service-business'],
    },
    {
        slug: 'ai-receptionist',
        name: 'AI receptionist systems',
        shortName: 'AI receptionist',
        group: 'customer-experience',
        kicker: 'Structured call intake with limits',
        summary:
            'Voice intake designed to answer approved questions, collect useful details, route urgent situations, and hand off when confidence or policy requires a person.',
        promise:
            'Create a safer intake layer for defined call scenarios—not a claim that every conversation can be automated.',
        problem:
            'A voice agent that sounds natural can still give a wrong answer, miss urgency, or mishandle an edge case. The operating rules and test plan matter more than the demo.',
        includes: [
            'Call-type, hours, and escalation map',
            'Approved business knowledge and restricted topics',
            'Identity, disclosure, recording, and consent requirements',
            'Intake fields and CRM/webhook mapping',
            'Emergency and low-confidence handoff rules',
            'Scenario testing and transcript review plan',
        ],
        goodFit: [
            'The business receives repeatable intake calls',
            'After-hours callers need a clear next step',
            'The team can define emergency and escalation policies',
            'A human fallback is available for unresolved situations',
        ],
        deliverables: [
            ['Call policy', 'What the agent may answer, collect, schedule, transfer, or refuse.'],
            ['Conversation design', 'Short, natural paths for the highest-value call types.'],
            ['QA scorecard', 'Test scenarios and review criteria for accuracy, routing, and customer experience.'],
        ],
        faqs: [
            {
                q: 'Can an AI receptionist handle every call?',
                a: 'No. The system should be limited to approved scenarios and should transfer, take a message, or end safely when the situation falls outside those boundaries.',
            },
            {
                q: 'Can it book appointments?',
                a: 'Only when scheduling rules, availability, permissions, and exception behavior can be integrated and tested reliably.',
            },
            {
                q: 'Do you provide the phone carrier?',
                a: 'Telephony selection and number setup are scoped separately. Existing providers may be usable depending on their current capabilities.',
            },
        ],
        relatedProjects: [],
        relatedPlaybooks: ['blue-collar-ai-phone-agent-guardrails', 'missed-call-follow-up-system-contractors'],
    },
    {
        slug: 'ai-chatbots',
        name: 'AI chatbots',
        shortName: 'AI chatbots',
        group: 'customer-experience',
        kicker: 'Useful answers, clear boundaries',
        summary:
            'Website and portal assistants grounded in approved information, with citations, escalation, and a narrow job to do.',
        promise:
            'Help visitors find answers or start the right workflow without pretending a chatbot is the business.',
        problem:
            'A generic bot can create more confusion than it removes. Useful chat begins with a defined audience, reliable source material, and a safe handoff when the answer is missing.',
        includes: [
            'Audience and use-case definition',
            'Approved source and content inventory',
            'Retrieval, response, and citation behavior',
            'Lead intake or support handoff',
            'Restricted topics and fallback language',
            'Conversation review and improvement plan',
        ],
        goodFit: [
            'Visitors repeatedly ask the same answerable questions',
            'The business has maintained source material',
            'A form, ticket, or human handoff exists',
            'The bot has a narrow measurable role',
        ],
        deliverables: [
            ['Use-case boundary', 'A specific job the assistant can perform and a list of things it should not do.'],
            ['Knowledge connection', 'Approved source material organized for retrieval and review.'],
            ['Handoff path', 'A clear transition to contact, intake, or support when the bot reaches its limit.'],
        ],
        faqs: [
            {
                q: 'Will the chatbot make up answers?',
                a: 'Any generative system can produce errors. Grounding, restricted prompts, citations, confidence behavior, and human escalation reduce risk but do not create perfect accuracy.',
            },
            {
                q: 'Can it capture leads?',
                a: 'Yes, if the fields, consent language, destination, and follow-up owner are defined. The bot should not collect information that the workflow does not need.',
            },
            {
                q: 'Can it answer from our documents?',
                a: 'Often, after access, permission, quality, and update ownership are established for those documents.',
            },
        ],
        relatedProjects: [],
        relatedPlaybooks: ['ai-chatbots-vs-live-chat', 'building-ai-customer-support'],
    },
    {
        slug: 'ai-customer-support',
        name: 'AI customer support',
        shortName: 'AI support',
        group: 'customer-experience',
        kicker: 'Resolve the routine, surface the exception',
        summary:
            'Support triage, suggested responses, self-service answers, and human escalation connected to real policies and account context.',
        promise:
            'Improve consistency around common support work while keeping accountable people in the loop.',
        problem:
            'Support automation fails when policy, account data, and escalation rules are unclear. It should never conceal uncertainty or block a customer from reaching a person.',
        includes: [
            'Issue and intent taxonomy',
            'Policy and knowledge-source review',
            'Triage, priority, and routing rules',
            'Suggested-response or self-service workflow',
            'Sensitive-topic and account-action controls',
            'Human handoff and quality-review queue',
        ],
        goodFit: [
            'A meaningful share of support is repetitive',
            'Policies and answers have a maintained owner',
            'The team needs faster triage, not a hidden replacement',
            'Tickets or conversations can be reviewed safely',
        ],
        deliverables: [
            ['Support map', 'Issue categories, required context, priority, owner, and safe resolution path.'],
            ['Assistance layer', 'Approved self-service or agent-assist behavior for selected categories.'],
            ['Escalation matrix', 'Rules for urgency, uncertainty, sensitive topics, and customer requests for a person.'],
        ],
        faqs: [
            {
                q: 'Does this replace a support team?',
                a: 'It is designed to reduce repetitive work and improve routing. Customers still need a clear route to a responsible person for exceptions and sensitive situations.',
            },
            {
                q: 'Can it access customer records?',
                a: 'Only when permissions, authentication, privacy, and the exact actions are explicitly designed and tested. Read access and write actions should be treated differently.',
            },
            {
                q: 'How is quality reviewed?',
                a: 'The implementation should sample conversations, record resolution and escalation reasons, and give an owner a way to correct source material and rules.',
            },
        ],
        relatedProjects: ['flowos'],
        relatedPlaybooks: ['building-ai-customer-support', 'ai-chatbots-vs-live-chat'],
    },
    {
        slug: 'ai-knowledge-bases',
        name: 'AI knowledge bases',
        shortName: 'Knowledge bases',
        group: 'customer-experience',
        kicker: 'Make approved knowledge usable',
        summary:
            'A maintained source-of-truth layer for teams, chat, support, and assistants—organized around ownership and freshness, not a document dump.',
        promise:
            'Give people and approved systems a reliable place to find the current answer.',
        problem:
            'AI retrieval cannot fix conflicting, outdated, inaccessible, or ownerless information. The foundation is governance: what is authoritative, who updates it, and where it may be used.',
        includes: [
            'Source inventory and authority ranking',
            'Document cleanup and content structure',
            'Permissions and audience boundaries',
            'Metadata, version, and review rules',
            'Search/retrieval experience',
            'Correction and change workflow',
        ],
        goodFit: [
            'Important answers live across people and files',
            'The same policy is explained differently by different teams',
            'Onboarding depends on tribal knowledge',
            'A chatbot or support assistant needs approved sources',
        ],
        deliverables: [
            ['Source register', 'A clear record of authoritative materials, owners, audiences, and review dates.'],
            ['Knowledge model', 'Consistent topics, metadata, and content chunks designed for people and retrieval.'],
            ['Maintenance loop', 'A practical way to flag, approve, publish, and retire information.'],
        ],
        faqs: [
            {
                q: 'Can we upload every file and be done?',
                a: 'That usually creates conflicting or stale answers. Sources should be reviewed, prioritized, permissioned, and assigned an owner before they become authoritative.',
            },
            {
                q: 'Does the knowledge base have to be public?',
                a: 'No. Public customer content, internal operating knowledge, and restricted material should be separated according to audience and access.',
            },
            {
                q: 'Who keeps it current?',
                a: 'The client needs a named content owner or review group. We can build the workflow, but business policy cannot remain accurate without ongoing ownership.',
            },
        ],
        relatedProjects: [],
        relatedPlaybooks: ['ai-chatbots-vs-live-chat', 'ai-growth-system-service-business'],
    },
    {
        slug: 'ai-content-video',
        name: 'AI content & video systems',
        shortName: 'Content & video',
        group: 'growth',
        kicker: 'Turn real expertise into reusable guidance',
        summary:
            'Human-reviewed workflows that turn interviews, jobsite material, approved documents, and demonstrations into useful written and video content.',
        promise:
            'Create a sustainable publishing process without manufacturing experience, reviews, or results.',
        problem:
            'High-volume generated content can sound plausible while adding no first-hand value. A useful system begins with original source material and ends with accountable review.',
        includes: [
            'Audience, topic, and channel map',
            'Source capture from experts and field work',
            'Draft, edit, approval, and publishing workflow',
            'Brand voice and restricted-claim rules',
            'Video clipping, captioning, and reuse plan',
            'Content ledger and update schedule',
        ],
        goodFit: [
            'The team has expertise but little publishing time',
            'Useful jobsite or process material already exists',
            'One source could support several channels',
            'A qualified reviewer can approve every piece',
        ],
        deliverables: [
            ['Source workflow', 'A repeatable way to capture first-hand knowledge, examples, and permissions.'],
            ['Production system', 'Defined stages for drafting, visual production, review, and release.'],
            ['Reuse map', 'A plan for turning one approved source into useful formats without duplication.'],
        ],
        faqs: [
            {
                q: 'Do you publish fully automated AI articles?',
                a: 'The recommended workflow keeps a human author or reviewer responsible for accuracy, usefulness, permissions, and business claims.',
            },
            {
                q: 'Can you create video from jobsite footage?',
                a: 'Yes, when the business owns or has permission to use the footage and can confirm the context, people, claims, and safety details shown.',
            },
            {
                q: 'How do you keep content from sounding generic?',
                a: 'The system starts with interviews, demonstrations, real customer questions, and original artifacts rather than asking a model to invent expertise.',
            },
        ],
        relatedProjects: [],
        relatedPlaybooks: ['ai-content-video-workflow-service-business', 'blue-collar-homepage-checklist'],
    },
    {
        slug: 'ai-growth-systems',
        name: 'AI growth systems',
        shortName: 'AI growth systems',
        group: 'growth',
        kicker: 'Connect the full decision loop',
        summary:
            'A coordinated layer across visibility, intake, follow-up, content, and reporting—built after the underlying process and data are trustworthy.',
        promise:
            'Use AI selectively inside a growth system the business can understand, measure, and govern.',
        problem:
            'Adding an AI tool to every stage can multiply noise. Growth infrastructure needs shared definitions, clean handoffs, and a small number of decisions that the system is designed to improve.',
        includes: [
            'Growth funnel and operating-metric map',
            'Data-source and quality assessment',
            'Lead, content, support, and follow-up use-case ranking',
            'Human approval and exception controls',
            'Reporting and experiment backlog',
            'Phased roadmap with stop/go criteria',
        ],
        goodFit: [
            'Core lead and customer workflows already exist',
            'The team can define qualified and successful outcomes',
            'Multiple systems need a shared view',
            'The owner wants a phased operating plan, not a tool bundle',
        ],
        deliverables: [
            ['System map', 'A single view of channels, records, decisions, handoffs, and owners.'],
            ['Use-case scorecard', 'Practical ranking by value, readiness, risk, and maintenance burden.'],
            ['Phased roadmap', 'Small releases with explicit evidence required before the next layer is added.'],
        ],
        faqs: [
            {
                q: 'Is this a single software product?',
                a: 'No. It is a scoped operating architecture that may combine existing tools, integrations, custom components, and manual review.',
            },
            {
                q: 'What should be automated first?',
                a: 'Usually a repeatable, high-friction process with clear inputs, an accountable owner, and a measurable result. The assessment is specific to the business.',
            },
            {
                q: 'Can you promise growth?',
                a: 'No. The system can improve execution and measurement, but demand, competition, offer quality, sales performance, and delivery all affect business growth.',
            },
        ],
        relatedProjects: ['the-offer-hero', 'flowos'],
        relatedPlaybooks: ['ai-growth-system-service-business', 'workflows-every-small-business-should-automate'],
    },
    {
        slug: 'custom-systems',
        name: 'Custom business systems',
        shortName: 'Custom systems',
        group: 'growth',
        kicker: 'Software for a proven operating need',
        summary:
            'Private apps, portals, dashboards, booking flows, quoting tools, and operational software designed around a specific valuable workflow.',
        promise:
            'Build custom only when the operating advantage is clearer than the cost of owning custom software.',
        problem:
            'Custom software is not automatically simpler. It creates decisions about security, support, hosting, data, and ongoing change. The business case and ownership model should be clear before screens are designed.',
        includes: [
            'Workflow, user, and permission discovery',
            'Buy/configure/integrate/build comparison',
            'Data model and system architecture',
            'Prototype and phased release plan',
            'Testing, security, logging, and support requirements',
            'Documentation and ownership terms',
        ],
        goodFit: [
            'The workflow is repeatable and operationally important',
            'Available software cannot support a critical distinction',
            'The business can name the users and system owner',
            'A phased first release can create practical value',
        ],
        deliverables: [
            ['Product brief', 'Users, jobs, constraints, success criteria, and excluded scope.'],
            ['Working release', 'A deliberately small system tested against real operating scenarios.'],
            ['Ownership plan', 'Clear access, documentation, deployment, support, and change responsibilities.'],
        ],
        faqs: [
            {
                q: 'How do you decide whether to build custom?',
                a: 'We compare the workflow, available tools, integration options, cost of workarounds, maintenance, data needs, and the value of the unique process.',
            },
            {
                q: 'Do clients always own the code?',
                a: 'Ownership, licensing, third-party services, and handoff are stated in the project agreement. We do not make a blanket promise that ignores platform or contract terms.',
            },
            {
                q: 'Can a project start with a prototype?',
                a: 'Yes. A prototype or narrow operational release is often the best way to validate the workflow before a broader build.',
            },
        ],
        relatedProjects: ['the-offer-hero', 'flowos', 'roller-rink-usa'],
        relatedPlaybooks: ['custom-system-scope-before-building-app', 'jobber-alternative-crm-service-business'],
    },
];

export const industries = [
    {
        slug: 'plumbing',
        name: 'Plumbing companies',
        summary:
            'Service, emergency, remodel, and compliance work all create different customer questions and intake needs.',
        operatingReality:
            'A plumbing system may need to distinguish urgent calls from planned work, route service areas accurately, and keep estimates, technicians, customer history, and follow-up connected.',
        priorities: [
            'Service and urgency-specific customer paths',
            'Clear coverage, licensing, and proof supplied by the business',
            'Call and form intake that captures the job context',
            'Estimate and unscheduled-work follow-up',
        ],
        relatedServices: ['websites', 'local-seo', 'lead-follow-up', 'crm-jobber-alternatives'],
        relatedProjects: ['total-quality-plumbing'],
    },
    {
        slug: 'electrical',
        name: 'Electrical & industrial service',
        summary:
            'Residential, commercial, industrial, rebuild, and specialty work need distinct proof and qualification.',
        operatingReality:
            'The system should help a customer identify the right service while giving the team enough equipment, site, urgency, and contact detail to respond intelligently.',
        priorities: [
            'Service taxonomy that reflects actual capabilities',
            'Industrial and commercial qualification',
            'Legacy, certifications, parts, and project proof supplied by the company',
            'Direct routing for urgent or specialized inquiries',
        ],
        relatedServices: ['websites', 'lead-generation', 'automation', 'custom-systems'],
        relatedProjects: ['weathersbee-electric'],
    },
    {
        slug: 'hvac',
        name: 'HVAC contractors',
        summary:
            'Seasonal demand, urgent no-cool calls, maintenance, replacement, and financing questions create very different paths.',
        operatingReality:
            'A practical system separates emergency intake from planned estimates, keeps coverage and availability accurate, and gives follow-up a clear owner.',
        priorities: [
            'Repair, replacement, and maintenance pathways',
            'After-hours intake and escalation rules',
            'Estimate and membership follow-up',
            'Knowledge sources for common equipment and service questions',
        ],
        relatedServices: ['websites', 'ai-receptionist', 'lead-follow-up', 'crm-jobber-alternatives'],
        relatedProjects: [],
    },
    {
        slug: 'roofing',
        name: 'Roofing contractors',
        summary:
            'Repair, replacement, storm response, inspections, and commercial work require different qualification and proof.',
        operatingReality:
            'A roofing lead system should capture location, property, damage, timing, and photos when appropriate without making every visitor complete a long intake.',
        priorities: [
            'Repair, replacement, storm, and commercial routes',
            'Photo-aware inspection or estimate intake',
            'Service-area and project proof architecture',
            'Longer estimate and decision follow-up',
        ],
        relatedServices: ['websites', 'local-seo', 'lead-generation', 'lead-follow-up'],
        relatedProjects: [],
    },
    {
        slug: 'oilfield-industrial',
        name: 'Oilfield & industrial contractors',
        summary:
            'Capabilities, safety, equipment, mobilization, recruiting, and procurement matter as much as a simple contact form.',
        operatingReality:
            'The public site and internal intake should help qualified buyers understand capacity and help the team route requests by site, service, timing, and commercial requirements.',
        priorities: [
            'Capabilities and territory presented without vague claims',
            'Commercial inquiry and bid qualification',
            'Recruiting and vendor/customer pathways',
            'Documentation, equipment, and dispatch workflow opportunities',
        ],
        relatedServices: ['websites', 'lead-generation', 'automation', 'custom-systems'],
        relatedProjects: ['mansfield-mining', 'weathersbee-electric'],
    },
    {
        slug: 'service-businesses',
        name: 'Service businesses',
        summary:
            'The same system principles apply beyond the trades when customers need to discover, evaluate, book, and receive a service.',
        operatingReality:
            'The work fits best when the business has a defined service, a real customer journey, and an operating bottleneck that can be mapped.',
        priorities: [
            'Clear offer and qualification',
            'Booking, intake, and customer communication',
            'CRM and operational visibility',
            'A maintainable ownership and support model',
        ],
        relatedServices: ['websites', 'crm-jobber-alternatives', 'automation', 'custom-systems'],
        relatedProjects: ['roller-rink-usa', 'flowos', 'master-commercial-clean'],
    },
];

export const regions = [
    {
        slug: 'san-angelo-concho-valley',
        name: 'San Angelo & the Concho Valley',
        shortName: 'San Angelo',
        counties: 'San Angelo, the Concho Valley, and Tom Green County',
        seoTitle: 'San Angelo Web Design & Lead Systems',
        seoDescription:
            'Websites, local visibility, lead capture, CRM, and follow-up for San Angelo and Concho Valley service businesses.',
        heroTitle: 'Websites and lead systems for San Angelo service businesses.',
        stance:
            'The Provider System connects the website customers see with the inquiry, booking, or follow-up path behind it, using real San Angelo project context and a founder-led delivery process.',
        deliveryModel:
            'Planning, reviews, and implementation are handled directly with John through a remote-first process. Any in-person need, access, support, or ongoing ownership is agreed in the project scope.',
        localContext: [
            'Explain the service, real coverage, and next step clearly for customers in San Angelo and surrounding communities.',
            'Separate consumer, commercial, industrial, and event inquiries when each path needs different details or urgency.',
            'Route calls, quote requests, bookings, and forms into a visible owner and next action instead of leaving them in separate inboxes.',
        ],
        serviceSlugs: ['websites', 'local-seo', 'lead-follow-up', 'custom-systems'],
        proofProjects: ['roller-rink-usa', 'weathersbee-electric', 'master-commercial-clean'],
        fitTitle: 'A practical fit for a San Angelo business when…',
        fitIntro:
            'The strongest starting point is a specific customer or team handoff that is currently hard to see or manage.',
        fitSignals: [
            'The website no longer reflects the services or territory the business actually serves.',
            'Mobile customers have to hunt for a call, quote, booking, or contact path.',
            'Inquiries arrive through several channels without consistent ownership or follow-up.',
            'The business needs a focused first release rather than a bundle of disconnected tools.',
        ],
        faqs: [
            {
                q: 'Can you rebuild an existing San Angelo business website?',
                a: 'Yes. The first step is to inventory the current domain, important URLs, content, analytics, forms, and ownership before deciding what should stay, change, merge, or redirect.',
            },
            {
                q: 'Can the website connect to our CRM, booking tool, or inbox?',
                a: 'Often. The current tools, permissions, data fields, and failure path are checked before an integration is included in scope.',
            },
            {
                q: 'Do you guarantee local rankings or lead volume?',
                a: 'No. The work can improve relevance, clarity, technical quality, measurement, and follow-through, but search placement and demand are not controlled by a website build.',
            },
        ],
    },
    {
        slug: 'abilene-big-country',
        name: 'Abilene & the Big Country',
        shortName: 'Abilene',
        counties: 'Abilene and Big Country service markets',
        seoTitle: 'Abilene Web Design & Lead Systems',
        seoDescription:
            'Web design, local visibility, lead capture, CRM, and follow-up for Abilene and Big Country service businesses.',
        heroTitle: 'Websites and lead systems for Abilene and the Big Country.',
        stance:
            'Abilene is the strongest evidence-backed regional market on this site, with visible work across plumbing, contracting, and commercial property.',
        deliveryModel:
            'Projects are founder-led and remote-first, with milestones, review points, access, handoff, and support written into scope. This regional service page does not claim a separate Provider System office in Abilene.',
        localContext: [
            'Organize services and Big Country coverage around the work the business can actually accept, rather than a copy-swapped page for every town.',
            'Connect service detail, approved project proof, contact options, and accurate Google Business Profile information.',
            'Distinguish urgent service, planned estimates, commercial inquiries, and longer-consideration work before each request reaches the team.',
        ],
        serviceSlugs: ['websites', 'local-seo', 'lead-generation', 'lead-follow-up'],
        proofProjects: ['total-quality-plumbing', 'adrians-custom-services', 'abilene-commercial'],
        fitTitle: 'A practical fit for an Abilene business when…',
        fitIntro:
            'The project can begin with visibility, lead handling, or both, as long as the first operating problem is clear.',
        fitSignals: [
            'Service and coverage information is inconsistent across the website and business profiles.',
            'Urgent calls, quote requests, and commercial opportunities need different intake paths.',
            'Forms and estimates do not have a reliable owner or follow-up rule.',
            'The business has real local work or knowledge that is not being used as useful proof.',
        ],
        faqs: [
            {
                q: 'Do we need a separate page for every Big Country town?',
                a: 'No. A broader service or regional page is usually better unless a city has distinct demand, coverage, proof, or customer questions that justify its own useful page.',
            },
            {
                q: 'Can you preserve our current domain and important URLs?',
                a: 'Usually. Existing URLs, indexed content, analytics, and ownership are inventoried before a redirect or replacement plan is approved.',
            },
            {
                q: 'Can you improve the lead path without replacing our whole website?',
                a: 'Yes, when the current site and tools provide a stable base. Intake, routing, tracking, or follow-up can be scoped as a focused layer instead of a full rebuild.',
            },
        ],
    },
    {
        slug: 'lubbock',
        name: 'Lubbock',
        shortName: 'Lubbock',
        counties: 'Lubbock and surrounding South Plains service markets',
        seoTitle: 'Lubbock Web Design & Lead Systems',
        seoDescription:
            'Focused websites, local visibility, lead capture, and follow-up for Lubbock service businesses through founder-led remote delivery.',
        heroTitle: 'A focused website and lead path for Lubbock service businesses.',
        stance:
            'The Provider System serves Lubbock as a founder-led remote delivery market, with a focused offer and project evidence instead of a claimed local office or a grid of thin city pages.',
        deliveryModel:
            'Discovery, planning, reviews, implementation, and handoff are remote-first. A Lubbock engagement should begin with a defined website or lead-flow problem and written expectations for access, communication, and support.',
        localContext: [
            'Lead with a specific service, audience, and conversion path instead of a broad list of digital capabilities.',
            'Use approved project material and first-party business knowledge to make local content useful beyond the city name.',
            'Measure impressions, calls, forms, source, and qualified inquiries before expanding into additional South Plains pages.',
        ],
        serviceSlugs: ['websites', 'local-seo', 'lead-generation', 'lead-follow-up'],
        proofProjects: ['master-commercial-clean'],
        fitTitle: 'A practical fit for a Lubbock business when…',
        fitIntro:
            'Remote delivery works best when the owner can identify the customer path, current tools, and first result the project needs to produce.',
        fitSignals: [
            'The business needs a clearer website or quote path rather than a large marketing bundle.',
            'Calls and forms need source tracking, qualification, or a visible follow-up step.',
            'The team is comfortable reviewing work through scheduled remote milestones.',
            'There is enough real business knowledge or approved proof to support useful local content.',
        ],
        faqs: [
            {
                q: 'Does The Provider System have a Lubbock office?',
                a: 'This page represents a regional remote-delivery market, not a separate office location. Project communication, access, milestones, and support are agreed before work begins.',
            },
            {
                q: 'Can a Lubbock project begin with the website only?',
                a: 'Yes. A website can be scoped as a standalone first release. CRM, follow-up, automation, or custom tools are added only when the operating need is clear.',
            },
            {
                q: 'Will you create pages for every nearby city?',
                a: 'Not by default. New pages should follow distinct customer needs, real coverage, first-party proof, or validated search demand.',
            },
        ],
    },
    {
        slug: 'midland-odessa',
        name: 'Midland–Odessa',
        shortName: 'Midland–Odessa',
        counties: 'The Midland–Odessa area and Permian Basin service markets',
        seoTitle: 'Midland–Odessa Web Design & Lead Systems',
        seoDescription:
            'Websites, commercial intake, lead routing, automation, and custom systems for Midland–Odessa and Permian Basin service businesses.',
        heroTitle: 'Websites and lead systems for Midland–Odessa operators.',
        stance:
            'The paired market page is built for industrial, oilfield, and service businesses that need clear capabilities, stronger qualification, and a visible path from inquiry to owner.',
        deliveryModel:
            'The Provider System works through a founder-led remote process and does not claim a separate Midland or Odessa office. Any site visit, specialized access, integration, or support requirement must be included in scope.',
        localContext: [
            'Present capabilities, territory, commercial requirements, and response expectations precisely enough for a buyer to self-qualify.',
            'Separate customer, vendor, recruiting, and bid inquiries when each one needs different records or ownership.',
            'Use one substantial Midland–Odessa page until separate demand and first-party proof justify distinct city experiences.',
        ],
        serviceSlugs: ['websites', 'lead-generation', 'automation', 'custom-systems'],
        proofProjects: ['mansfield-mining', 'master-commercial-clean'],
        fitTitle: 'A practical fit for a Permian Basin operator when…',
        fitIntro:
            'The best projects begin with a commercial or operating workflow that can be described, tested, and assigned to a real owner.',
        fitSignals: [
            'The current site does not qualify industrial or commercial inquiries well enough.',
            'Customer, vendor, recruiting, and bid requests are mixed together.',
            'The team repeatedly moves the same information between forms, inboxes, spreadsheets, or software.',
            'A proven workflow needs a focused portal, dashboard, quoting tool, or custom operational release.',
        ],
        faqs: [
            {
                q: 'Why are Midland and Odessa covered on one page?',
                a: 'The paired page reflects the current project evidence and regional operating context. Separate pages should exist only when demand, proof, or customer needs are meaningfully different.',
            },
            {
                q: 'Can you build separate intake for customers, vendors, and applicants?',
                a: 'Yes, when each path has defined fields, ownership, response expectations, and a real destination. The workflow is mapped before forms or automations are built.',
            },
            {
                q: 'Do you replace existing field-service or operational software?',
                a: 'Not automatically. The first decision is whether the current tool should be kept, configured, integrated, or replaced. Custom software has to earn its added ownership and maintenance cost.',
            },
        ],
    },
];

export const getService = (slug) => services.find((service) => service.slug === slug);
export const getIndustry = (slug) => industries.find((industry) => industry.slug === slug);
export const getRegion = (slug) => regions.find((region) => region.slug === slug);
