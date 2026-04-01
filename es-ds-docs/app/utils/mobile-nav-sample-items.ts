export interface EsMobileNavSampleItemInterface {
    name: string;
    href?: string;
    items?: EsMobileNavSampleItemInterface[];
}

export const largeNestedMenuItems: EsMobileNavSampleItemInterface[] = [
    {
        name: 'Home solar',
        items: [
            {
                name: 'Getting started',
                items: [
                    {
                        name: 'Solar calculator',
                        href: 'https://www.energysage.com/solar/calculator/',
                    },
                    {
                        name: 'Your guide to home solar',
                        href: 'https://www.energysage.com/solar/',
                    },
                    {
                        name: 'How much do solar panels cost?',
                        href: 'https://www.energysage.com/local-data/solar-panel-cost/',
                    },
                    {
                        name: 'Is solar right for you?',
                        href: 'https://www.energysage.com/solar/are-solar-panels-worth-it/',
                    },
                    {
                        name: 'How much does solar save you?',
                        href: 'https://www.energysage.com/solar/much-solar-panels-save/',
                    },
                ],
            },
            {
                name: 'Compare your options',
                items: [
                    {
                        name: 'Best solar panels',
                        href: 'https://www.energysage.com/solar/best-solar-panels-complete-ranking/',
                    },
                    {
                        name: 'Compare solar panels',
                        href: 'https://www.energysage.com/solar-panels/',
                    },
                    {
                        name: 'Best inverters',
                        href: 'https://www.energysage.com/solar/best-solar-inverters/',
                    },
                    {
                        name: 'Compare inverters',
                        href: 'https://www.energysage.com/solar-inverters/',
                    },
                    {
                        name: 'Compare installers',
                        href: 'https://www.energysage.com/supplier/search/?selected_facets=services%3Ainstallers',
                    },
                ],
            },
            {
                name: 'Paying for solar',
                items: [
                    {
                        name: 'Financing options',
                        href: 'https://www.energysage.com/solar/how-to-pay-for-solar/',
                    },
                    {
                        name: 'Prepaid leases and PPAs',
                        href: 'https://www.energysage.com/solar/pre-paid-solar-leases-and-ppas/',
                    },
                    {
                        name: 'Zero-down solar',
                        href: 'https://www.energysage.com/solar/solar-loans/zero-down-solar-financing-options/',
                    },
                    {
                        name: 'Incentives',
                        href: 'https://www.energysage.com/local-data/solar-rebates-incentives/',
                    },
                    {
                        name: 'When will you break even?',
                        href: 'https://www.energysage.com/solar/understanding-your-solar-panel-payback-period/',
                    },
                ],
            },
        ],
    },
    {
        name: 'Home batteries',
        items: [
            {
                name: 'Getting started',
                items: [
                    {
                        name: 'Your guide to batteries',
                        href: 'https://www.energysage.com/energy-storage/',
                    },
                    {
                        name: 'How much do batteries cost?',
                        href: 'https://www.energysage.com/energy-storage/how-much-do-batteries-cost/',
                    },
                    {
                        name: 'Batteries vs. generators',
                        href: 'https://www.energysage.com/energy-storage/battery-backup-power-vs-generators-which-is-right-for-you/',
                    },
                    {
                        name: 'How much backup power do you need?',
                        href: 'https://www.energysage.com/energy-storage/how-many-solar-batteries-needed/',
                    },
                    {
                        name: 'Already have solar panels?',
                        href: 'https://www.energysage.com/energy-storage/adding-battery-to-solar-energy-system-as-retrofit/',
                    },
                ],
            },
            {
                name: 'Compare your options',
                items: [
                    {
                        name: 'Best batteries',
                        href: 'https://www.energysage.com/energy-storage/best-home-batteries/',
                    },
                    {
                        name: 'Compare batteries',
                        href: 'https://www.energysage.com/solar-batteries/',
                    },
                    {
                        name: 'Compare installers',
                        href: 'https://www.energysage.com/supplier/search/?selected_facets=services%3Ainstallers',
                    },
                    {
                        name: 'Do you need whole home backup?',
                        href: 'https://www.energysage.com/energy-storage/best-batteries-for-whole-home-backup/',
                    },
                ],
            },
            {
                name: 'Paying for batteries',
                items: [
                    {
                        name: 'Financing options',
                        href: 'https://www.energysage.com/energy-storage/how-do-you-pay-for-storage/',
                    },
                    {
                        name: 'Incentives',
                        href: 'https://www.energysage.com/local-data/solar-rebates-incentives/',
                    },
                    {
                        name: 'Virtual power plants (VPP)s',
                        href: 'https://www.energysage.com/energy-storage/what-is-a-virtual-power-plant/',
                    },
                ],
            },
        ],
    },
    {
        name: 'Heat pumps',
        items: [
            {
                name: 'Getting started',
                items: [
                    {
                        name: 'Your guide to heat pumps',
                        href: 'https://www.energysage.com/heat-pumps/',
                    },
                    {
                        name: 'How much does a heat pump cost?',
                        href: 'https://www.energysage.com/heat-pumps/costs-and-benefits-air-source-heat-pumps/',
                    },
                    {
                        name: 'Pros and cons of heat pumps',
                        href: 'https://www.energysage.com/heat-pumps/pros-and-cons-of-air-source-heat-pumps/',
                    },
                    {
                        name: 'Heat pump vs. furnace',
                        href: 'https://www.energysage.com/heat-pumps/heat-pumps-vs-furnaces/',
                    },
                    {
                        name: 'Heat pump vs. AC',
                        href: 'https://www.energysage.com/heat-pumps/heat-pump-vs-ac/',
                    },
                ],
            },
            {
                name: 'Compare your options',
                items: [
                    {
                        name: 'Best heat pumps',
                        href: 'https://www.energysage.com/heat-pumps/best-heat-pumps/',
                    },
                    {
                        name: 'Heat pump sizing',
                        href: 'https://www.energysage.com/heat-pumps/heat-pump-size-guide/',
                    },
                    {
                        name: 'Ducted vs. ductless heat pump',
                        href: 'https://www.energysage.com/heat-pumps/heat-pumps-vs-mini-splits/',
                    },
                    {
                        name: 'Cold climate heat pumps',
                        href: 'https://www.energysage.com/heat-pumps/best-cold-climate-heat-pump/',
                    },
                    {
                        name: 'Pairing with solar',
                        href: 'https://www.energysage.com/heat-pumps/how-many-solar-panels-for-air-source-heat-pumps/',
                    },
                ],
            },
            {
                name: 'Paying for heat pumps',
                items: [
                    {
                        name: 'Financing options',
                        href: 'https://www.energysage.com/financing/',
                    },
                    {
                        name: 'Incentives',
                        href: 'https://www.energysage.com/heat-pumps/heat-pump-incentives/',
                    },
                    {
                        name: 'Reducing the expense',
                        href: 'https://www.energysage.com/heat-pumps/heat-pumps-expensive-moneys-worth/',
                    },
                    {
                        name: 'How much can heat pumps save you?',
                        href: 'https://www.energysage.com/heat-pumps/heat-pump-save-money/',
                    },
                ],
            },
        ],
    },
    {
        name: 'EV charging',
        items: [
            {
                name: 'Getting started',
                items: [
                    {
                        name: 'Your guide to EV charging',
                        href: 'https://www.energysage.com/ev-charging/',
                    },
                    {
                        name: 'How much does an installation cost?',
                        href: 'https://www.energysage.com/ev-charging/how-much-does-ev-charger-installation-cost/',
                    },
                    {
                        name: 'Cost to charge an EV',
                        href: 'https://www.energysage.com/ev-charging/electric-vehicle-charging-cost/',
                    },
                    {
                        name: 'Incentives',
                        href: 'https://www.energysage.com/ev-charging/ev-charger-rebates-incentives/',
                    },
                    {
                        name: 'Do you need an electrical panel upgrade?',
                        href: 'https://www.energysage.com/ev-charging/do-you-need-an-electrical-panel-upgrade-for-your-ev-/',
                    },
                ],
            },
            {
                name: 'Compare your options',
                items: [
                    {
                        name: 'Best EV chargers',
                        href: 'https://www.energysage.com/ev-charging/ev-charging-stations/',
                    },
                    {
                        name: 'Level 1 vs. Level 2 charging',
                        href: 'https://www.energysage.com/ev-charging/different-types-of-ev-chargers/',
                    },
                    {
                        name: 'Plug-in vs. hardwire chargers',
                        href: 'https://www.energysage.com/ev-charging/hardwire-vs-plug-in-ev-charger/',
                    },
                    {
                        name: 'Installing indoors vs. outdoors',
                        href: 'https://www.energysage.com/ev-charging/outdoor-ev-charger-installation/',
                    },
                    {
                        name: 'Pairing with solar',
                        href: 'https://www.energysage.com/ev-charging/how-many-panels-do-you-need-for-your-ev/',
                    },
                ],
            },
            {
                name: 'Shopping for an EV?',
                items: [
                    {
                        name: 'Your guide to EVs',
                        href: 'https://www.energysage.com/electric-vehicles/',
                    },
                    {
                        name: 'Buying vs. leasing',
                        href: 'https://www.energysage.com/electric-vehicles/how-to-pay-for-your-ev/',
                    },
                ],
            },
        ],
    },
    {
        name: 'Other projects',
        items: [
            {
                name: 'Whole home electrification',
                items: [
                    {
                        name: 'Your guide to home electrification',
                        href: 'https://www.energysage.com/electricity/future-of-electricity-electrification/',
                    },
                    {
                        name: 'Is energy efficiency worth it?',
                        href: 'https://www.energysage.com/energy-efficiency/energy-efficient-homes/',
                    },
                ],
            },
            {
                name: 'Electricity plans',
                items: [
                    {
                        name: 'Your guide to retail energy',
                        href: 'https://www.energysage.com/electricity/what-is-retail-energy/',
                    },
                    {
                        name: 'Should you switch providers?',
                        href: 'https://www.energysage.com/blog/power-to-choose-your-electricity-plan/',
                    },
                ],
            },
        ],
    },
    {
        name: 'About us',
        items: [
            {
                name: 'Our company',
                items: [
                    {
                        name: 'About us',
                        href: 'https://www.energysage.com/about-us/company/',
                    },
                    {
                        name: 'Our Energy Advisors',
                        href: 'https://www.energysage.com/energy-advisors/',
                    },
                    {
                        name: 'Press',
                        href: 'https://www.energysage.com/press/',
                    },
                    {
                        name: 'Careers',
                        href: 'https://www.energysage.com/about-us/careers/',
                    },
                    {
                        name: 'Our editorial team',
                        href: 'https://www.energysage.com/authors/',
                    },
                    {
                        name: 'Editorial guidelines',
                        href: 'https://www.energysage.com/editorial-guidelines/',
                    },
                ],
            },
            {
                name: 'Resources',
                items: [
                    {
                        name: 'Market intel',
                        href: 'https://www.energysage.com/data/',
                    },
                    {
                        name: 'News',
                        href: 'https://www.energysage.com/news//',
                    },
                    {
                        name: 'Testimonials',
                        href: 'https://www.energysage.com/testimonials/',
                    },
                    {
                        name: 'Newsletter',
                        href: 'https://www.energysage.com/landing/newsletter-signup/?utm_campaign=12560937-Newsletter+landing+page&utm_source=footer&utm_medium=website',
                    },
                    {
                        name: 'Plugged In YouTube show',
                        href: 'https://www.youtube.com/@EnergySage',
                    },
                ],
            },
            {
                name: 'Work with us',
                items: [
                    {
                        name: 'Solar & HVAC installers',
                        href: 'https://www.energysage.com/installers/',
                    },
                    {
                        name: 'Corporate partners',
                        href: 'https://www.energysage.com/partners/corporations/',
                    },
                    {
                        name: 'Community programs',
                        href: 'https://www.energysage.com/partners/non-profits/',
                    },
                    {
                        name: 'Utility programs',
                        href: 'https://www.energysage.com/partners/utilities/',
                    },
                    {
                        name: 'Solar for your business',
                        href: 'https://www.energysage.com/businesses/',
                    },
                    {
                        name: 'Others',
                        href: 'https://www.energysage.com/partners/',
                    },
                ],
            },
        ],
    },
];
