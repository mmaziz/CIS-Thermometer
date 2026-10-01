/**
 * ============================================================================
 * CIS AMBASSADORS CAMP - FUNDRAISING CONFIGURATION FILE
 * ============================================================================
 * EDIT THIS FILE TO UPDATE THE THERMOMETER & CAMPAIGN DETAILS DIRECTLY FROM CODE.
 *
 * How to update progress:
 * 1. Change `raisedAmount` below to your latest dollar total (e.g. 500, 1200, 4000).
 * 2. Save this file.
 * 3. The thermometer gauge, percentage, stats grid, and unlocked level badges
 *    will automatically recalculate and update on your website!
 * ============================================================================
 */

export const fundraisingConfig = {
  // --------------------------------------------------------------------------
  // 1. FUNDRAISING CORE NUMBERS (EDIT THESE)
  // --------------------------------------------------------------------------
  /** Current total dollars raised so far. Starting at 0 as requested! */
  raisedAmount: 0,

  /** The target goal to cover the camp deficit */
  targetGoal: 8000,

  /** Currency symbol */
  currencySymbol: '$',

  /** Target completion date / camp start date */
  campaignEndDate: '2026-11-15',

  // --------------------------------------------------------------------------
  // 2. CAMPAIGN DETAILS
  // --------------------------------------------------------------------------
  campaignTitle: 'CIS Ambassadors Camp Deficit Fundraiser',
  campaignSubtitle: '',
  organizationName: 'CIS Ambassadors Leadership Program',
  campName: 'Annual CIS Ambassadors Leadership Camp 2026',
  campDates: 'November 20 - 24, 2026',
  campLocation: 'Pinecrest Leadership Retreat Center',
  
  description: `The CIS Ambassadors Leadership Camp provides transformative mentorship, team-building, and career leadership workshops for outstanding student ambassadors. Due to unforeseen venue rate adjustments and transportation cost spikes, we face an $8,000 budget deficit. Your direct support ensures no student is turned away and every ambassador receives full camp sponsorship!`,

  // --------------------------------------------------------------------------
  // 3. THERMOMETER MILESTONES
  // --------------------------------------------------------------------------
  milestones: [
    {
      id: 'level-1',
      amount: 2000,
      title: 'Essential Supplies & Kits',
      subtitle: 'Camp Workbooks, Leadership Badges & Materials',
      iconName: 'Sparkles',
      description: 'Covers all camper training workbooks, leadership journals, customized ambassador name badges, and activity welcome kits for 50 attendees.',
      itemsUnlocked: [
        '50 Leadership & Teamwork Workbooks',
        'Official Ambassador Crest Badges & Lanyards',
        'Camp T-shirts & Stationery Supplies'
      ]
    },
    {
      id: 'level-2',
      amount: 4000,
      title: 'Safe Charter Transportation',
      subtitle: 'Round-trip Bus Transit & Travel Insurance',
      iconName: 'Bus',
      description: 'Secures charter bus transport for all student ambassadors, adult chaperones, and workshop equipment from school hubs to Pinecrest Retreat.',
      itemsUnlocked: [
        'Round-trip Charter Bus Service',
        'Travel & On-Site Camper Medical Insurance',
        'Fuel & Transit Toll Logistics'
      ]
    },
    {
      id: 'level-3',
      amount: 6000,
      title: 'Dining & Leadership Workshops',
      subtitle: 'Nutritious Meals & Guest Speaker Honorariums',
      iconName: 'Utensils',
      description: 'Provides 3 daily nutritious meals, campfire snacks, and brings in 4 inspiring guest speakers for interactive leadership seminars.',
      itemsUnlocked: [
        '12 Full Meals & Healthy Snack Stations per camper',
        'Guest Speaker Honorariums & Travel Stays',
        'Evening Team-building & Outdoor High-ropes Course'
      ]
    },
    {
      id: 'level-4',
      amount: 8000,
      title: 'Full Camp Deficit Covered!',
      subtitle: 'Cabin Lodging & Full Camper Scholarships',
      iconName: 'Trophy',
      description: 'Completely eliminates the financial deficit! Guarantees 4 nights of heated cabin lodging, venue facilities, and full scholarships for all students.',
      itemsUnlocked: [
        '4 Nights Cabin Lodging & Facility Rental',
        'Zero-cost tuition for all 50 student ambassadors',
        'Graduation Gala Banquet & Achievement Awards'
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 4. BUDGET DEFICIT BREAKDOWN
  // --------------------------------------------------------------------------
  expensesBreakdown: [
    { category: 'Cabin Lodging & Facility Rental', amount: 3200, percentage: 40, color: '#3b82f6', icon: 'Home' },
    { category: 'Nutritious Meals & Dining', amount: 2000, percentage: 25, color: '#10b981', icon: 'Utensils' },
    { category: 'Charter Transportation & Fuel', amount: 1400, percentage: 17.5, color: '#f59e0b', icon: 'Bus' },
    { category: 'Camp Kits, Supplies & Apparel', amount: 800, percentage: 10, color: '#8b5cf6', icon: 'BookOpen' },
    { category: 'Leadership Speakers & Workshops', amount: 600, percentage: 7.5, color: '#ec4899', icon: 'Award' }
  ],

  // --------------------------------------------------------------------------
  // 5. DIRECT PAYMENT / DONATION METHODS
  // --------------------------------------------------------------------------
  paymentMethods: [
    {
      id: 'zelle',
      name: 'Zelle',
      handle: 'cis.ambassadors.camp@gmail.com',
      note: 'Include note: "CIS Camp Deficit - [Your Name]"',
      color: '#7414ca',
      icon: 'Zap'
    },
    {
      id: 'venmo',
      name: 'Venmo',
      handle: '@CIS-Ambassadors-Camp',
      note: 'Verification digits: 4892',
      color: '#008cff',
      icon: 'Send'
    },
    {
      id: 'cashapp',
      name: 'Cash App',
      handle: '$CISAmbassadors',
      note: 'Fast direct support with $Cashtag',
      color: '#00d632',
      icon: 'DollarSign'
    },
    {
      id: 'paypal',
      name: 'PayPal / Card',
      handle: 'paypal.me/cisambassadors',
      url: 'https://paypal.me/cisambassadors',
      note: 'Accepts Credit/Debit card payments',
      color: '#003087',
      icon: 'CreditCard'
    },
    {
      id: 'check',
      name: 'Check / Bank Wire',
      handle: 'CIS Ambassadors Foundation',
      note: 'Mail to: 1200 Ambassador Way, Suite 400',
      color: '#64748b',
      icon: 'Building'
    }
  ],

  // --------------------------------------------------------------------------
  // 6. RECENT DONORS / SPONSORS
  // --------------------------------------------------------------------------
  recentDonors: []
};
