import type { ImageMetadata } from 'astro';
import websitePhoto from '../assets/web-services/services/website-design-development.jpg';
import webAppsPhoto from '../assets/web-services/services/web-applications.jpg';
import ecommercePhoto from '../assets/web-services/services/ecommerce.jpg';
import automationPhoto from '../assets/web-services/services/integrations-ai-automation.jpg';
import seoPhoto from '../assets/web-services/services/seo-performance.jpg';
import hostingPhoto from '../assets/web-services/services/hosting-care-support.jpg';

/* Web Services content: one entry per service.
   The /web-services list uses title, summary and tags; each service's own page
   at /web-services/<slug> uses the rest.
   Photos are CC0 (public domain) from StockSnap.io: no licence fee or credit required. */

export interface Service {
	slug: string;
	title: string;
	/** One or two sentences for the services list */
	summary: string;
	tags: string[];
	/** Page headline, split into the lines it reveals in */
	headline: [string, string];
	lead: string;
	/** Short facts under the hero */
	facts: { label: string; value: string }[];
	/** Opening statement for the overview section */
	overview: string;
	/** Wide photo under the overview; position is its CSS object-position */
	image: { src: ImageMetadata; alt: string; label: string; caption: string; position?: string };
	included: { title: string; desc: string }[];
	steps: { title: string; desc: string }[];
	stack: string[];
	faqs: { q: string; a: string }[];
}

export const services: Service[] = [
	{
		slug: 'website-design-development',
		title: 'Website Design & Development',
		summary:
			'Custom marketing sites designed around how your customers decide. Fast, accessible, built to rank and easy for your team to update.',
		tags: ['UX & UI design', 'Responsive build', 'CMS'],
		headline: ['Websites that win', 'the enquiry.'],
		lead: 'A custom website designed around how your customers decide, built to load fast, rank well and turn visitors into enquiries. Easy for your team to update once we hand it over.',
		facts: [
			{ label: 'Best for', value: 'Businesses that need more enquiries' },
			{ label: 'You get', value: 'Strategy, design, build & training' },
			{ label: 'Built with', value: 'Astro · WordPress · Webflow' },
		],
		overview:
			'Your website is often the first conversation a customer has with you. We design it to answer their questions in the right order, then make the next step obvious.',
		image: { src: websitePhoto, alt: 'Hand-drawn website wireframes in an open notebook beside a phone', label: 'Design', caption: 'Wireframes before pixels', position: '50% 45%' },
		included: [
			{
				title: 'Discovery & strategy',
				desc: 'We map your customers, competitors and goals, then plan the pages and messages that move people to act.',
			},
			{
				title: 'UX & UI design',
				desc: 'Wireframes and full visual designs you can click through and comment on before anything is built.',
			},
			{
				title: 'Content & copy support',
				desc: 'Page structure, headlines and calls to action shaped with you, so every page has a clear job.',
			},
			{
				title: 'Responsive development',
				desc: 'Hand-built, fast-loading pages that look and work properly on every screen size and browser.',
			},
			{
				title: 'Easy-to-use CMS',
				desc: 'Edit text, images, blog posts and pages yourself, without calling a developer for every change.',
			},
			{
				title: 'Launch & training',
				desc: 'Redirects, analytics and search setup at launch, plus a walkthrough so your team is confident from day one.',
			},
		],
		steps: [
			{ title: 'Discover', desc: 'A workshop on your customers, goals and competitors, ending in an agreed site map and scope.' },
			{ title: 'Design', desc: 'Wireframes first, then visual designs for key pages, refined with your feedback.' },
			{ title: 'Build', desc: 'Development, content entry and testing across devices, browsers and connection speeds.' },
			{ title: 'Launch', desc: 'Go-live with redirects, analytics and search console set up, then a handover session.' },
		],
		stack: ['Astro', 'WordPress', 'Webflow', 'Tailwind CSS', 'Headless CMS', 'Google Analytics'],
		faqs: [
			{
				q: 'Can I update the website myself?',
				a: 'Yes. Every site comes with a content management system set up for your team, and we show you how to use it before handover.',
			},
			{
				q: 'Do you write the content?',
				a: "We plan the structure and help shape headlines and calls to action. If you'd like full copywriting, we can include it in your scope.",
			},
			{
				q: 'Will my site work on mobile?',
				a: 'Yes. Every page is designed and tested for phones, tablets and desktops, and we build to accessibility standards as part of the job.',
			},
			{
				q: 'Can you redesign my existing site?',
				a: 'Yes. We review what is working today, keep your search rankings safe with proper redirects, and rebuild around what your customers need.',
			},
		],
	},
	{
		slug: 'web-applications',
		title: 'Web Applications',
		summary:
			'Client portals, dashboards and internal tools, engineered by the same team that builds and runs the Sharktech platforms.',
		tags: ['Portals', 'Dashboards', 'APIs'],
		headline: ['Software built around', 'how you work.'],
		lead: 'Client portals, dashboards and internal tools that replace spreadsheets and manual work. Engineered by the same team that builds and runs the Sharktech platforms.',
		facts: [
			{ label: 'Best for', value: 'Teams outgrowing spreadsheets' },
			{ label: 'You get', value: 'Product planning, build & support' },
			{ label: 'Built with', value: 'React · Next.js · Laravel' },
		],
		overview:
			'Off-the-shelf software makes you work its way. A custom web app works your way, and grows with you instead of holding you back.',
		image: { src: webAppsPhoto, alt: 'Developer typing code on a laptop', label: 'Build', caption: 'Engineered in-house, tested at every step', position: '50% 40%' },
		included: [
			{
				title: 'Product discovery',
				desc: 'We work through your processes and users to define exactly what the app needs to do, and what it does not.',
			},
			{
				title: 'UX for complex workflows',
				desc: 'Clear screens for forms, tables and multi-step tasks, tested with the people who will use them every day.',
			},
			{
				title: 'Front-end engineering',
				desc: 'Fast, responsive interfaces in React or Vue that feel like a modern product, on desktop and mobile.',
			},
			{
				title: 'Back end & APIs',
				desc: 'Secure servers, databases and APIs that keep your data safe and connect to the tools you already use.',
			},
			{
				title: 'Users, roles & security',
				desc: 'Logins, permissions and audit trails, so the right people see the right information.',
			},
			{
				title: 'Ongoing improvement',
				desc: 'Releases in small, regular steps after launch, guided by real usage and your team’s feedback.',
			},
		],
		steps: [
			{ title: 'Define', desc: 'Map users, workflows and data, then agree the first version and what success looks like.' },
			{ title: 'Prototype', desc: 'Clickable prototypes of the key screens, tested with real users before development starts.' },
			{ title: 'Build', desc: 'Development in short cycles, with a working version for you to review at every step.' },
			{ title: 'Launch & evolve', desc: 'A staged rollout, training and monitoring, then a roadmap of improvements.' },
		],
		stack: ['React', 'Next.js', 'Vue', 'Node.js', 'Laravel', 'PostgreSQL', 'MySQL', 'REST & GraphQL APIs'],
		faqs: [
			{
				q: 'How is a web app different from a website?',
				a: 'A website mostly shares information. A web app lets people do things: log in, manage data, complete tasks and see reports.',
			},
			{
				q: 'Who owns the code?',
				a: 'You do. We agree ownership and handover in your contract, and document the app so it can be maintained long term.',
			},
			{
				q: 'Can it connect to our existing systems?',
				a: 'Usually, yes. We integrate with CRMs, accounting tools, payment providers and most services that offer an API.',
			},
			{
				q: 'Do you support the app after launch?',
				a: 'Yes. We offer ongoing support and improvement plans, with hosting, monitoring and security updates included.',
			},
		],
	},
	{
		slug: 'ecommerce',
		title: 'E-commerce',
		summary:
			'Online stores that load quickly and check out cleanly, connected to your stock, payments and shipping.',
		tags: ['Storefronts', 'Payments', 'Inventory sync'],
		headline: ['Online stores that', 'sell more.'],
		lead: 'Storefronts that load quickly, check out cleanly and connect to your stock, payments and shipping, so selling online takes less of your time.',
		facts: [
			{ label: 'Best for', value: 'Retailers and product brands' },
			{ label: 'You get', value: 'Store design, build & integrations' },
			{ label: 'Built with', value: 'Shopify · WooCommerce · Stripe' },
		],
		overview:
			'Every extra second and every extra step costs sales. We build stores that get out of the customer’s way, from the first product page to the confirmation email.',
		image: { src: ecommercePhoto, alt: 'Customer paying online with a credit card at a laptop', label: 'Checkout', caption: 'Every step to purchase, made shorter', position: '50% 55%' },
		included: [
			{
				title: 'Platform selection',
				desc: 'Honest advice on Shopify, WooCommerce or a custom build, based on your products, budget and plans.',
			},
			{
				title: 'Store design',
				desc: 'Product, category and cart pages designed to build trust and make buying easy on any device.',
			},
			{
				title: 'Checkout & payments',
				desc: 'A short, secure checkout with the payment options your customers expect, including Stripe and PayPal.',
			},
			{
				title: 'Stock & shipping',
				desc: 'Inventory, shipping rates and fulfilment connected, so orders flow through without double handling.',
			},
			{
				title: 'Product migration',
				desc: 'Your products, customers and order history moved across carefully, with redirects to protect rankings.',
			},
			{
				title: 'Marketing setup',
				desc: 'Analytics, email capture, abandoned cart flows and product feeds ready from launch day.',
			},
		],
		steps: [
			{ title: 'Plan', desc: 'Review your range, operations and customers, then choose the platform and agree the scope.' },
			{ title: 'Design', desc: 'Designs for the home, category, product and checkout pages, refined with you.' },
			{ title: 'Build & connect', desc: 'Build the store, connect payments, stock and shipping, then load your products.' },
			{ title: 'Launch & grow', desc: 'Test orders end to end, go live, then tune conversion with real sales data.' },
		],
		stack: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Afterpay', 'Klaviyo', 'Google Merchant Center'],
		faqs: [
			{
				q: 'Should I use Shopify or WooCommerce?',
				a: 'It depends on your products, budget and how much control you need. We recommend the best fit after looking at your business, not before.',
			},
			{
				q: 'Can you move my existing store?',
				a: 'Yes. We migrate products, customers and orders, and set up redirects so you keep your search traffic.',
			},
			{
				q: 'Can it connect to my inventory or accounting system?',
				a: 'In most cases, yes. We connect stores to stock, shipping and accounting tools so data stays in sync.',
			},
			{
				q: 'Do you help after launch?',
				a: 'Yes. We offer care plans for updates and support, and can keep improving conversion as sales data comes in.',
			},
		],
	},
	{
		slug: 'integrations-ai-automation',
		title: 'Integrations & AI Automation',
		summary:
			'Your site wired into your CRM, bookings and inbox, with AI agents answering and qualifying every enquiry around the clock.',
		tags: ['CRM', 'AI chatbots', 'Workflows'],
		headline: ['Every enquiry answered,', 'day or night.'],
		lead: 'We connect your website to your CRM, bookings and inbox, then put AI agents to work answering, qualifying and following up every enquiry, around the clock.',
		facts: [
			{ label: 'Best for', value: 'Teams losing leads to slow replies' },
			{ label: 'You get', value: 'Connected tools & AI agents' },
			{ label: 'Built on', value: 'VCPility · APIs · Webhooks' },
		],
		overview:
			'Most lost leads are not lost to competitors. They are lost to slow replies and forgotten follow-ups. Automation makes sure nothing slips through.',
		image: { src: automationPhoto, alt: 'Woman smiling as she reads a message on her phone', label: 'Response', caption: 'Answers in seconds, any hour of the day', position: '50% 28%' },
		included: [
			{
				title: 'CRM integration',
				desc: 'Website forms, calls and chats flow straight into your CRM, tagged and assigned with no copy and paste.',
			},
			{
				title: 'AI chat assistant',
				desc: 'A chatbot trained on your business that answers questions, qualifies leads and books appointments 24/7.',
			},
			{
				title: 'Booking automation',
				desc: 'Online booking connected to your calendar, with confirmations and reminders sent automatically.',
			},
			{
				title: 'Follow-up workflows',
				desc: 'Automatic emails and SMS that nurture enquiries and win back past customers at the right moment.',
			},
			{
				title: 'Review requests',
				desc: 'Happy customers asked for a review at the right time, helping your reputation grow on autopilot.',
			},
			{
				title: 'Custom integrations',
				desc: 'Connections between your other tools, from accounting to job management, using APIs and webhooks.',
			},
		],
		steps: [
			{ title: 'Audit', desc: 'Map how enquiries arrive today and where they stall, slow down or get lost.' },
			{ title: 'Design', desc: 'Plan the workflows, chatbot knowledge and the systems each step connects to.' },
			{ title: 'Connect & train', desc: 'Build the integrations, train the AI on your business and test every path.' },
			{ title: 'Launch & refine', desc: 'Go live, watch real conversations and keep improving the responses and flows.' },
		],
		stack: ['VCPility', 'AI chatbots', 'REST APIs', 'Webhooks', 'Google Workspace', 'Microsoft 365', 'Zapier'],
		faqs: [
			{
				q: 'Will the AI say the wrong thing to customers?',
				a: 'We train it only on your approved information and set clear limits. When it is unsure, it hands the conversation to your team.',
			},
			{
				q: 'Do we need to change CRMs?',
				a: 'Not necessarily. We can integrate with many existing CRMs, or set you up on VCPility if you want everything in one place.',
			},
			{
				q: 'Can customers still reach a real person?',
				a: 'Always. Automation handles the routine work, and anyone can ask to speak with your team at any point.',
			},
			{
				q: 'How quickly can this be running?',
				a: 'It depends on the number of tools and workflows involved. We agree a clear timeline once we have mapped your setup.',
			},
		],
	},
	{
		slug: 'seo-performance',
		title: 'SEO & Performance',
		summary:
			'Technical SEO, Core Web Vitals and analytics set up from day one, so every improvement shows up in the numbers.',
		tags: ['Technical SEO', 'Core Web Vitals', 'Analytics'],
		headline: ['Found faster.', 'Loaded faster.'],
		lead: 'Technical SEO, speed optimisation and analytics that help the right customers find you, then make sure your site is quick enough to keep them.',
		facts: [
			{ label: 'Best for', value: 'Sites that should rank higher' },
			{ label: 'You get', value: 'Audit, fixes & clear reporting' },
			{ label: 'Measured with', value: 'Search Console · GA4 · Lighthouse' },
		],
		overview:
			'Search engines reward sites that are fast, clear and useful. We fix what holds yours back, then report on the numbers that matter to your business.',
		image: { src: seoPhoto, alt: 'Laptop showing analytics charts on a desk', label: 'Insight', caption: 'Progress you can see in the numbers', position: '50% 50%' },
		included: [
			{
				title: 'Technical SEO audit',
				desc: 'A full review of crawling, indexing, site structure and errors, with fixes ranked by impact.',
			},
			{
				title: 'Core Web Vitals',
				desc: 'Faster loading, smoother interaction and stable layouts, measured against Google’s Core Web Vitals.',
			},
			{
				title: 'On-page optimisation',
				desc: 'Titles, headings, internal links and content structure tuned for the searches your customers make.',
			},
			{
				title: 'Local SEO',
				desc: 'Your Google Business Profile, location pages and listings set up to win nearby searches.',
			},
			{
				title: 'Structured data',
				desc: 'Schema markup that helps search engines understand your business, services and reviews.',
			},
			{
				title: 'Analytics & reporting',
				desc: 'GA4 and Search Console set up properly, with plain-English reports on traffic, rankings and enquiries.',
			},
		],
		steps: [
			{ title: 'Audit', desc: 'Benchmark speed, rankings and technical health, and agree the goals we will track.' },
			{ title: 'Prioritise', desc: 'Turn the findings into a ranked plan, starting with the fixes that matter most.' },
			{ title: 'Fix & optimise', desc: 'Make the technical, speed and on-page changes, testing each one as we go.' },
			{ title: 'Measure', desc: 'Report on progress regularly and keep refining as search and your site evolve.' },
		],
		stack: ['Google Search Console', 'GA4', 'Lighthouse', 'PageSpeed Insights', 'Schema.org', 'Google Business Profile'],
		faqs: [
			{
				q: 'How long does SEO take to work?',
				a: 'Technical and speed fixes can help within weeks. Ranking gains usually build over months, depending on your market and competition.',
			},
			{
				q: 'Can you guarantee first place on Google?',
				a: 'No one honestly can. We focus on the things that reliably improve visibility and report openly on the results.',
			},
			{
				q: 'Do you work on sites you did not build?',
				a: 'Yes. We can audit and improve most websites, whichever platform they run on.',
			},
			{
				q: 'What will I see in reports?',
				a: 'Clear numbers on traffic, rankings, speed and enquiries, with notes on what changed and what we are doing next.',
			},
		],
	},
	{
		slug: 'hosting-care-support',
		title: 'Hosting, Care & Support',
		summary:
			'Secure managed hosting, updates and backups, with a team in Sydney and Melbourne on call during business hours.',
		tags: ['Managed hosting', 'Security', 'Maintenance'],
		headline: ['Always on.', 'Always looked after.'],
		lead: 'Secure managed hosting, updates, backups and monitoring, with a local team in Sydney and Melbourne on call during business hours when you need a hand.',
		facts: [
			{ label: 'Best for', value: 'Any site that needs to stay online' },
			{ label: 'You get', value: 'Hosting, updates & real support' },
			{ label: 'Support hours', value: 'Mon–Fri, 9 AM – 6 PM AEST' },
		],
		overview:
			'A website is never finished on launch day. We keep yours fast, secure and up to date, so you can get on with running your business.',
		image: { src: hostingPhoto, alt: 'Two people with tablets in a server room', label: 'Care', caption: 'Monitored, updated and backed up', position: '50% 35%' },
		included: [
			{
				title: 'Managed hosting',
				desc: 'Fast, secure hosting set up and managed for you, with SSL certificates and a global CDN.',
			},
			{
				title: 'Updates & patches',
				desc: 'Platform, plugin and dependency updates applied and tested, so security holes are closed quickly.',
			},
			{
				title: 'Backups',
				desc: 'Regular automated backups stored safely offsite, ready to restore if anything ever goes wrong.',
			},
			{
				title: 'Monitoring',
				desc: 'Uptime, speed and security monitoring that alerts us to problems, often before you notice them.',
			},
			{
				title: 'Content changes',
				desc: 'Small edits and updates handled by our team, so your site stays current without the hassle.',
			},
			{
				title: 'Local support',
				desc: 'A team in Sydney and Melbourne you can reach during AEST business hours, by email or phone.',
			},
		],
		steps: [
			{ title: 'Review', desc: 'Check your current site, hosting and risks, and agree the right level of care.' },
			{ title: 'Migrate', desc: 'Move your site to managed hosting carefully, with no surprises and minimal downtime.' },
			{ title: 'Protect', desc: 'Set up backups, monitoring and security, then keep everything updated.' },
			{ title: 'Support', desc: 'Handle requests and changes as they come up, with a regular report on site health.' },
		],
		stack: ['Vercel', 'Cloudflare', 'AWS', 'Managed WordPress hosting', 'SSL & CDN', 'Uptime monitoring'],
		faqs: [
			{
				q: 'Can you look after a site you did not build?',
				a: 'Yes. We start with a review, fix anything urgent, then bring it onto a care plan.',
			},
			{
				q: 'What happens if my site goes down?',
				a: 'Monitoring alerts us, and we work to restore it as quickly as possible, using backups if needed.',
			},
			{
				q: 'Will moving hosts affect my site?',
				a: 'We plan migrations carefully, test everything on the new host first and switch over at a quiet time.',
			},
			{
				q: 'How do I request changes?',
				a: 'Email or call our team during business hours. Small changes are handled as part of your care plan.',
			},
		],
	},
];
