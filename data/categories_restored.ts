export const categories = [
  // Core Content Categories
  {
    name: "Image Generation",
    icon: "🖼️",
    toolCount: 100,
    subcategories: [
      { name: "AI Art", favicon: "/favicons/ai-art.png", website: "https://www.midjourney.com" },
      { name: "Photo Editing", favicon: "/favicons/photo-editing.png", website: "https://www.adobe.com/photoshop" },
      { name: "Avatar Creation", favicon: "/favicons/avatar-creation.png", website: "https://www.artbreeder.com" },
      { name: "Design Tools", favicon: "/favicons/design-tools.png", website: "https://www.figma.com" },
      { name: "3D Rendering", favicon: "/favicons/3d-rendering.png", website: "https://www.blender.org" }
    ]
  },
  {
    name: "Video & Animation",
    icon: "🎬",
    toolCount: 100,
    subcategories: [
      { name: "2D Animation", favicon: "/favicons/2d-animation.png", website: "https://www.adobe.com/animate" },
      { name: "3D Animation", favicon: "/favicons/3d-animation.png", website: "https://www.blender.org" },
      { name: "Video Editing", favicon: "/favicons/video-editing.png", website: "https://www.adobe.com/premiere" },
      { name: "Visual Effects", favicon: "/favicons/vfx.png", website: "https://www.blackmagicdesign.com/products/davinciresolve" },
      { name: "AI Video Generation", favicon: "/favicons/ai-video.png", website: "https://www.synthesia.io" }
    ]
  },
  {
    name: "Audio & Voice",
    icon: "🎤",
    toolCount: 70,
    subcategories: [
      { name: "Text-to-Speech", favicon: "/favicons/text-to-speech.png", website: "https://www.descript.com/overdub" },
      { name: "Voice Cloning", favicon: "/favicons/voice-cloning.png", website: "https://www.descript.com/lyrebird-ai" },
      { name: "Music Generation", favicon: "/favicons/music-generation.png", website: "https://www.ampermusic.com" },
      { name: "Audio Editing", favicon: "/favicons/audio-editing.png", website: "https://www.audacityteam.org" },
      { name: "Sound Effects", favicon: "/favicons/sound-effects.png", website: "https://freesound.org" }
    ]
  },
  {
    name: "Writing & Content Creation",
    icon: "✍️",
    toolCount: 150,
    subcategories: [
      { name: "AI Writing Assistants", favicon: "/favicons/writing-assistant.png", website: "https://www.copy.ai" },
      { name: "Content Generators", favicon: "/favicons/content-generator.png", website: "https://www.jasper.ai" },
      { name: "Copywriting", favicon: "/favicons/copywriting.png", website: "https://www.copy.ai" },
      { name: "Technical Writing", favicon: "/favicons/technical-writing.png", website: "https://www.docsie.io" },
      { name: "Blogging Tools", favicon: "/favicons/blogging.png", website: "https://wordpress.com" }
    ]
  },
  // Business & Productivity Categories
  {
    name: "SEO & Website Tools",
    icon: "🔍",
    toolCount: 100,
    subcategories: [
      { name: "Keyword Research", favicon: "/favicons/keyword-research.png", website: "https://ahrefs.com" },
      { name: "Content Optimization", favicon: "/favicons/seo-optimization.png", website: "https://www.semrush.com" },
      { name: "Technical SEO", favicon: "/favicons/technical-seo.png", website: "https://www.screamingfrog.com" },
      { name: "Local SEO", favicon: "/favicons/local-seo.png", website: "https://moz.com/local" },
      { name: "Backlink Analysis", favicon: "/favicons/backlinks.png", website: "https://ahrefs.com/backlink-checker" }
    ]
  },
  {
    name: "Social Media Management",
    icon: "📱",
    toolCount: 80,
    subcategories: [
      { name: "Content Scheduling", favicon: "/favicons/content-scheduling.png", website: "https://buffer.com" },
      { name: "Analytics", favicon: "/favicons/analytics.png", website: "https://sproutsocial.com" },
      { name: "Engagement", favicon: "/favicons/engagement.png", website: "https://hootsuite.com" },
      { name: "Influencer Marketing", favicon: "/favicons/influencer-marketing.png", website: "https://www.traackr.com" },
      { name: "Social Listening", favicon: "/favicons/social-listening.png", website: "https://www.brandwatch.com" }
    ]
  },
  {
    name: "Email Marketing",
    icon: "✉️",
    toolCount: 60,
    subcategories: [
      { name: "Email Automation", favicon: "/favicons/email-automation.png", website: "https://mailchimp.com" },
      { name: "Newsletter Tools", favicon: "/favicons/newsletter.png", website: "https://substack.com" },
      { name: "Email Templates", favicon: "/favicons/email-templates.png", website: "https://www.beefree.io" },
      { name: "List Management", favicon: "/favicons/list-management.png", website: "https://www.activecampaign.com" },
      { name: "Analytics", favicon: "/favicons/email-analytics.png", website: "https://www.mailerlite.com" }
    ]
  },
  {
    name: "Project Management",
    icon: "📊",
    toolCount: 70,
    subcategories: [
      { name: "Task Management", favicon: "/favicons/task-management.png", website: "https://asana.com" },
      { name: "Team Collaboration", favicon: "/favicons/team-collaboration.png", website: "https://clickup.com" },
      { name: "Agile Tools", favicon: "/favicons/agile.png", website: "https://www.atlassian.com/software/jira" },
      { name: "Time Tracking", favicon: "/favicons/time-tracking.png", website: "https://toggl.com" },
      { name: "Resource Planning", favicon: "/favicons/resource-planning.png", website: "https://monday.com" }
    ]
  },
  {
    name: "Customer Support",
    icon: "💬",
    toolCount: 50,
    subcategories: [
      { name: "Live Chat", favicon: "/favicons/live-chat.png", website: "https://www.intercom.com" },
      { name: "Help Desk", favicon: "/favicons/help-desk.png", website: "https://zendesk.com" },
      { name: "Knowledge Base", favicon: "/favicons/knowledge-base.png", website: "https://www.helpjuice.com" },
      { name: "Ticketing System", favicon: "/favicons/ticketing.png", website: "https://freshdesk.com" },
      { name: "Customer Feedback", favicon: "/favicons/feedback.png", website: "https://www.uservoice.com" }
    ]
  },
  {
    name: "E-commerce",
    icon: "🛍️",
    toolCount: 90,
    subcategories: [
      { name: "Shopify Apps", favicon: "/favicons/shopify.png", website: "https://apps.shopify.com" },
      { name: "WooCommerce", favicon: "/favicons/woocommerce.png", website: "https://woocommerce.com" },
      { name: "Product Management", favicon: "/favicons/product-management.png", website: "https://www.vendhq.com" },
      { name: "Inventory Management", favicon: "/favicons/inventory.png", website: "https://www.tradegecko.com" },
      { name: "Dropshipping", favicon: "/favicons/dropshipping.png", website: "https://www.oberlo.com" }
    ]
  },
  {
    name: "Analytics & Data",
    icon: "📈",
    toolCount: 80,
    subcategories: [
      { name: "Web Analytics", favicon: "/favicons/web-analytics.png", website: "https://analytics.google.com" },
      { name: "Business Intelligence", favicon: "/favicons/bi.png", website: "https://www.tableau.com" },
      { name: "Data Visualization", favicon: "/favicons/data-viz.png", website: "https://powerbi.microsoft.com" },
      { name: "Heatmaps", favicon: "/favicons/heatmaps.png", website: "https://hotjar.com" },
      { name: "A/B Testing", favicon: "/favicons/ab-testing.png", website: "https://www.optimizely.com" }
    ]
  },
  {
    name: "HR & Recruitment",
    icon: "👥",
    toolCount: 60,
    subcategories: [
      { name: "ATS", favicon: "/favicons/ats.png", website: "https://www.greenhouse.io" },
      { name: "Employee Engagement", favicon: "/favicons/engagement.png", website: "https://www.officevibe.com" },
      { name: "Payroll", favicon: "/favicons/payroll.png", website: "https://gusto.com" },
      { name: "Performance Management", favicon: "/favicons/performance.png", website: "https://www.cultureamp.com" },
      { name: "Recruitment Marketing", favicon: "/favicons/recruitment.png", website: "https://www.smartrecruiters.com" }
    ]
  },
  {
    name: "Finance & Accounting",
    icon: "💰",
    toolCount: 50,
    subcategories: [
      { name: "Invoicing", favicon: "/favicons/invoicing.png", website: "https://www.freshbooks.com" },
      { name: "Expense Tracking", favicon: "/favicons/expenses.png", website: "https://www.expensify.com" },
      { name: "Financial Planning", favicon: "/favicons/financial-planning.png", website: "https://www.mint.com" },
      { name: "Tax Preparation", favicon: "/favicons/taxes.png", website: "https://turbotax.intuit.com" },
      { name: "Bookkeeping", favicon: "/favicons/bookkeeping.png", website: "https://quickbooks.intuit.com" }
    ]
  },
  {
    name: "Legal & Compliance",
    icon: "⚖️",
    toolCount: 40,
    subcategories: [
      { name: "Contract Management", favicon: "/favicons/contracts.png", website: "https://www.pandadoc.com" },
      { name: "eSignature", favicon: "/favicons/signature.png", website: "https://www.docusign.com" },
      { name: "GDPR Compliance", favicon: "/favicons/gdpr.png", website: "https://www.onetrust.com" },
      { name: "IP Protection", favicon: "/favicons/ip.png", website: "https://www.trademarknow.com" },
      { name: "Legal Research", favicon: "/favicons/legal-research.png", website: "https://casetext.com" }
    ]
  },
  // Specialized AI Categories
  {
    name: "AI Code Assistants",
    icon: "👨‍💻",
    toolCount: 60,
    subcategories: [
      { name: "Code Generation", favicon: "/favicons/code-generation.png", website: "https://github.com/features/copilot" },
      { name: "Code Review", favicon: "/favicons/code-review.png", website: "https://www.sonarsource.com" },
      { name: "Debugging", favicon: "/favicons/debugging.png", website: "https://www.tabnine.com" },
      { name: "Documentation", favicon: "/favicons/documentation.png", website: "https://www.sourcery.ai" },
      { name: "Pair Programming", favicon: "/favicons/pair-programming.png", website: "https://replit.com/site/ai" }
    ]
  },
  {
    name: "AI for Healthcare",
    icon: "🏥",
    toolCount: 50,
    subcategories: [
      { name: "Medical Diagnosis", favicon: "/favicons/medical-diagnosis.png", website: "https://www.pathai.com" },
      { name: "Drug Discovery", favicon: "/favicons/drug-discovery.png", website: "https://www.benevolent.com" },
      { name: "Medical Imaging", favicon: "/favicons/medical-imaging.png", website: "https://www.arterys.com" },
      { name: "Health Monitoring", favicon: "/favicons/health-monitoring.png", website: "https://www.tempus.com" },
      { name: "Mental Health", favicon: "/favicons/mental-health.png", website: "https://www.woebothealth.com" }
    ]
  },
  {
    name: "AI for Education",
    icon: "🎓",
    toolCount: 45,
    subcategories: [
      { name: "Online Learning Platforms", favicon: "/favicons/online-learning.png", website: "https://www.coursera.org" },
      { name: "Tutoring Systems", favicon: "/favicons/tutoring.png", website: "https://www.carnegielearning.com" },
      { name: "Language Learning", favicon: "/favicons/language-learning.png", website: "https://www.duolingo.com" },
      { name: "Educational Games", favicon: "/favicons/educational-games.png", website: "https://www.prodigygame.com" },
      { name: "Student Assessment", favicon: "/favicons/assessment.png", website: "https://www.turnitin.com" }
    ]
  },
  {
    name: "AI for Finance",
    icon: "💹",
    toolCount: 55,
    subcategories: [
      { name: "Algorithmic Trading", favicon: "/favicons/algorithmic-trading.png", website: "https://www.quantconnect.com" },
      { name: "Fraud Detection", favicon: "/favicons/fraud-detection.png", website: "https://www.feedzai.com" },
      { name: "Credit Scoring", favicon: "/favicons/credit-scoring.png", website: "https://www.upstart.com" },
      { name: "Personal Finance", favicon: "/favicons/personal-finance.png", website: "https://www.cleo.ai" },
      { name: "Risk Assessment", favicon: "/favicons/risk-assessment.png", website: "https://www.ayasdi.com" }
    ]
  },
  {
    name: "AI for Marketing",
    icon: "📢",
    toolCount: 65,
    subcategories: [
      { name: "Content Personalization", favicon: "/favicons/personalization.png", website: "https://www.dynamic-yield.com" },
      { name: "Customer Segmentation", favicon: "/favicons/customer-segmentation.png", website: "https://www.bloomreach.com" },
      { name: "Predictive Analytics", favicon: "/favicons/predictive-analytics.png", website: "https://www.salesforce.com/products/einstein/" },
      { name: "Chatbots", favicon: "/favicons/chatbots.png", website: "https://www.chatfuel.com" },
      { name: "Ad Optimization", favicon: "/favicons/ad-optimization.png", website: "https://www.acquisio.com" }
    ]
  },
  {
    name: "AI for Manufacturing",
    icon: "🏭",
    toolCount: 40,
    subcategories: [
      { name: "Predictive Maintenance", favicon: "/favicons/predictive-maintenance.png", website: "https://www.uptake.com" },
      { name: "Quality Control", favicon: "/favicons/quality-control.png", website: "https://www.cognex.com" },
      { name: "Supply Chain Optimization", favicon: "/favicons/supply-chain.png", website: "https://www.c3.ai" },
      { name: "Robotics", favicon: "/favicons/robotics.png", website: "https://www.bostondynamics.com" },
      { name: "Process Automation", favicon: "/favicons/process-automation.png", website: "https://www.uipath.com" }
    ]
  },
  {
    name: "AI for Retail",
    icon: "🛒",
    toolCount: 45,
    subcategories: [
      { name: "Recommendation Engines", favicon: "/favicons/recommendations.png", website: "https://www.recombee.com" },
      { name: "Inventory Management", favicon: "/favicons/inventory-ai.png", website: "https://www.celect.net" },
      { name: "Visual Search", favicon: "/favicons/visual-search.png", website: "https://www.vuforia.com" },
      { name: "Dynamic Pricing", favicon: "/favicons/dynamic-pricing.png", website: "https://www.pros.com" },
      { name: "Customer Analytics", favicon: "/favicons/customer-analytics.png", website: "https://www.brickstream.com" }
    ]
  },
  {
    name: "AI for Legal Tech",
    icon: "⚖️",
    toolCount: 35,
    subcategories: [
      { name: "Legal Research", favicon: "/favicons/legal-research-ai.png", website: "https://casetext.com" },
      { name: "Contract Analysis", favicon: "/favicons/contract-analysis.png", website: "https://www.luminance.com" },
      { name: "eDiscovery", favicon: "/favicons/ediscovery.png", website: "https://www.relativity.com" },
      { name: "Compliance Monitoring", favicon: "/favicons/compliance.png", website: "https://www.ayfie.com" },
      { name: "Legal Chatbots", favicon: "/favicons/legal-chatbot.png", website: "https://www.donotpay.com" }
    ]
  },
  {
    name: "AI for Creative Arts",
    icon: "🎨",
    toolCount: 50,
    subcategories: [
      { name: "AI Art Generation", favicon: "/favicons/ai-art-generation.png", website: "https://openai.com/dall-e-2/" },
      { name: "Music Composition", favicon: "/favicons/music-composition.png", website: "https://www.ampermusic.com" },
      { name: "Video Editing", favicon: "/favicons/ai-video-editing.png", website: "https://runwayml.com" },
      { name: "Creative Writing", favicon: "/favicons/creative-writing.png", website: "https://www.sudowrite.com" },
      { name: "3D Modeling", favicon: "/favicons/3d-modeling.png", website: "https://www.kaedim3d.com" }
    ]
  },
  {
    name: "AI for Cybersecurity",
    icon: "🔒",
    toolCount: 45,
    subcategories: [
      { name: "Threat Detection", favicon: "/favicons/threat-detection.png", website: "https://www.darktrace.com" },
      { name: "Vulnerability Assessment", favicon: "/favicons/vulnerability.png", website: "https://www.tenable.com" },
      { name: "Network Security", favicon: "/favicons/network-security.png", website: "https://www.paloaltonetworks.com" },
      { name: "Identity Verification", favicon: "/favicons/identity-verification.png", website: "https://www.jumio.com" },
      { name: "Incident Response", favicon: "/favicons/incident-response.png", website: "https://www.crowdstrike.com" }
    ]
  }
];
